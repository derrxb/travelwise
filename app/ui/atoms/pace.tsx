import { PaceUnit } from '~/domain/orders/services/calculate-pace-times';

export const Pace = ({ pace, unit }: { pace: string; unit: PaceUnit }) => {
  return (
    <span>
      {pace} {unit === PaceUnit.Kilometers ? 'min/km' : 'min/mi'}
    </span>
  );
};
