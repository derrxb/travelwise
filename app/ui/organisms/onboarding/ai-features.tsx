import { cn } from '~/lib/utils';
import age from '/onboarding/age.png';

export const CountryForm = () => {
  return (
    <div className={cn('p-4 grid grid-cols-1 md:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="md:col-span-6">
        <img src={age} className="w-full h-[40vh] md:h-[80vh] object-cover object-center rounded-2xl" />
      </div>
      <form className="md:col-span-2 flex flex-col md:justify-center space-y-8">
        <h3 className="text-3xl font-black text-center">Which features will you most likely use?</h3>
      </form>
    </div>
  );
};
