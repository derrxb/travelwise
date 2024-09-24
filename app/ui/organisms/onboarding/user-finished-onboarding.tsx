import { Link } from '@remix-run/react';
import { cn } from '~/lib/utils';
import { Button } from '~/ui/atoms/button';
import { ImageNext } from '~/ui/atoms/image-next';
import { getImageProps } from '~/ui/atoms/image-next/utils';

export const UserFinishOnboarding = () => {
  return (
    <div className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4')}>
      <div className="md:col-span-6">
        <ImageNext
          {...getImageProps('/public/onboarding/ai-features')}
          className="w-full h-[40vh] lg:h-[80vh] object-cover object-center rounded-2xl"
        />{' '}
      </div>

      <div className="md:col-span-2 flex flex-col md:justify-center space-y-4 text-center leading-relaxed">
        <h3 className="text-3xl font-black text-center">Thank you so much!</h3>
        <p className="text-gray-800">
          Hi there! Thank you for signing up with TravelWise! I'm the founder <span className="font-bold">Cindy</span>{' '}
          and we are working on the app at the moment and it is estimated will be completed{' '}
          <span className="font-bold">before November 2024</span>, We will send you email as the new users.
        </p>
        <Button asChild size="lg" variant="outline" type="submit" className="w-full border-2 border-gray-900">
          <Link to="/dashboard">Thank you!</Link>
        </Button>
      </div>
    </div>
  );
};
