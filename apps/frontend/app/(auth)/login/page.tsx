'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff, GitBranch } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
type LoginInput = z.infer<typeof loginSchema>;

const AI_QUOTES = [
  '"I found a restaurant in Kyoto that even locals don\'t know about."',
  '"Flight prices dropped 18%. Updating your budget now."',
  '"Heavy rain tomorrow — moving outdoor activities indoors."',
  '"Your Bali trip is 23% cheaper than the average. Great timing!"',
];

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [oauthLoading, setOauthLoading] = React.useState<'google' | 'github' | null>(null);
  const [quoteIndex, setQuoteIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % AI_QUOTES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) { toast.error(error.message || 'Invalid credentials.'); return; }
      toast.success('Welcome back!');
      router.push('/dashboard');
      router.refresh();
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) toast.error(error.message);
    } catch {
      toast.error('OAuth login failed.');
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* ── LEFT: Animated Showcase Panel ── */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden flex-col justify-between p-12">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900 to-indigo-900/60" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px] float-orb" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[80px] float-orb" style={{ animationDelay: '2s' }} />

        {/* Background travel image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80)' }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-lg font-display shadow-lg">
              V
            </div>
            <span className="text-white font-bold text-xl font-display">VoyageAI</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-300">AI Travel Operating System</div>
            <h2 className="text-4xl font-black font-display text-white leading-tight">
              Your AI Chief<br />Travel Officer<br />
              <span className="text-blue-400">never sleeps.</span>
            </h2>
          </div>

          {/* Rotating AI quote */}
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full mt-1 shrink-0 animate-pulse" />
            <p className="text-sm text-white/90 font-medium italic leading-relaxed">
              {AI_QUOTES[quoteIndex]}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '18K+', label: 'Trips planned' },
              { value: '127', label: 'Countries' },
              { value: '97%', label: 'AI accuracy' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black font-display text-white">{s.value}</div>
                <div className="text-xs text-white/50 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel destination images strip */}
        <div className="relative z-10 flex space-x-2 overflow-hidden">
          {[
            'photo-1493976040374-85c8e12f0c0e',
            'photo-1537996194471-e657df975ab4',
            'photo-1530122037265-a5f1f91d3b99',
          ].map((id) => (
            <div key={id} className="flex-1 h-20 rounded-xl overflow-hidden">
              <img
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&q=70`}
                alt="destination"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Login Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black font-display">V</div>
            <span className="font-bold text-slate-900 text-lg font-display">VoyageAI</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight">
              Welcome back.
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Sign in to access your AI travel workspace.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50:bg-slate-750 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
                            {oauthLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
            <button
              onClick={() => handleOAuth('github')}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50:bg-slate-750 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {oauthLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitBranch className="w-4 h-4" />}
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">or email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-semibold">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 font-medium">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
