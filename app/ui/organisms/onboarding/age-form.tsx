import { useTypedFetcher } from 'remix-typedjson';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { cn } from '~/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';
import { ImageNext } from '~/ui/atoms/image-next';
import { getImageProps } from '~/ui/atoms/image-next/utils';

export const AgeForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  return (
    <div className={cn('p-4 grid grid-cols-1 lg:grid-cols-8 space-y-4 gap-4')}>
      <div className="md:col-span-6">
        <ImageNext
          {...getImageProps('/images/onboarding/age')}
          className="w-full h-[40vh] lg:h-[80vh] object-cover object-center rounded-2xl"
        />
      </div>

      <div className="md:col-span-2 flex flex-col md:justify-center space-y-4">
        <h3 className="text-3xl font-black text-center">What is your age?</h3>

        {formErrors?.dateOfBirth ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.dateOfBirth?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST">
          <input name="dateOfBirth" defaultValue={18} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Under 18
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST">
          <input name="dateOfBirth" defaultValue={18} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            18 - 35
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST">
          <input name="dateOfBirth" defaultValue={35} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            35 - 49
          </Button>
        </fetcherData.Form>

        <fetcherData.Form action="/onboarding" method="POST">
          <input name="dateOfBirth" defaultValue={50} hidden />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Above 50
          </Button>
        </fetcherData.Form>

        <div className="w-32 mx-auto !mt-8 h-[6px] bg-black rounded-3xl"></div>
      </div>
    </div>
  );
};
