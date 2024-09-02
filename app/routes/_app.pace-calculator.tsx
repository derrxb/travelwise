import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, MetaFunction } from '@remix-run/react';
import { redirect, typedjson, useTypedActionData, useTypedLoaderData } from 'remix-typedjson';
import { ZodError } from 'zod';
import {
  PaceCalculator,
  paceCalculatorSchema,
  PaceCalculatorValidationErrors,
  PaceUnit,
} from '~/domain/orders/services/calculate-pace-times';
import { Button } from '~/ui/atoms/button';
import { ErrorMessage } from '~/ui/atoms/error-message';
import { Label } from '~/ui/atoms/label';
import { Pace } from '~/ui/atoms/pace';
import { RadioGroup, RadioGroupItem } from '~/ui/atoms/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/ui/atoms/Select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/ui/atoms/table';
import paces from '../content/paces/en.json';
import { PaceTable } from '~/ui/molecules/pace-table';
import { PaceMinutesSelect } from '~/ui/molecules/pace-minutes-select';
import { PaceSecondsSelect } from '~/ui/molecules/pace-seconds-select';
import { PaceUnitRadioGroup } from '~/ui/molecules/pace-unit-radio-group';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Running Pace Calculator | Zelo.run – Predict Your Race Times',
    },
    {
      name: 'description',
      content: `Use Zelo.run's Running Pace Calculator to easily determine your performance across various distances. Enter your minutes and seconds per kilometer or mile to get accurate projections for races of any length. Ideal for runners looking to optimize training and plan race strategies. Built by runners, for runners.`,
    },
  ];
};

const DEFAULT_MINUTE = 5;
const DEFAULT_SECOND = 30;
const DEFAULT_UNIT = PaceUnit.Kilometers;

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const minutes = searchParams.get('minutes') ? Number(searchParams.get('minutes')) : DEFAULT_MINUTE;
  const seconds = searchParams.get('seconds') ? Number(searchParams.get('seconds')) : DEFAULT_SECOND;
  const unit = searchParams.get('unit')
    ? searchParams.get('unit') === PaceUnit.Kilometers
      ? PaceUnit.Kilometers
      : PaceUnit.Miles
    : DEFAULT_UNIT;

  const service = new PaceCalculator()
    .setMinutes(minutes)
    .setSeconds(seconds)
    .setPaceMethod(unit)
    .setOffsets(5, 5) // 5 second interval, 5 times
    .validate(); // Validate the configuration

  const result = service.calculateFinishTimes();

  return typedjson({ result, unit, minutes, seconds });
};

export const action = async (args: ActionFunctionArgs) => {
  let result;
  try {
    const formData = await args.request.formData();
    result = await paceCalculatorSchema.parseAsync({
      minutes: formData.get('minutes'),
      seconds: formData.get('seconds'),
      unit: formData.get('unit'),
      offsets: {
        interval: 5,
        count: 5,
      },
    });
  } catch (error) {
    return typedjson({
      error: 'Something went wrong. Please try again',
      fieldErrors: error instanceof ZodError ? (error.flatten().fieldErrors as PaceCalculatorValidationErrors) : null,
    });
  }

  throw redirect(`/pace-calculator?minutes=${result.paceMinutes}&seconds=${result.paceSeconds}&unit=${result.unit}`);
};

const Page = () => {
  const { result, unit, minutes, seconds } = useTypedLoaderData<typeof loader>();
  const actionData = useTypedActionData<typeof action>();
  const distances = unit === PaceUnit.Kilometers ? paces.distances.km : paces.distances.miles;

  return (
    <div className="max-w-7xl w-full mx-auto py-8 grid grid-cols-8 gap-8">
      <div className="flex flex-col space-y-4 col-span-3">
        <h2 className="text-2xl font-bold">Race Pace Calculator</h2>
        <p>
          Welcome to Zelo.run, the ultimate destination for runners, built by runners. Our Running Pace Calculator is
          just one of the many tools designed to help you achieve your goals. Simply enter your pace, and we’ll provide
          you with projected finish times for various race distances—from quick 5Ks to full marathons.{' '}
        </p>

        <p>
          It’s straightforward, reliable, and tailored to help you fine-tune your training and race-day strategy. Dive
          in and discover how your pace measures up across the board!
        </p>

        <Form className="flex flex-col space-y-4" method="get" action="/pace-calculator">
          <ErrorMessage message={actionData?.error} />

          <div className="grid grid-cols-2 gap-4">
            <PaceMinutesSelect
              defaultValue={minutes.toString()}
              errorMessage={actionData?.fieldErrors?.paceMinutes?.[0]}
            />

            <PaceSecondsSelect
              defaultValue={seconds.toString()}
              errorMessage={actionData?.fieldErrors?.paceSeconds?.[0]}
            />
          </div>

          <PaceUnitRadioGroup defaultValue={unit} errorMessage={actionData?.fieldErrors?.unit?.[0]} />

          <Button type="submit" className="w-fit px-4" size="lg">
            Calculate Finish Time
          </Button>
        </Form>
      </div>

      <div className="col-span-5">
        <PaceTable distances={distances} result={result} unit={unit} />
      </div>
    </div>
  );
};

export default Page;
