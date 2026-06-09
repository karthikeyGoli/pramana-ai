import {
  Apple,
  Brain,
  Dumbbell,
  Heart,
  Leaf,
  Moon,
  Scissors,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export interface BodySystem {
  id: string
  name: string
  shortName: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  connections: string[]
  score: number
  insight: string
}

export const bodySystems: BodySystem[] = [
  {
    id: 'fitness',
    name: 'Movement & Strength',
    shortName: 'Fitness',
    description: 'Training load, recovery, and routine signals that may affect skin and energy',
    icon: Dumbbell,
    color: '#173C2B',
    bgColor: '#E8F5EE',
    connections: ['nutrition', 'sleep', 'skin', 'mental'],
    score: 78,
    insight: 'Recovery, protein choice, and sleep should be checked together before changing your routine.',
  },
  {
    id: 'nutrition',
    name: 'Nutrition & Digestion',
    shortName: 'Nutrition',
    description: 'Food patterns, digestion, hydration, and supplement context',
    icon: Apple,
    color: '#2E7D52',
    bgColor: '#E8F5EE',
    connections: ['fitness', 'skin', 'hair', 'mental', 'ayurveda'],
    score: 65,
    insight: 'Pramana would compare diet, digestion, and ingredient proof before recommending a supplement.',
  },
  {
    id: 'skin',
    name: 'Skin & Dermatology',
    shortName: 'Skin',
    description: 'Skin concerns interpreted with routine, product, stress, and nutrition context',
    icon: Sparkles,
    color: '#B85C38',
    bgColor: '#F7E4DA',
    connections: ['nutrition', 'mental', 'beauty', 'sleep', 'ayurveda'],
    score: 72,
    insight: 'A breakout pattern may need product, sleep, stress, and diet context before blaming one serum.',
  },
  {
    id: 'hair',
    name: 'Hair & Scalp',
    shortName: 'Hair',
    description: 'Hair routines, scalp comfort, nutrition, and product authenticity signals',
    icon: Scissors,
    color: '#8B6F24',
    bgColor: '#F7E8B5',
    connections: ['nutrition', 'beauty', 'mental', 'ayurveda'],
    score: 58,
    insight: 'Hair-growth claims should be validated against ingredients, seller proof, and realistic timelines.',
  },
  {
    id: 'beauty',
    name: 'Beauty & Products',
    shortName: 'Beauty',
    description: 'Cosmetics and routines checked for claims, ingredients, and skin fit',
    icon: ShieldCheck,
    color: '#173C2B',
    bgColor: '#E8F5EE',
    connections: ['skin', 'hair'],
    score: 84,
    insight: 'A verified routine should show ingredient clarity, batch trust, and a reason it fits you.',
  },
  {
    id: 'mental',
    name: 'Mind & Stress',
    shortName: 'Mind',
    description: 'Stress and sleep rhythm as context for cravings, skin, and recovery',
    icon: Brain,
    color: '#5F665B',
    bgColor: '#F8F2E8',
    connections: ['skin', 'sleep', 'nutrition', 'fitness'],
    score: 61,
    insight: 'Stress context can explain patterns, but Pramana should avoid turning correlation into diagnosis.',
  },
  {
    id: 'sleep',
    name: 'Sleep & Recovery',
    shortName: 'Sleep',
    description: 'Recovery foundation for skin repair, appetite, mood, and gym adaptation',
    icon: Moon,
    color: '#173C2B',
    bgColor: '#E8F5EE',
    connections: ['fitness', 'skin', 'mental'],
    score: 70,
    insight: 'Sleep data can make product advice more personal once wearable integrations are connected.',
  },
  {
    id: 'ayurveda',
    name: 'Indian Wellness Lens',
    shortName: 'Wellness',
    description: 'A subtle prakriti-inspired layer for heat, dryness, digestion, and rhythm',
    icon: Leaf,
    color: '#2E7D52',
    bgColor: '#E8F5EE',
    connections: ['nutrition', 'skin', 'hair', 'mental'],
    score: 74,
    insight: 'Ayurveda stays a contextual lens for lifestyle patterns, not a replacement for medical care.',
  },
  {
    id: 'heart',
    name: 'Vitality & Heart',
    shortName: 'Vitality',
    description: 'Energy, recovery, and cardiovascular context for overall body intelligence',
    icon: Heart,
    color: '#B85C38',
    bgColor: '#F7E4DA',
    connections: ['fitness', 'nutrition', 'sleep', 'mental'],
    score: 75,
    insight: 'Vitality signals can support weekly insight reports after health data permissions are added.',
  },
]

export const scamStats = [
  { label: 'Blind recommendations', value: 'No', source: 'Pramana principle' },
  { label: 'Paid hype first', value: 'Never', source: 'Brand promise' },
  { label: 'Proof layers', value: '3', source: 'Claim + proof + body fit' },
]

export const unifiedBenefits = [
  {
    title: 'See the connections',
    description:
      'Your skin, food, stress, and products may be connected. Pramana maps the context before suggesting action.',
  },
  {
    title: 'Verify before you buy',
    description:
      'Scan products, inspect claims, and store concerns while the backend grows toward real data integrations.',
  },
  {
    title: 'One truth, not ten apps',
    description:
      'Beauty, supplements, gym, hair, wellness, and safety belong in one trust layer.',
  },
  {
    title: 'Indian wellness, lightly',
    description:
      'Prakriti-inspired context can help personalize lifestyle insights later without overclaiming today.',
  },
]
