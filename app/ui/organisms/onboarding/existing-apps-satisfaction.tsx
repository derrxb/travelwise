import { cn } from '~/lib/utils';
import satisfaction from '/onboarding/ai-satisfaction.png';
import { useTypedFetcher } from 'remix-typedjson';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';
import { TravelAppSatisfaction } from '@prisma/client';

export const DoYouThinkExistingTravelAppMeetYourNeedsForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  return (
    <div className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="md:col-span-6">
        <img src={satisfaction} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
      </div>
      <div className="md:col-span-2 flex flex-col md:justify-center space-y-4">
        <h3 className="text-3xl font-black text-center">Do you think existing app meets your satisfaction?</h3>
        {formErrors?.dateOfBirth ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.dateOfBirth?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="appSatisfaction" defaultValue={'YES'} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Yes
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="appSatisfaction" defaultValue={'NO'} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            No
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="appSatisfaction" defaultValue={'UNDECIDED'} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Not sure
          </Button>
        </fetcherData.Form>
      </div>
    </div>
  );
};
