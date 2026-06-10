import {
  BadgeCheck,
  Barcode,
  Brain,
  Camera,
  Dumbbell,
  Leaf,
  LockKeyhole,
  MessageCircle,
  Microscope,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

export interface ScanProduct {
  id: string
  name: string
  category: string
  signal: 'flagged' | 'mixed' | 'clean'
  verdict: string
  summary: string
  image: string
  layers: {
    label: string
    value: string
    tone: 'danger' | 'warning' | 'success'
  }[]
  action: string
}

export const scanProducts: ScanProduct[] = [
  {
    id: 'glow-serum',
    name: 'Glow Serum 3000',
    category: 'Viral skincare',
    signal: 'flagged',
    verdict: 'Claim mismatch detected',
    summary:
      'The product promise sounds stronger than the visible ingredient proof. Pramana would ask for batch data, active concentration, and seller authenticity before recommending it.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    layers: [
      { label: 'Claim check', value: 'Retinol claim not backed', tone: 'danger' },
      { label: 'Skin fit', value: 'May irritate heat-prone skin', tone: 'warning' },
      { label: 'Trust score', value: 'Needs verification', tone: 'warning' },
    ],
    action: 'Ask for lab proof before you apply it nightly.',
  },
  {
    id: 'protein',
    name: 'Chocolate Mass Protein',
    category: 'Gym supplement',
    signal: 'mixed',
    verdict: 'Needs contamination review',
    summary:
      'Protein powders can look clean on macros while still needing independent safety checks. Pramana compares label claims, ingredients, and your skin or fitness context.',
    image:
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
    layers: [
      { label: 'Macro fit', value: 'Matches muscle gain goal', tone: 'success' },
      { label: 'Skin trigger', value: 'Dairy derivative watchlist', tone: 'warning' },
      { label: 'Safety proof', value: 'Lab data missing', tone: 'danger' },
    ],
    action: 'Use only if the batch has third-party testing.',
  },
  {
    id: 'hair-oil',
    name: 'Herbal Hair Growth Oil',
    category: 'Ayurveda-inspired care',
    signal: 'clean',
    verdict: 'Promising, still verify seller',
    summary:
      'Traditional ingredients can be useful, but Pramana separates heritage from hype. We check what is inside, where it came from, and whether the promise is realistic.',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
    layers: [
      { label: 'Ingredient clarity', value: 'Botanicals listed', tone: 'success' },
      { label: 'Body pattern', value: 'Dry scalp friendly', tone: 'success' },
      { label: 'Seller trust', value: 'Verify QR or batch', tone: 'warning' },
    ],
    action: 'Good candidate once seller authenticity is confirmed.',
  },
]

export const painCards = [
  {
    icon: ShieldAlert,
    title: 'Fake clean claims',
    text: 'Products say dermatologist-approved, toxin-free, ayurvedic, or clinically proven. Most shoppers never see the proof behind the label.',
  },
  {
    icon: MessageCircle,
    title: 'Paid recommendations',
    text: 'Your feed sells routines as self-care. Pramana treats every recommendation like evidence, not influence.',
  },
  {
    icon: Barcode,
    title: 'Too many disconnected apps',
    text: 'Your skin app does not know your supplement stack. Your gym app does not know your breakouts. Your body connects all of it.',
  },
]

export const capabilityCards: {
  icon: LucideIcon
  slug: string
  title: string
  text: string
  category: 'Beauty' | 'Fitness' | 'Nutrition' | 'Products' | 'Wellness' | 'Data'
}[] = [
  {
    icon: ScanLine,
    slug: 'product-scanner',
    title: 'Scan before you buy',
    text: 'Barcode, label, claim, and seller checks for beauty, supplements, hair care, and wellness products.',
    category: 'Products',
  },
  {
    icon: Camera,
    slug: 'skin-context',
    title: 'Skin context, not skin panic',
    text: 'Selfie and routine inputs become informational signals, with confidence levels and dermatologist-safe wording.',
    category: 'Beauty',
  },
  {
    icon: Dumbbell,
    slug: 'fitness-recovery',
    title: 'Gym, food, and skin together',
    text: 'Protein, sleep, stress, macros, and skin patterns are interpreted as one body system instead of separate dashboards.',
    category: 'Fitness',
  },
  {
    icon: Leaf,
    slug: 'indian-wellness',
    title: 'Subtle Indian wellness lens',
    text: 'Light prakriti-inspired patterns for heat, dryness, digestion, stress, and rhythm. Ayurveda as context, not overclaiming.',
    category: 'Wellness',
  },
  {
    icon: Microscope,
    slug: 'evidence-ai',
    title: 'Evidence-first AI',
    text: 'AI explains what verified data suggests. It does not invent safety claims from model memory.',
    category: 'Nutrition',
  },
  {
    icon: LockKeyhole,
    slug: 'private-data',
    title: 'Privacy-aware by design',
    text: 'Start with consent, minimal data, clear deletion paths, and no selling sensitive beauty or wellness profiles.',
    category: 'Data',
  },
]

