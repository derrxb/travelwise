import { redirect, type LoaderFunctionArgs, type MetaFunction } from '@vercel/remix';

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
  return redirect('/pace-calculator');
};

export default function Index() {
  return <div className="h-full w-full px-8 md:px-32 font-sans"></div>;
}
