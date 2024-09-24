import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  lowSrc?: string; // Low-resolution image
  mediumSrc?: string; // medium
  originalSrc?: string; // High-resolution image
};

export const ImageNext = (props: ImageProps) => {
  const [lowLoaded, setLowLoaded] = useState(false);
  const [mediumLoaded, setMediumLoaded] = useState(false);
  const [highLoaded, setHighLoaded] = useState(false);

  const lowRef = useRef<HTMLImageElement>(null);
  const mediumRef = useRef<HTMLImageElement>(null);
  const highRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (lowRef.current?.complete) setLowLoaded(true);
    if (mediumRef.current?.complete) setMediumLoaded(true);
    if (highRef.current?.complete) setHighLoaded(true);
  }, []);

  return (
    <figure
      className={clsx(
        'relative aspect-video overflow-hidden bg-cover bg-center bg-no-repeat object-cover object-center rounded-md',
        {
          'animate-pulse bg-gray-200': !lowLoaded,
        },
        props?.className,
      )}
    >
      {/* LQIP Image */}
      {props.lowSrc && (
        <img
          ref={lowRef}
          alt={props.alt}
          style={{
            transition: 'opacity 0.5s ease-in',
          }}
          src={props.lowSrc}
          className={clsx(
            'absolute top-0 left-0 aspect-video h-full w-full object-cover object-center rounded-md',
            {
              'opacity-100': lowLoaded && !mediumLoaded,
              'opacity-0': mediumLoaded,
            },
            props?.className,
          )}
          onLoad={() => setLowLoaded(true)}
        />
      )}

      {/* Medium-Resolution Image */}
      {props.mediumSrc && (
        <img
          ref={mediumRef}
          alt={props.alt}
          style={{
            transition: 'opacity 0.5s ease-in',
          }}
          src={props.lowSrc}
          className={clsx(
            'absolute top-0 left-0 aspect-video h-full w-full object-cover object-center rounded-md',
            {
              'opacity-100': mediumLoaded && !highLoaded,
              'opacity-0': mediumLoaded,
            },
            props?.className,
          )}
          onLoad={() => setMediumLoaded(true)}
        />
      )}

      {/* High-Resolution Image */}
      {props.originalSrc && (
        <img
          ref={highRef}
          alt={props.alt}
          style={{
            transition: 'opacity 0.5s ease-in',
          }}
          src={props.originalSrc}
          className={clsx(
            'absolute top-0 left-0 aspect-video h-full w-full object-cover object-center rounded-md',
            {
              'opacity-100': highLoaded,
              'opacity-0': !highLoaded,
            },
            props?.className,
          )}
          onLoad={() => setHighLoaded(true)}
        />
      )}
    </figure>
  );
};
