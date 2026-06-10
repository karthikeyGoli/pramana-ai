import { FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Eye,
  Leaf,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { getSupabaseClient } from '../lib/supabaseClient'

type AuthMode = 'signup' | 'login'

interface IntakeState {
  displayName: string
  ageRange: string
  sexContext: string
  primaryGoals: string[]
  priorityAreas: string[]
  skinContext: string[]
  hairContext: string[]
  nutritionPattern: string
  activityLevel: string
  sleepQuality: string
  stressLevel: string
  allergies: string
  medications: string
  knownConditions: string
  cycleContext: string
  ayurvedaInterest: string
  consentHealthIntake: boolean
}

const initialIntake: IntakeState = {
  displayName: '',
  ageRange: '25-34',
  sexContext: 'female',
  primaryGoals: ['Anti-fake product guidance'],
  priorityAreas: ['Skin'],
  skinContext: ['Sensitive'],
  hairContext: [],
  nutritionPattern: 'Balanced home food with occasional eating out',
  activityLevel: 'moderate',
  sleepQuality: 'mixed',
  stressLevel: 'moderate',
  allergies: '',
  medications: '',
  knownConditions: '',
  cycleContext: '',
  ayurvedaInterest: 'subtle',
  consentHealthIntake: false,
}

const primaryGoalOptions = [
  'Anti-fake product guidance',
  'Skin clarity',
  'Hair strength',
  'Gut and energy',
  'Fitness recovery',
  'Safer supplements',
]

const priorityOptions = ['Skin', 'Hair', 'Nutrition', 'Fitness', 'Sleep', 'Stress', 'Cycle care']
const skinOptions = ['Sensitive', 'Acne-prone', 'Pigmentation', 'Dry', 'Oily', 'Barrier repair']
const hairOptions = ['Hair fall', 'Dandruff', 'Scalp oiliness', 'Dry ends', 'Frizz', 'Growth focus']

const fieldGroups = [
  {
    icon: ShieldCheck,
    title: 'Trust baseline',
    body: 'Age range, body context, and consent so Pramana can personalize responsibly.',
  },
  {
    icon: Brain,
    title: 'Body signals',
    body: 'Sleep, stress, activity, and nutrition patterns that shape product fit.',
  },
  {
    icon: Leaf,
    title: 'Indian wellness lens',
    body: 'A subtle Ayurveda preference, used as context rather than diagnosis.',
  },
]

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [intakeStatus, setIntakeStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [intake, setIntake] = useState<IntakeState>(initialIntake)

  const supabaseConfigured = Boolean(getSupabaseClient())
  const progress = useMemo(() => {
    const filled = [
      intake.displayName,
      intake.ageRange,
      intake.sexContext,
      intake.primaryGoals.length,
      intake.priorityAreas.length,
      intake.nutritionPattern,
      intake.activityLevel,
      intake.sleepQuality,
      intake.stressLevel,
      intake.consentHealthIntake,
    ].filter(Boolean).length

    return Math.round((filled / 10) * 100)
  }, [intake])

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthStatus('loading')
    setMessage('')

    const supabase = getSupabaseClient()

    if (!supabase) {
      setAuthStatus('error')
      setMessage('Supabase client env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }

    const authCall =
      mode === 'signup'
        ? supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth`,
            },
          })
        : supabase.auth.signInWithPassword({ email, password })

    const { data, error } = await authCall

    if (error) {
      setAuthStatus('error')
      setMessage(error.message)
      return
    }

    setAccessToken(data.session?.access_token ?? null)
    setAuthStatus('ready')
    setMessage(
      data.session
        ? 'You are signed in. Complete the body intelligence intake.'
        : 'Check your email to confirm your account, then return here to complete intake.',
    )
  }

  async function handleIntakeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accessToken) {
      setIntakeStatus('error')
      setMessage('Please sign in after confirming your email before submitting intake.')
      return
    }

    setIntakeStatus('saving')

    try {
      const response = await fetch('/api/health-intake', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intake),
      })

      if (!response.ok) throw new Error(`Intake failed with ${response.status}`)

      setIntakeStatus('saved')
      setMessage('Your Pramana profile is ready for future evidence-based personalization.')
    } catch (error) {
      setIntakeStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not save intake right now.')
    }
  }

  function toggleList(field: keyof Pick<IntakeState, 'primaryGoals' | 'priorityAreas' | 'skinContext' | 'hairContext'>, value: string) {
    setIntake((current) => {
      const exists = current[field].includes(value)
      return {
        ...current,
        [field]: exists
          ? current[field].filter((item) => item !== value)
          : [...current[field], value],
      }
    })
  }

  return (
    <main className="premium-ambient premium-grain relative min-h-screen overflow-hidden px-6 py-8 text-white">
      <div className="premium-vignette absolute inset-0" />
      <div className="relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest text-gold">
            <Sparkles size={18} />
          </div>
          <span className="font-display text-2xl font-semibold text-cream">Pramana AI</span>
        </Link>
        <Link to="/" className="text-sm font-bold text-gold">
          Back to site
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-xl">
            <ShieldCheck size={14} />
            Private beta identity
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-normal leading-[1.02] text-cream md:text-6xl">
            Sign in to build your anti-fake body profile.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            A premium intake for product fit, routines, and wellness context. Pramana
            uses this to personalize future validation, not to diagnose or treat.
          </p>

          <div className="mt-8 grid gap-4">
            {fieldGroups.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-soft backdrop-blur-xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-forest">
                  <item.icon size={19} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-normal text-cream">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-white/62">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-gold/20 bg-gold/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Why we ask
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Skin, supplements, sleep, stress, and food are connected. The intake gives
              Pramana enough context to warn gently and rank smarter, without storing
              documents, exact DOB, wearable imports, or clinical records.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[2rem] border border-white/75 bg-white/95 p-4 text-ink shadow-pramana backdrop-blur-xl md:p-6"
        >
          <div className="grid gap-3 rounded-3xl bg-cream p-2 sm:grid-cols-2">
            {(['signup', 'login'] as AuthMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                  mode === item ? 'bg-forest text-white shadow-green' : 'text-ink-muted hover:text-forest'
                }`}
              >
                {item === 'signup' ? 'Create account' : 'Login'}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="mt-5 grid gap-4">
            <label className="text-sm font-semibold">
              Email
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-200 bg-cream px-4 py-3">
                <Mail size={18} className="text-forest" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </span>
            </label>
            <label className="text-sm font-semibold">
              Password
              <span className="mt-2 flex items-center gap-3 rounded-2xl border border-stone-200 bg-cream px-4 py-3">
                <Lock size={18} className="text-forest" />
                <input
                  required
                  minLength={8}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </span>
            </label>
            {!supabaseConfigured && (
              <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                Add Supabase browser env vars before this form can authenticate.
              </p>
            )}
            <button
              type="submit"
              disabled={authStatus === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cta px-5 py-4 text-sm font-bold text-forest shadow-green transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {authStatus === 'loading' ? 'Securing account...' : mode === 'signup' ? 'Create and continue' : 'Login and continue'}
              <ArrowRight size={18} />
            </button>
          </form>

          {authStatus === 'ready' && (
            <form onSubmit={handleIntakeSubmit} className="mt-6 rounded-[1.75rem] border border-forest/10 bg-forest p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Body intelligence intake</p>
                  <h2 className="mt-2 font-display text-3xl font-normal">Your first Pramana profile</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Activity className="text-gold" />
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Preferred name
                  <input
                    required
                    value={intake.displayName}
                    onChange={(event) => setIntake({ ...intake, displayName: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/40"
                    placeholder="What should Pramana call you?"
                  />
                </label>
                <SelectField
                  label="Age range"
                  value={intake.ageRange}
                  onChange={(value) => setIntake({ ...intake, ageRange: value })}
                  options={['18-24', '25-34', '35-44', '45-54', '55+']}
                />
                <SelectField
                  label="Body context"
                  value={intake.sexContext}
                  onChange={(value) => setIntake({ ...intake, sexContext: value })}
                  options={['female', 'male', 'intersex', 'prefer-not-to-say']}
                />
                <SelectField
                  label="Ayurveda preference"
                  value={intake.ayurvedaInterest}
                  onChange={(value) => setIntake({ ...intake, ayurvedaInterest: value })}
                  options={['subtle', 'balanced', 'strong']}
                />
              </div>

              <PillGroup title="Main goals" options={primaryGoalOptions} selected={intake.primaryGoals} onToggle={(value) => toggleList('primaryGoals', value)} />
              <PillGroup title="Priority areas" options={priorityOptions} selected={intake.priorityAreas} onToggle={(value) => toggleList('priorityAreas', value)} />
              <PillGroup title="Skin context" options={skinOptions} selected={intake.skinContext} onToggle={(value) => toggleList('skinContext', value)} />
              <PillGroup title="Hair context" options={hairOptions} selected={intake.hairContext} onToggle={(value) => toggleList('hairContext', value)} />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Activity"
                  value={intake.activityLevel}
                  onChange={(value) => setIntake({ ...intake, activityLevel: value })}
                  options={['low', 'moderate', 'active', 'athlete']}
                />
                <SelectField
                  label="Sleep"
                  value={intake.sleepQuality}
                  onChange={(value) => setIntake({ ...intake, sleepQuality: value })}
                  options={['poor', 'mixed', 'good', 'excellent']}
                />
                <SelectField
                  label="Stress"
                  value={intake.stressLevel}
                  onChange={(value) => setIntake({ ...intake, stressLevel: value })}
                  options={['low', 'moderate', 'high', 'very-high']}
                />
                <label className="text-sm font-semibold">
                  Nutrition pattern
                  <input
                    required
                    value={intake.nutritionPattern}
                    onChange={(event) => setIntake({ ...intake, nutritionPattern: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-4">
                <TextArea label="Allergies or intolerances" value={intake.allergies} onChange={(value) => setIntake({ ...intake, allergies: value })} />
                <TextArea label="Current medications or supplements" value={intake.medications} onChange={(value) => setIntake({ ...intake, medications: value })} />
                <TextArea label="Known conditions you want product guidance to respect" value={intake.knownConditions} onChange={(value) => setIntake({ ...intake, knownConditions: value })} />
                <TextArea label="Cycle or hormonal context, if relevant" value={intake.cycleContext} onChange={(value) => setIntake({ ...intake, cycleContext: value })} />
              </div>

              <label className="mt-5 flex gap-3 rounded-2xl bg-white/10 p-4 text-sm text-white/80">
                <input
                  required
                  type="checkbox"
                  checked={intake.consentHealthIntake}
                  onChange={(event) => setIntake({ ...intake, consentHealthIntake: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-white/30 text-gold focus:ring-gold"
                />
                <span>
                  I consent to Pramana AI storing this health-adjacent intake to personalize
                  future product validation. I understand this is not medical diagnosis.
                </span>
              </label>

              <button
                type="submit"
                disabled={intakeStatus === 'saving'}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 text-sm font-bold text-forest transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {intakeStatus === 'saving' ? 'Saving profile...' : 'Save Pramana profile'}
                <CheckCircle2 size={18} />
              </button>
            </form>
          )}

          {message && (
            <p
              className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
                authStatus === 'error' || intakeStatus === 'error'
                  ? 'bg-red-50 text-red-800'
                  : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-ink-muted">
            <Eye size={15} className="mt-0.5 shrink-0" />
            Pramana keeps this intake deliberately narrow for v1: no exact DOB, no address,
            no lab reports, no wearable imports, and no doctor records.
          </p>
        </motion.div>
      </section>
      </div>
    </main>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function PillGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              selected.includes(option)
                ? 'border-gold bg-gold text-forest'
                : 'border-white/15 bg-white/10 text-white/75 hover:border-gold/60'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <textarea
        rows={2}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/40"
        placeholder="Optional"
      />
    </label>
  )
}
