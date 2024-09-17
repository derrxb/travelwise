import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect, typedjson, useTypedLoaderData } from 'remix-typedjson';
import { authenticator } from '~/auth.server';
import { UserRepository } from '~/domain/travelwise/repositories/user-repository';
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

const Onboarding = () => {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <MainLayout>
      <OnboardingForm step={data.onboardingStep!} />
    </MainLayout>
  );
};

export default Onboarding;
