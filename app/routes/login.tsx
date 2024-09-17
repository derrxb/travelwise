import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { redirect } from '@remix-run/node';
import { Link, useNavigation } from '@remix-run/react';
import * as joi from 'joi';
import { AuthorizationError } from 'remix-auth';
import { authenticator } from '~/auth.server';
import { getErrorMessage } from '~/lib/error-messages';
import { commitSession, getSession } from '~/session.server';
import { SiteNav } from '~/ui/molecules/site-nav';
import { LoginForm } from '~/ui/organisms/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/ui/atoms/card';
import { typedjson, useTypedActionData } from 'remix-typedjson';
import { MainLayout } from '~/ui/layouts/main';
import { Button } from '~/ui/atoms/button';

const getValuesFromRequest = async (request: Request) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  return values;
};

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Sign in to your TravelWise',
    },
    {
      name: 'description',
      content: 'Sign in to your account to use any of our travel tools',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/dashboard',
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  let headers;
  try {
    const user = await authenticator.authenticate('user-pass', request, {
      throwOnError: true,
    });

    // manually get the session
    const session = await getSession(request.headers.get('cookie'));
    // and store the user data
    session.set(authenticator.sessionKey, user);

    // commit the session
    headers = new Headers({ 'Set-Cookie': await commitSession(session) });
  } catch (error) {
    console.log({ error });
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) throw error;
    // if (error instanceof joi.ValidationError) {
    //   return typedjson({
    //     values: await getValuesFromRequest(request),
    //     errors: error.details.reduce((acc, curr) => {
    //       return {
    //         ...acc,
    //         [curr.type]: curr.message,
    //       };
    //     }, {}),
    //   });
    // }
    if (error instanceof AuthorizationError) {
      return typedjson({
        values: await getValuesFromRequest(request),
        errors: {
          general: getErrorMessage(error),
        },
      });
    }

    return typedjson({
      values: await getValuesFromRequest(request),
      errors: {
        general: getErrorMessage(error),
      },
    });
  }

  throw redirect('/dashboard', { headers });
};

const Login = () => {
  const transition = useNavigation();
  const actionData = useTypedActionData<typeof action>();

  return (
    <MainLayout enableBackgroundImage className="space-y-8 items-center">
      <Card className="w-full md:max-w-xl border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Sign In Now</CardTitle>
          <CardDescription className="text-gray-600">Discover the World with Every Sign In</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm
            className="flex flex-col space-y-2"
            isSubmitting={transition.state === 'submitting'}
            errors={actionData?.errors}
            initialValues={{
              email: actionData?.values?.email?.toString() ?? '',
              password: actionData?.values?.password?.toString() ?? '',
            }}
          />
        </CardContent>
      </Card>

      <Button
        asChild
        type="submit"
        size="lg"
        variant="default"
        className="!text-black !bg-white !w-full !mx-auto md:!max-w-xl"
      >
        <Link to="/register">Sign Up</Link>
      </Button>
    </MainLayout>
  );
};

export default Login;
