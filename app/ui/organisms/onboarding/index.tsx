import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { AgeForm } from './age-form';
import { InterestedFeaturesForm } from './ai-features';
import { CountryForm } from './country-form';
import { DoYouThinkExistingTravelAppMeetYourNeedsForm } from './existing-apps-satisfaction';
import { TravelerTypeForm } from './traveler-type-form';

export enum OnboardingFlow {
  Age = 'age',
  Country = 'country',
  TypeOfTraveler = 'travel-preference',
  InterestedFeatures = 'interested-features',
  DoYouThinkExistingTravelAppMeetYourNeeds = 'do-you-like-existing-travel-apps',
}

export const OnboardingForm = ({ step, formErrors }: { step: OnboardingFlow; formErrors?: OnboardUserFormErrors }) => {
  if (step === OnboardingFlow.Age) {
    return <AgeForm />;
  }

  if (step === OnboardingFlow.Country) {
    return <CountryForm />;
  }
  if (step === OnboardingFlow.TypeOfTraveler) {
    return <TravelerTypeForm />;
  }
  if (step === OnboardingFlow.InterestedFeatures) {
    return <InterestedFeaturesForm />;
  }
  if (step === OnboardingFlow.DoYouThinkExistingTravelAppMeetYourNeeds) {
    return <DoYouThinkExistingTravelAppMeetYourNeedsForm />;
  }
};
