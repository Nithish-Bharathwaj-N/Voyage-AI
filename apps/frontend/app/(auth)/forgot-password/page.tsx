'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { KeyRound, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Please enter a valid email address.'),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSuccess(true);
      toast.success('Password reset link sent to your email!');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Failed to send password reset email.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Form panel */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-xl z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Link
              href="/login"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-800:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black font-display text-slate-900">
              Forgot Password
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your email address and we will send you a link to reset your password.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] font-bold text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-750 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/25"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl text-center space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-900">Email Sent</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We have sent a password reset link to your email. Please check your inbox and spam folders.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Return to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative panel */}
      <div className="hidden lg:block relative flex-1 bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
        <div className="absolute bottom-12 left-12 max-w-lg space-y-3 z-10">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">
            VoyageAI Security
          </span>
          <h2 className="text-3xl font-black font-display text-white leading-tight">
            Protecting your journeys every step of the way.
          </h2>
        </div>
      </div>
    </div>
  );
}
