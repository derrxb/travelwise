import { redirect, type LoaderFunctionArgs, type MetaFunction } from '@vercel/remix';
import { authenticator } from '~/auth.server';
import { SiteNav } from '~/ui/molecules/site-nav';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Zelo | Running tools for runners by runners',
    },
    {
      name: 'description',
      content: 'Running tools for runners by runners',
    },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  return null;
};

export default function Index() {
  return (
    <div className="h-full w-full px-8 md:px-32 font-sans">
      <SiteNav className="" />
    </div>
  );
}
