import { PaceUnit } from '~/domain/orders/services/calculate-pace-times';
import { cn } from '~/lib/utils';
import { Pace } from '~/ui/atoms/pace';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/ui/atoms/table';

export type PaceTableProps = {
  distances: { label: string }[];
  unit: PaceUnit;
  result: {
    distance: string;
    paces: string[];
    times: string[];
  }[];
};

export const PaceTable = ({ result, unit, distances }: PaceTableProps) => {
  return (
    <div className="bg-slate-50 shadow-lg rounded-lg p-4 border border-slate-300">
      <Table>
        <TableCaption>Your predicted pace times with 2 +-5 seconds intervals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Distances</TableHead>
            {result?.[0]?.paces?.map((pace, index) => (
              <TableHead
                className={cn('font-semibold', {
                  'hidden md:table-cell': index !== 2,
                })}
              >
                <Pace pace={pace} unit={unit} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((pace, index) => (
            <TableRow>
              <TableCell>{distances?.[index]?.label}</TableCell>
              {pace.times?.map((time, timesIndex) => (
                <TableCell
                  className={cn('font-semibold', {
                    'hidden md:table-cell': timesIndex !== 2,
                  })}
                >
                  {time}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
