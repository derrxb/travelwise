import { PaceUnit } from '~/domain/travelwise/services/calculate-pace-times';

export const Pace = ({ pace, unit }: { pace: string; unit: PaceUnit }) => {
  return (
    <span>
      {pace} {unit === PaceUnit.Kilometers ? 'min/km' : 'min/mi'}
    </span>
  );
};
