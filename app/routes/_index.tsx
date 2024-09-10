import { type LoaderFunctionArgs, type MetaFunction } from '@vercel/remix';
import { MainLayout } from '~/ui/layouts/main';
import { IntroductionCarousel } from '~/ui/molecules/introduction-carousel';

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
  return null;
};

export default function Index() {
  return (
    <MainLayout>
      <IntroductionCarousel />
    </MainLayout>
  );
}
