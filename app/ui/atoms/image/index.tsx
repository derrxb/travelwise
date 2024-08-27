import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = (props: ImageProps) => {
  const [imageLoaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <figure
      className={clsx(
        'relative aspect-video overflow-hidden bg-cover bg-center bg-no-repeat object-cover object-center rounded-md',
        {
          'animate-pulse bg-gray-200': !imageLoaded,
        },
        props?.className,
      )}
    >
      <img
        ref={imageRef}
        alt={props.alt}
        style={{
          transition: 'opacity 0.5s ease-in',
        }}
        src={props.src}
        className={clsx(
          'absolute top-0 left-0 aspect-video h-full w-full object-cover object-center rounded-md',
          {
            'opacity-100': imageLoaded,
            'opacity-0': !imageLoaded,
          },
          props?.className,
        )}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </figure>
  );
};
