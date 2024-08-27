import { Button } from '~/ui/atoms/button';
import { Sheet, SheetContent, SheetTrigger } from '~/ui/atoms/sheet';
import { BurgerNavItem } from '../burger-nav-item';
import { Krabuu } from '~/ui/atoms/krabuu';
import { Home, Package, PanelLeft, Settings, ShoppingCart } from 'lucide-react';
import { Routes } from '~/ui/atoms/sidebar-item';

export const BurgerNav = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Krabuu size="large" />
            <BurgerNavItem label="Dashboard" href={Routes.Dashboard} icon={<Home className="h-5 w-5" />} />
            <BurgerNavItem label="Products" href={Routes.Products} icon={<Package className="h-5 w-5" />} />
            <BurgerNavItem label="Orders" href={Routes.Orders} icon={<ShoppingCart className="h-5 w-5" />} />
            <BurgerNavItem label="Settings" href={Routes.Settings} icon={<Settings className="h-5 w-5" />} />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
