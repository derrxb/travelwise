import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

export type FadeInOutItemsProps = {
  messages: ReactNode[] | string[];
};

export const FadeInOutItems = ({ messages }: FadeInOutItemsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrentIndex((c) => {
        if (c + 1 > messages.length - 1) {
          return 0;
        } else {
          return c + 1;
        }
      });
    }, 1500);

    return () => clearInterval(timeout);
  }, [messages]);

  return (
    <span className="inline-flex">
      <AnimatePresence exitBeforeEnter>
        {messages.map((message, index) =>
          currentIndex === index ? (
            <motion.span key={index} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {message}
            </motion.span>
          ) : null,
        )}
      </AnimatePresence>
    </span>
  );
};
