'use client';

import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useState } from 'react';
import Link from 'next/link';

const CreateAccountSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type CreateAccountFormValues = z.infer<typeof CreateAccountSchema>;

export default function CreateAccountPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [isSigningUp, setIsSigningUp] = useState(false);

  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: CreateAccountFormValues) => {
    setIsSigningUp(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.error(error.message);
      setIsSigningUp(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-6">
            <h1 className="text-2xl font-bold text-center">Create account</h1>

            <div className="space-y-4 mt-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2 mt-6">
              <Button type="submit" isLoading={isSigningUp} className="w-full">
                Create account
              </Button>

              <Button
                variant="outline"
                type="button"
                className="w-full"
                asChild
              >
                <Link href={'/login'}>Back to login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
