import { type LoaderFunctionArgs, type MetaFunction } from '@vercel/remix';
import { redirect } from 'remix-typedjson';
import { authenticator } from '~/auth.server';
import { MainLayout } from '~/ui/layouts/main';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'TravelWise | TravelWise with AI',
    },
    {
      name: 'description',
      content: 'Your AI trip planner',
    },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(args.request, {});

  // TODO: Uncomment once we are able to mark onboarding as completed
  // if (!user?.isOnboarded) {
  //   return redirect('/onboarding');
  // }

  return null;
};

export default function Index() {
  return (
    <MainLayout>
      <span className="mx-auto my-auto">Coming Soon...</span>
    </MainLayout>
  );
}
