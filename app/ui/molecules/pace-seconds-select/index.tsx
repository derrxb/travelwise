import { ErrorMessage } from '~/ui/atoms/error-message';
import { Label } from '~/ui/atoms/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/ui/atoms/Select';
import paces from '~/content/paces/en.json';

export type PaceSecondsSelectProps = {
  defaultValue: string;
  errorMessage?: string;
};

export const PaceSecondsSelect = ({ defaultValue, errorMessage }: PaceSecondsSelectProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>Seconds</Label>
      <Select name="seconds" defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select Seconds" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {paces.paces.seconds?.map((pace) => <SelectItem value={pace.value.toString()}>{pace.label}</SelectItem>)}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
