import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@remix-run/react';
import { Button, ButtonColors } from '~/ui/atoms/button-deprecated';
import { Krabuu } from '~/ui/atoms/krabuu';

export const SiteNav = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <nav className={`flex h-[96px] w-full flex-row items-center ${className}`}>
      <div className="mr-auto">
        <Krabuu isLink size="large" />
      </div>

      <div className="ml-auto hidden sm:flex">
        <Button
          variant="button"
          color={ButtonColors.Primary}
          onClick={() => navigate('/login')}
          size="small"
          icon={<ChevronRightIcon className="h-4 w-4" />}
        >
          Log in
        </Button>
      </div>
    </nav>
  );
};
