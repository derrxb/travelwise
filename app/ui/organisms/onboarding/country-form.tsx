import { countries, TCountryCode } from 'countries-list';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { useTypedFetcher } from 'remix-typedjson';
import { OnboardUserFormErrors } from '~/domain/travelwise/services/onboard-user';
import { cn } from '~/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '~/ui/atoms/alert';
import { Button } from '~/ui/atoms/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/ui/molecules/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/ui/molecules/popover';
import country from '/onboarding/origin.png';

export const CountryForm = () => {
  const fetcherData = useTypedFetcher<{ formErrors?: OnboardUserFormErrors }>();
  const formErrors = fetcherData?.data?.formErrors;
  const isSubmitting = fetcherData.state === 'submitting';

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<TCountryCode | string>('');

  return (
    <div className={cn('p-4 grid grid-cols-1 lg:grid-cols-8 space-y-4 gap-4', {})}>
      <div className="lg:col-span-6">
        <img src={country} className="w-full h-[40vh] lg:h-[80vh] object-cover object-center rounded-2xl" />
      </div>
      <div className="lg:col-span-2 flex flex-col md:justify-center space-y-8">
        <h3 className="text-3xl font-black text-center">Where are you from?</h3>

        {formErrors?.country ? (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong, Please try again</AlertTitle>
            <AlertDescription>{formErrors?.country?.[0]}</AlertDescription>
          </Alert>
        ) : null}

        <fetcherData.Form action="/onboarding" method="POST" className="lg:px-8 space-y-4">
          <input name="country" hidden onChange={() => {}} value={value} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-14 border-black border-2"
              >
                {value ? countries[value as any as TCountryCode]?.name : 'Select Country...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[280px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="focus:outline-none border-transparent focus:border-transparent focus:ring-0"
                />
                <CommandList>
                  <CommandEmpty>No Country Selected Yet</CommandEmpty>
                  <CommandGroup>
                    {Object.keys(countries)?.map((countryCode) => {
                      const country = countries[countryCode as any as TCountryCode];
                      return (
                        <CommandItem
                          key={country.name}
                          value={country?.name}
                          onSelect={() => {
                            setValue(countryCode);
                            setOpen(false);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', value === countryCode ? 'opacity-100' : 'opacity-0')} />
                          {country.name}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            disabled={isSubmitting}
            size="lg"
            variant="outline"
            type="submit"
            className="w-full border-2 border-gray-900"
          >
            Confirm
          </Button>
        </fetcherData.Form>
      </div>
    </div>
  );
};
