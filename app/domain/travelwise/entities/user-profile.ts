import type { UserProfile as UserProfileORM } from '@prisma/client';
import Failure from '~/lib/failure';
import { OnboardingFlow } from '~/ui/organisms/onboarding';

export class UserProfileEntity {
  id?: UserProfileORM['id'];
  createdAt: UserProfileORM['createdAt'];
  updatedAt: UserProfileORM['updatedAt'];
  country: UserProfileORM['country'];
  dateOfBirth: UserProfileORM['dateOfBirth'];
  travelAppSatisfaction: UserProfileORM['travelAppSatisfaction'];
  travelType: UserProfileORM['travelType'];
  aiFeatures: UserProfileORM['aiFeatures'];
  userId: UserProfileORM['userId'];

  constructor(userProfile: UserProfileORM) {
    this.id = userProfile?.id;
    this.createdAt = userProfile?.createdAt;
    this.updatedAt = userProfile?.updatedAt;
    this.country = userProfile?.country;
    this.dateOfBirth = userProfile?.dateOfBirth;
    this.travelAppSatisfaction = userProfile?.travelAppSatisfaction;
    this.travelType = userProfile?.travelType;
    this.aiFeatures = userProfile?.aiFeatures;
    this.userId = userProfile?.userId;
  }

  isEqual(userProfile: UserProfileEntity) {
    return this.id === userProfile.id;
  }

  isOnboardingComplete() {
    return Boolean(
      this.country &&
        this.dateOfBirth &&
        this.travelType &&
        this.aiFeatures &&
        typeof this.travelAppSatisfaction !== 'undefined' &&
        this.travelAppSatisfaction !== null,
    );
  }

  get currentOnboardingStep() {
    if (!this.dateOfBirth) {
      return OnboardingFlow.Age;
    }

    if (!this.country) {
      return OnboardingFlow.Country;
    }

    if (!this.travelType) {
      return OnboardingFlow.TypeOfTraveler;
    }

    if (!this.aiFeatures) {
      return OnboardingFlow.InterestedFeatures;
    }

    if (!this.travelAppSatisfaction) {
      return OnboardingFlow.DoYouThinkExistingTravelAppMeetYourNeeds;
    }

    throw new Failure('bad_request', 'Onboarding has been completed, there is no need to double-check');
  }

  json(): UserProfileDTO {
    return {
      id: this.id,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      country: this.country,
      dateOfBirth: this.dateOfBirth,
      travelAppSatisfaction: this.travelAppSatisfaction,
      travelType: this.travelType,
      aiFeatures: this.aiFeatures,
      userId: this.userId,
    } as UserProfileDTO;
  }
}

export type UserProfileDTO = Omit<UserProfileEntity, 'createdAt' | 'updatedAt'> & {
  createdAt?: string;
  updatedAt?: string;
};
