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
import { Mail, Lock, User, Loader2, ArrowRight, Eye, EyeOff, GitBranch, Check } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
type RegisterInput = z.infer<typeof registerSchema>;

const TRAVEL_IMAGES = [
  'photo-1476514525535-07fb3b4ae5f1',
  'photo-1503220317375-aaad61436b1b',
  'photo-1469854523086-cc02fe5d8800',
];

const PERKS = [
  'AI plans your entire itinerary in seconds',
  'Real destinations — no placeholders ever',
  'Budget optimization & live alerts',
  '127+ countries, millions of POIs',
];

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [oauthLoading, setOauthLoading] = React.useState<'google' | 'github' | null>(null);
  const [imgIndex, setImgIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % TRAVEL_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { first_name: data.firstName, last_name: data.lastName } },
      });
      if (error) { toast.error(error.message); return; }
      toast.success('Account created! Check your email to confirm.');
      router.push('/login');
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
      toast.error('OAuth sign up failed.');
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* ── LEFT: Visual Panel ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/80 to-blue-900/60" />
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/${TRAVEL_IMAGES[imgIndex]}?auto=format&fit=crop&w=1200&q=80)` }}
        />
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[80px] float-orb" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-lg font-display shadow-lg">
              V
            </div>
            <span className="text-white font-bold text-xl font-display">VoyageAI</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Join 18,000+ travelers</p>
            <h2 className="text-4xl font-black font-display text-white leading-tight">
              Start planning trips<br />smarter, faster,<br />
              <span className="text-blue-400">with AI.</span>
            </h2>
          </div>

          <ul className="space-y-3">
            {PERKS.map(perk => (
              <li key={perk} className="flex items-center space-x-3 text-sm text-white/80 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-3 gap-3">
            {TRAVEL_IMAGES.map((id, i) => (
              <div
                key={id}
                className={`h-16 rounded-xl overflow-hidden transition-all duration-500 ${i === imgIndex ? 'ring-2 ring-blue-400' : 'opacity-60'}`}
              >
                <img
                  src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&q=70`}
                  alt="destination"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-7"
        >
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black font-display">V</div>
            <span className="font-bold text-slate-900 text-lg font-display">VoyageAI</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight">Create account.</h1>
            <p className="text-sm text-slate-500 font-medium">Free forever. No credit card needed.</p>
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth('google')}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50:bg-slate-750 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
                            {oauthLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span>Sign up with Google</span>
            </button>
            <button
              onClick={() => handleOAuth('github')}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50:bg-slate-750 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              {oauthLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitBranch className="w-4 h-4" />}
              <span>Sign up with GitHub</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">or email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nithish"
                    {...register('firstName')}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                  />
                </div>
                {errors.firstName && <p className="text-xs text-red-500 font-semibold">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                <input
                  type="text"
                  placeholder="Kumar"
                  {...register('lastName')}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                />
                {errors.lastName && <p className="text-xs text-red-500 font-semibold">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-medium transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-semibold">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center text-slate-500 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
