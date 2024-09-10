import { PaceUnit } from '~/domain/travelwise/services/calculate-pace-times';
import { ErrorMessage } from '~/ui/atoms/error-message';
import { Label } from '~/ui/atoms/label';
import { RadioGroup, RadioGroupItem } from '~/ui/atoms/radio-group';

export type PaceUnitRadioGroupProps = {
  defaultValue: string;
  errorMessage?: string;
};

export const PaceUnitRadioGroup = ({ defaultValue, errorMessage }: PaceUnitRadioGroupProps) => {
  return (
    <div>
      <Label>Pace</Label>
      <RadioGroup name="unit" defaultValue={defaultValue} className="!flex flex-row items-center space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PaceUnit.Kilometers} id="km" />
          <Label htmlFor="r2">min/km</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value={PaceUnit.Miles} id="mile" />
          <Label htmlFor="r3">min/mile</Label>
        </div>
      </RadioGroup>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
