import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';
import { Button } from '~/ui/atoms/button';
import { NavLogo } from '~/ui/atoms/NavLogo';

export const SiteNav = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <nav className={`flex h-[96px] w-full flex-row items-center ${className}`}>
      <div className="mr-auto">
        <NavLogo isLink size="large" />
      </div>

      <div className="ml-auto hidden sm:flex">
        <Button
          onClick={() => navigate('/login')}
          size="lg"
          variant="default"
          className="!bg-gray-900 !text-white !w-fit !mx-auto"
        >
          Log in <ArrowLongRightIcon className="text-white h-8 w-10" />
        </Button>
      </div>
    </nav>
  );
};
