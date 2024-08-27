import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { redirect } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';
import * as joi from 'joi';
import { AuthorizationError } from 'remix-auth';
import { authenticator } from '~/auth.server';
import { getErrorMessage } from '~/lib/error-messages';
import { commitSession, getSession } from '~/session.server';
import { SiteNav } from '~/ui/molecules/site-nav';
import { LoginForm } from '~/ui/organisms/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/ui/atoms/card';
import { typedjson, useTypedActionData } from 'remix-typedjson';

const getValuesFromRequest = async (request: Request) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  return values;
};

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Sign in to your Zelo Account',
    },
    {
      name: 'description',
      content: 'Sign in to your account to use any of our running tools',
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
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) throw error;
    if (error instanceof joi.ValidationError) {
      return typedjson({
        values: await getValuesFromRequest(request),
        errors: error.details.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.type]: curr.message,
          };
        }, {}),
      });
    }
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
    <div className="h-full w-full px-8 md:px-32">
      <SiteNav />

      <div className="my-32 flex flex-col items-center space-y-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to log into your account</CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm
              isSubmitting={transition.state === 'submitting'}
              errors={actionData?.errors}
              initialValues={{
                email: actionData?.values?.email?.toString() ?? '',
                password: actionData?.values?.password?.toString() ?? '',
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
