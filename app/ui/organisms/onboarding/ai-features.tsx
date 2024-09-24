import React from 'react';
import { useTypedFetcher } from 'remix-typedjson';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { cn } from '~/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';
import { ImageNext } from '~/ui/atoms/image-next';
import { getImageProps } from '~/ui/atoms/image-next/utils';
import { InputField } from '~/ui/atoms/input-field-deprecated';

export const InterestedFeaturesForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
  const [customFeature, setCustomFeature] = React.useState('');

  const handleSelectFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      // Remove if it's already selected
      setSelectedFeatures((prev) => prev.filter((item) => item !== feature));
    } else {
      // Add to the list if not selected
      setSelectedFeatures((prev) => [...prev, feature]);
    }
  };

  return (
    <div className={cn('p-4 grid grid-cols-1 lg:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="lg:col-span-6">
        <ImageNext
          {...getImageProps('/public/onboarding/ai-features')}
          className="w-full h-[40vh] lg:h-[80vh] object-cover object-center rounded-2xl"
        />
      </div>
      <div className="lg:col-span-2 flex flex-col lg:justify-center space-y-8">
        <h3 className="text-3xl font-black text-center">Which features will you most likely use?</h3>
        {formErrors?.aiFeatures ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.aiFeatures?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST" className="mx-auto">
          {selectedFeatures
            ? selectedFeatures?.map((item) => <input name="aiFeatures" hidden onChange={() => {}} value={item} />)
            : null}
          <div className="space-y-4 w-full max-w-sm">
            {[
              'Ai Itinerary chatbox',
              'Community discussion',
              'Integration of other platforms',
              'Write your own answer',
            ].map((feature) => (
              <Button
                key={feature}
                type="button"
                onClick={() => handleSelectFeature(feature)}
                className={`py-5 px-4 text-center rounded-3xl w-full border-2 border-gray-900 focus:bg-none hover:bg-black hover:text-white ${
                  selectedFeatures.includes(feature) ? 'bg-black text-white' : 'bg-white text-black border-black'
                }`}
              >
                {feature}
              </Button>
            ))}

            <div className="w-32 mx-auto h-[6px] bg-black rounded-3xl"></div>

            {selectedFeatures?.find((item) => item === 'Write your own answer') ? (
              <InputField
                isFullWidth
                name="aiFeatures"
                label="Custom Answer"
                type="text"
                placeholder="Your own answer"
                labelClassName="text-xs"
                className="border-2 border-black"
                onChange={(e) => setCustomFeature(e.target?.value)}
                value={customFeature}
              />
            ) : null}

            <Button
              disabled={isSubmitting}
              size="lg"
              variant="outline"
              type="submit"
              className="w-full border-2 border-gray-900"
            >
              Confirm
            </Button>
          </div>
        </fetcherData.Form>
      </div>
    </div>
  );
};
