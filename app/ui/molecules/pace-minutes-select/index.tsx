import { ErrorMessage } from '~/ui/atoms/error-message';
import { Label } from '~/ui/atoms/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/ui/atoms/Select';
import paces from '~/content/paces/en.json';

export type PaceMinutesSelectProps = {
  defaultValue: string;
  errorMessage?: string;
};

export const PaceMinutesSelect = ({ defaultValue, errorMessage }: PaceMinutesSelectProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>Minutes</Label>
      <Select name="minutes" defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select minutes" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {paces.paces.minutes?.map((pace) => <SelectItem value={pace.value.toString()}>{pace.label}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
