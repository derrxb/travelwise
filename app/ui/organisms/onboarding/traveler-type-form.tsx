import { cn } from '~/lib/utils';
import age from '/onboarding/age.png';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { useTypedFetcher } from 'remix-typedjson';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';

export const TravelerTypeForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  return (
    <div className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="md:col-span-6">
        <img src={age} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
      </div>
      <div className="md:col-span-2 flex flex-col md:justify-center space-y-2">
        <h3 className="text-3xl font-black text-center">Which one describes you?</h3>
        {formErrors?.travelType ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.travelType?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="travelType" defaultValue="SOLO" hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Solo Traveler
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="travelType" defaultValue="GROUP" hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Group Traveler
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST" className="md:px-8">
          <input name="travelType" defaultValue="BOTH" hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            A bit of both
          </Button>
        </fetcherData.Form>
      </div>
    </div>
  );
};
