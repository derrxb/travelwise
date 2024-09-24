import { useTypedFetcher } from 'remix-typedjson';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { cn } from '~/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';
import { ImageNext } from '~/ui/atoms/image-next';
import { getImageProps } from '~/ui/atoms/image-next/utils';

export const DoYouThinkExistingTravelAppMeetYourNeedsForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  return (
    <div className={cn('p-4 grid grid-cols-1 lg:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="lg:col-span-6">
        <ImageNext
          {...getImageProps('/public/onboarding/ai-satisfaction')}
          className="w-full h-[40vh] lg:h-[80vh] object-cover object-center rounded-2xl"
        />{' '}
      </div>
      <div className="lg:col-span-2 flex flex-col lg:justify-center space-y-4">
        <h3 className="text-3xl font-black text-center">Do you think existing app meets your satisfaction?</h3>
        {formErrors?.dateOfBirth ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.dateOfBirth?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST">
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

        <fetcherData.Form action="/onboarding" method="POST">
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

        <fetcherData.Form action="/onboarding" method="POST">
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
