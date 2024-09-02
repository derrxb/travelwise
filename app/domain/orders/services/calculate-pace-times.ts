import { z } from 'zod';
import { format } from 'date-fns';
import { distances as Distances } from '../../../content/paces/en.json';

export enum PaceUnit {
  Miles = 'mi',
  Kilometers = 'km',
}

export const paceCalculatorSchema = z.object({
  paceMinutes: z.number().min(0, 'Pace minutes is required'),
  paceSeconds: z.number().min(0, 'Pace seconds is required').max(59),
  unit: z.nativeEnum(PaceUnit, { required_error: 'pace is required' }),
  offsets: z.object({
    interval: z.number().min(0).max(10), // seconds
    count: z.number().min(0).max(5),
  }),
});

export type PaceCalculatorType = z.infer<typeof paceCalculatorSchema>;
export type PaceCalculatorValidationErrors = z.inferFlattenedErrors<typeof paceCalculatorSchema>['fieldErrors'];

export class PaceCalculator {
  private paceMinutes: number;
  private paceSeconds: number;
  private unit: PaceUnit;
  private offsets: PaceCalculatorType['offsets'];

  constructor() {
    this.paceMinutes = 0;
    this.paceSeconds = 0;
    this.unit = PaceUnit.Kilometers;
    this.offsets = { interval: 0, count: 0 };
  }

  setMinutes(minutes: number) {
    this.paceMinutes = minutes;
    return this;
  }

  setSeconds(seconds: number) {
    this.paceSeconds = seconds;
    return this;
  }

  setPaceMethod(unit: PaceUnit) {
    this.unit = unit;
    return this;
  }

  setOffsets(interval: number, count: number) {
    this.offsets = { interval, count };
    return this;
  }

  formatTime(seconds: number) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    // Use date-fns to format the time
    const date = new Date(0, 0, 0, hours, minutes, secs);
    return format(date, 'HH:mm:ss');
  }

  formatPace(seconds: number) {
    // Calculate hours, minutes, and seconds
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    // Use date-fns to format the time
    const date = new Date(0, 0, 0, 0, minutes, secs);
    return format(date, 'mm:ss');
  }

  validate() {
    const result = paceCalculatorSchema.safeParse({
      paceMinutes: this.paceMinutes,
      paceSeconds: this.paceSeconds,
      unit: this.unit,
      offsets: this.offsets,
    });

    if (!result.success) {
      throw new Error('Invalid values provided to pace calculator');
    }

    return this;
  }

  calculateFinishTimes() {
    const paceInSeconds = this.paceMinutes * 60 + this.paceSeconds;
    const finishTimes = [];
    const { interval, count } = this.offsets;
    const distances = this.unit === PaceUnit.Kilometers ? Distances.km : Distances.miles;

    // Calculate finish times for each predefined distance
    for (const distance of distances) {
      let currentPace = paceInSeconds - interval * ((count + 1) / 2);
      const times = [];
      const paces = [];
      for (let i = 0; i < count; i += 1) {
        const time = (currentPace + interval) * distance.value;
        times.push(this.formatTime(time));
        currentPace += interval;
        paces.push(this.formatPace(currentPace));
      }

      finishTimes.push({
        distance: distance.label,
        paces,
        times,
      });
    }

    return finishTimes;
  }
}
