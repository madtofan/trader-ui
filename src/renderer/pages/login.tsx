import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/userApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/form-input';
import MainLayout from '@/components/layouts/main-layout';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: login } = useLogin({
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (err: any) => {
      let errorMessage = err.message;
      if (err.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      }
      toast({
        title: 'Login Failed',
        description: errorMessage || 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && window) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign in</h1>

          <p className="mt-4 ">Trader app that will change your life</p>
        </div>

        <Form {...form}>
          <form
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              control={form.control}
              name="email"
              inputType="email"
              placeholder="Email"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              icon="Email"
            />
            <FormInput
              control={form.control}
              name="password"
              inputType="password"
              placeholder="Password"
              inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              icon="Password"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link className="underline pl-1" to="/register">
                  Sign up
                </Link>
              </p>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
}
