import assert from 'assert';
import { subYears } from 'date-fns';
import { z } from 'zod';
import { onboardingSchema } from '~/presentation/requests/onboarding';
import { UserProfileRepository } from '../repositories/user-profile-repository';
import { UserRepository } from '../repositories/user-repository';

export type OnboardUserFormErrors = z.inferFlattenedErrors<typeof onboardingSchema>['fieldErrors'];

export class OnboardUser {
  private userId: number;
  private request: Request;

  constructor(userId: number, request: Request) {
    this.userId = userId;
    this.request = request;
  }

  async validateData() {
    const formData = await this.request.formData();
    const aiFeatures = formData.getAll('aiFeatures') as string[] | null;
    const data = await onboardingSchema.parseAsync({
      dateOfBirth: formData.get('dateOfBirth'),
      country: formData.get('country'),
      travelType: formData.get('travelType'),
      aiFeatures: aiFeatures && aiFeatures?.length > 0 ? aiFeatures : null,
    });

    return data;
  }

  async call() {
    const user = await UserRepository.findByUserId(this.userId);

    assert(user, 'User does not exist');
    assert(!user.UserProfile.isOnboardingComplete(), 'User is already fully onboarded');

    const updates = await this.validateData();
    const userProfile = await UserProfileRepository.onboardUserByUserId(this.userId, {
      dateOfBirth: updates?.dateOfBirth ? subYears(new Date(), updates.dateOfBirth) : undefined,
      country: updates?.country ? updates?.country : undefined,
      travelType: updates?.travelType ? updates?.travelType : undefined,
      aiFeatures: updates?.aiFeatures ? updates.aiFeatures : undefined, // Store aiFeatures in the user profile
    });

    // Replace the user profile on the user
    user.UserProfile = userProfile!;

    return user!;
  }
}
