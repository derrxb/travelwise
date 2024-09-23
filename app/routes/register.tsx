import { redirect } from '@remix-run/node';
import { Link, useNavigation } from '@remix-run/react';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import * as joi from 'joi';
import { AuthorizationError } from 'remix-auth';
import { typedjson, useTypedActionData } from 'remix-typedjson';
import { authenticator } from '~/auth.server';
import { RegisterUser } from '~/domain/travelwise/services/register-user';
import { getErrorMessage } from '~/lib/error-messages';
import loginSchema from '~/presentation/requests/login';
import { registerSchema } from '~/presentation/requests/register';
import { commitSession, getSession } from '~/session.server';
import { Button } from '~/ui/atoms/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/ui/atoms/card';
import { MainLayout } from '~/ui/layouts/main';
import { RegisterForm } from '~/ui/organisms/auth/register-form';

const getValuesFromRequest = async (formData: FormData) => {
  const values = Object.fromEntries(formData);

  return values;
};

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Join TravelWise',
    },
    {
      name: 'description',
      content: 'Create your account to use any of our travel tools',
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
  const formData = await request.formData();
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const validated = await registerSchema.parseAsync({
      name,
      email,
      password,
    });

    const newUser = await new RegisterUser(validated.name, validated.email, validated.password).call();
    const session = await getSession(request.headers.get('cookie'));
    // and store the user data
    session.set(authenticator.sessionKey, newUser?.json());

    // commit the session
    headers = new Headers({ 'Set-Cookie': await commitSession(session) });
  } catch (error) {
    console.log({ error });
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) throw error;
    if (error instanceof AuthorizationError) {
      return typedjson({
        values: await getValuesFromRequest(formData),
        errors: {
          general: getErrorMessage(error),
        },
      });
    }

    return typedjson({
      values: await getValuesFromRequest(formData),
      errors: {
        general: getErrorMessage(error),
      },
    });
  }

  throw redirect('/dashboard', { headers });
};

const Register = () => {
  const transition = useNavigation();
  const actionData = useTypedActionData<typeof action>();

  return (
    <MainLayout enableBackgroundImage className="space-y-8 items-center">
      <Card className="w-full md:max-w-xl border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Sign Up Now</CardTitle>
          <CardDescription className="text-gray-600">Discover the World with Every Sign Up</CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm
            className="flex flex-col space-y-2"
            isSubmitting={transition.state === 'submitting'}
            errors={actionData?.errors}
            initialValues={{
              name: actionData?.values?.name?.toString() ?? '',
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
        <Link to="/login">Sign In</Link>
      </Button>
    </MainLayout>
  );
};

export default Register;
