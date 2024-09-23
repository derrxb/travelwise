import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { ShouldRevalidateFunctionArgs } from '@remix-run/react';
import { redirect, typedjson, useTypedActionData, useTypedLoaderData } from 'remix-typedjson';
import { ZodError } from 'zod';
import { authenticator } from '~/auth.server';
import { UserEntity } from '~/domain/travelwise/entities/user';
import { UserRepository } from '~/domain/travelwise/repositories/user-repository';
import { OnboardUser, OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { getErrorMessage } from '~/lib/error-messages';
import { MainLayout } from '~/ui/layouts/main';
import { OnboardingForm } from '~/ui/organisms/onboarding';

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const userId = (
    await authenticator.isAuthenticated(args.request, {
      failureRedirect: '/login',
    })
  )?.id;

  const user = await UserRepository.findByUserId(userId!);

  if (user?.UserProfile.isOnboardingComplete()) {
    return redirect('/dashboard');
  }

  const onboardingStep = user?.UserProfile.currentOnboardingStep;
  if (!searchParams.get('step') || searchParams.get('step') !== onboardingStep) {
    return redirect(`/onboarding?step=${onboardingStep}`);
  }

  return typedjson({
    onboardingStep,
  });
};

export const action = async (args: ActionFunctionArgs) => {
  const userId = (
    await authenticator.isAuthenticated(args.request, {
      failureRedirect: '/login',
    })
  )?.id;

  let updatedUser: UserEntity;
  try {
    updatedUser = await new OnboardUser(userId!, args.request).call();
  } catch (error) {
    if (error instanceof ZodError) {
      return typedjson({
        success: false,
        error: '',
        formErrors: error.flatten().fieldErrors as OnboardUserFormErrors,
      });
    }

    return typedjson({
      success: false,
      error: getErrorMessage(error),
      formErrors: undefined,
    });
  }

  return redirect(`/onboarding?step=${updatedUser?.UserProfile?.currentOnboardingStep}`);
};

export function shouldRevalidate({
  actionResult,
  currentParams,
  nextParams,
  nextUrl,
  currentUrl,
  defaultShouldRevalidate,
  ...rest
}: ShouldRevalidateFunctionArgs) {
  return currentUrl.searchParams.toString() !== nextUrl.searchParams.toString();
}

const Onboarding = () => {
  const data = useTypedLoaderData<typeof loader>();
  const actionData = useTypedActionData<typeof action>();

  return (
    <MainLayout>
      <OnboardingForm step={data.onboardingStep!} formErrors={actionData?.formErrors} />
    </MainLayout>
  );
};

export default Onboarding;