export const moduleDetails = {
  'product-scanner': {
    eyebrow: 'Anti-fake scanner',
    headline: 'A product proof room before checkout.',
    summary:
      'Barcode, label, seller, ingredient, claim, and user-context checks converge into one verdict. Built for beauty, supplements, hair care, and wellness products.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Claim delta', 'Batch proof', 'Seller risk', 'Body fit'],
    steps: ['Scan product', 'Parse claims', 'Check sources', 'Return confidence'],
  },
  'skin-context': {
    eyebrow: 'Beauty intelligence',
    headline: 'Skin context without fear-based beauty panic.',
    summary:
      'Routine, sensitivity, breakouts, barrier signals, and product actives become a calmer validation layer for skin decisions.',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Sensitivity', 'Barrier load', 'Active overlap', 'Routine risk'],
    steps: ['Log skin context', 'Map actives', 'Flag overlap', 'Suggest safer next action'],
  },
  'fitness-recovery': {
    eyebrow: 'Performance context',
    headline: 'Protein, recovery, sleep, and skin finally talk.',
    summary:
      'Fitness goals are connected to sleep, stress, nutrition, supplement risk, and visible body signals instead of living in a separate app.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Recovery', 'Protein fit', 'Stress load', 'Sleep debt'],
    steps: ['Set goal', 'Connect routine', 'Scan supplement', 'Track pattern'],
  },
  'indian-wellness': {
    eyebrow: 'Subtle Ayurveda',
    headline: 'Indian wellness as context, not overclaim.',
    summary:
      'Pramana keeps modern safety as the base while letting heat, dryness, digestion, routine rhythm, and prakriti-inspired patterns enrich interpretation.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Heat', 'Dryness', 'Digestion', 'Rhythm'],
    steps: ['Capture preference', 'Map pattern', 'Respect evidence', 'Keep wording careful'],
  },
  'evidence-ai': {
    eyebrow: 'Scientific layer',
    headline: 'AI explains evidence. It does not invent proof.',
    summary:
      'Future scientific analysis will use retrieved sources, structured outputs, confidence, and non-diagnostic language instead of model-memory health claims.',
    image:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Source quality', 'Evidence strength', 'Uncertainty', 'Safety wording'],
    steps: ['Retrieve sources', 'Normalize evidence', 'Score confidence', 'Explain clearly'],
  },
  'private-data': {
    eyebrow: 'Consent-first data',
    headline: 'A private body graph that the user controls.',
    summary:
      'Minimal collection, explicit consent, server-side secrets, deletion/export paths, and no selling sensitive wellness profiles.',
    image:
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80',
    metrics: ['Consent', 'RLS', 'Audit trail', 'Data minimization'],
    steps: ['Ask clearly', 'Store minimally', 'Protect access', 'Let users delete'],
  },
} as const

export const proofSignals = [
  { label: 'Ingredient databases', value: 'API-ready', icon: Microscope },
  { label: 'Batch and seller proof', value: 'Planned', icon: BadgeCheck },
  { label: 'User scan history', value: 'Light backend', icon: Brain },
  { label: 'Verified alternatives', value: 'Coming next', icon: ShieldCheck },
]

export const imageTiles = [
  {
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    alt: 'Beauty products arranged on a vanity',
    label: 'Beauty',
    line: 'Validate serums, makeup, and skin routines before they touch your face.',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    alt: 'Workout and wellness routine',
    label: 'Fitness',
    line: 'Connect workouts, recovery, protein, and skin stress in one place.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80',
    alt: 'Fresh foods and nutrition ingredients',
    label: 'Nutrition',
    line: 'Food becomes fuel, mood, recovery, skin context, and gut signal.',
  },
  {
    src: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=80',
    alt: 'Wearable ring and body data',
    label: 'Wearables',
    line: 'Oura, Whoop, watches, and rings can raise insight confidence later.',
  },
  {
    src: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
    alt: 'Supplement powder and shaker',
    label: 'Supplements',
    line: 'A protein powder is macros, ingredients, seller proof, and body fit.',
  },
  {
    src: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
    alt: 'Natural hair and wellness oil',
    label: 'Wellness',
    line: 'Traditional ingredients still deserve modern validation and source proof.',
  },
]

export const evidenceCards = [
  {
    title: 'Viral serum claim',
    tag: 'Beauty',
    status: 'Needs proof',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Smart ring sleep dip',
    tag: 'Wearable',
    status: 'Recovery signal',
    image:
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Protein powder scan',
    tag: 'Supplement',
    status: 'Batch check',
    image:
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Gut-friendly meal',
    tag: 'Nutrition',
    status: 'Pattern input',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Skin flare log',
    tag: 'Skin',
    status: 'Timeline event',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Hair oil seller proof',
    tag: 'Wellness',
    status: 'Verify source',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
  },
]

export const doctorSummarySignals = [
  { label: 'Sleep average', value: '5.8h', detail: 'down 18% vs baseline' },
  { label: 'Recovery', value: 'low', detail: 'HRV trend needs context' },
  { label: 'Product scans', value: '3 flagged', detail: 'serum, protein, hair oil' },
  { label: 'Skin logs', value: '4 events', detail: 'clustered after low sleep' },
]

export const doctorTimeline = [
  'New active serum added to routine',
  'Two low-sleep nights recorded',
  'Dairy protein scanned for review',
  'Forehead flare logged by user',
]

export const waitlistGoals = [
  'Stop fake beauty products',
  'Verify supplements',
  'Understand skin triggers',
  'Connect fitness and wellness',
  'Early access for my clinic or brand',
]
