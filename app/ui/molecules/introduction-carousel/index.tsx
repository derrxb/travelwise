import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';
import React from 'react';
import { introductionCarousel } from '~/content/en.json';
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
    if (!api) {
      return;
    }

    if (api.canScrollNext() && current !== api.scrollSnapList().length - 1) {
      setCurrent((c) => c + 1);
    } else {
      redirect('/login');
    }
  };

  return (
    <Carousel setApi={setApi} className="px-4" opts={{ active: false }}>
      <CarouselContent>
        <CarouselItem className="min-h-[640px] p-4 flex flex-col space-y-4">
          <img src={content.cover} className="h-[480px]" />
          <h3 className="text-3xl font-black text-center">{content?.title}</h3>
          <p className="text-center">{content?.description}</p>
          <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
            {content?.cta}
            <ArrowLongRightIcon className="text-white h-8 w-10" />
          </Button>
        </CarouselItem>
        <CarouselItem className="min-h-[640px] p-4 flex flex-col space-y-4">
          <img src={content.cover} className="h-[480px]" />
          <h3 className="text-3xl font-black text-center">{content?.title}</h3>
          <p className="text-center">{content?.description}</p>
          <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
            {content?.cta}
            <ArrowLongRightIcon className="text-white h-8 w-10" />
          </Button>
        </CarouselItem>
        <CarouselItem className="min-h-[640px] p-4 flex flex-col space-y-4">
          <img src={content.cover} className="h-[480px]" />
          <h3 className="text-3xl font-black text-center">{content?.title}</h3>
          <p className="text-center">{content?.description}</p>
          <Button onClick={onClick} size="lg" variant="default" className="!bg-gray-900 !text-white !w-fit !mx-auto">
            {content?.cta}
            <ArrowLongRightIcon className="text-white h-8 w-10" />
          </Button>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
