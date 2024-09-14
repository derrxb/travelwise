import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';
import React from 'react';
import { introductionCarousel } from '~/content/en.json';
import { cn } from '~/lib/utils';
import { Button } from '~/ui/atoms/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '~/ui/atoms/carousel';

export const IntroductionCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('scroll', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, []);

  const content = introductionCarousel?.[current];
  const redirect = useNavigate();
  const onClick = () => {
    if (!introductionCarousel?.[current]) {
      return redirect('/login');
    }
    if (!api) {
      return;
    }

    if (introductionCarousel?.[current]) {
      setCurrent((c) => c + 1);
    }
  };

  React.useEffect(() => {
    if (!content) {
      redirect('/login');
    }
  }, [content]);

  if (!content) {
    return null;
  }

  return (
    <Carousel setApi={setApi} className="px-4 md:px-8" opts={{ active: false }}>
      <CarouselContent>
        <CarouselItem
          className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {
            hidden: current !== 0,
          })}
        >
          <div className="md:col-span-6">
            <img src={content.cover} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
          </div>
          <div className="md:col-span-2 flex flex-col md:justify-center space-y-8">
            <h3 className="text-3xl font-black text-center">{content?.title}</h3>
            <p className="text-center">{content?.description}</p>
            <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
              {content?.cta}
              <ArrowLongRightIcon className="text-white h-8 w-10" />
            </Button>
          </div>
        </CarouselItem>
        <CarouselItem
          className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {
            hidden: current !== 1,
          })}
        >
          <div className="md:col-span-6">
            <img src={content.cover} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
          </div>
          <div className="md:col-span-2 flex flex-col md:justify-center space-y-8">
            <h3 className="text-3xl font-black text-center">{content?.title}</h3>
            <p className="text-center">{content?.description}</p>
            <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
              {content?.cta}
              <ArrowLongRightIcon className="text-white h-8 w-10" />
            </Button>
          </div>
        </CarouselItem>
        <CarouselItem
          className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {
            hidden: current !== 2,
          })}
        >
          <div className="md:col-span-6">
            <img src={content.cover} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
          </div>
          <div className="md:col-span-2 flex flex-col md:justify-center space-y-8">
            <h3 className="text-3xl font-black text-center">{content?.title}</h3>
            <p className="text-center">{content?.description}</p>
            <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
              {content?.cta}
              <ArrowLongRightIcon className="text-white h-8 w-10" />
            </Button>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
