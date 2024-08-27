import { redirect, type LoaderFunctionArgs, type MetaFunction } from '@vercel/remix';
import { authenticator } from '~/auth.server';
import { SiteNav } from '~/ui/molecules/site-nav';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Krabuu | Sell anything online in Belize, without the hassle',
    },
    {
      name: 'description',
      content: 'Sell anything online in Belize, without the hassle',
    },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(args.request, {
    failureRedirect: `/login?redirectTo=${new URL(args.request.url).pathname}`,
  });

  throw redirect('/');
};

export default function Index() {
  return (
    <div className="h-full w-full px-8 md:px-32 font-sans">
      <SiteNav className="" />
    </div>
  );
}
