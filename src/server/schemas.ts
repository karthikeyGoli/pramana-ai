import { z } from 'zod'

const sourceSchema = z.string().trim().max(80).optional().default('pramana-ai-web')

export const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  goal: z.string().trim().min(1).max(160),
  productConcern: z.string().trim().max(1_000).optional().default(''),
  consentPrivacy: z.literal(true),
  consentMarketing: z.boolean().optional().default(false),
  privacyPolicyVersion: z.string().trim().max(40).optional().default('2026-06-09'),
  source: sourceSchema,
})

export const productConcernSchema = z.object({
  productName: z.string().trim().min(1).max(180),
  category: z.string().trim().max(80).optional().default('unknown'),
  concern: z.string().trim().max(1_000).optional().default(''),
  source: sourceSchema,
})

export const productScanSchema = z.object({
  productName: z.string().trim().min(1).max(180),
  brand: z.string().trim().max(140).optional().default(''),
  category: z.string().trim().max(80).optional().default('unknown'),
  barcode: z.string().trim().max(80).optional().default(''),
  ingredientsText: z.string().trim().max(5_000).optional().default(''),
  imageMetadata: z.record(z.string(), z.unknown()).optional().default({}),
  scanResult: z.record(z.string(), z.unknown()).optional().default({}),
  confidence: z.number().min(0).max(1).optional().default(0),
  sources: z.array(z.string().trim().max(300)).max(20).optional().default([]),
  source: sourceSchema,
})

export const healthIntakeSchema = z.object({
  displayName: z.string().trim().min(2).max(100),
  ageRange: z.enum(['18-24', '25-34', '35-44', '45-54', '55+']),
  sexContext: z.enum(['female', 'male', 'intersex', 'prefer-not-to-say']),
  primaryGoals: z.array(z.string().trim().min(1).max(80)).min(1).max(5),
  priorityAreas: z.array(z.string().trim().min(1).max(80)).min(1).max(6),
  skinContext: z.array(z.string().trim().min(1).max(80)).max(6).optional().default([]),
  hairContext: z.array(z.string().trim().min(1).max(80)).max(6).optional().default([]),
  nutritionPattern: z.string().trim().min(1).max(120),
  activityLevel: z.enum(['low', 'moderate', 'active', 'athlete']),
  sleepQuality: z.enum(['poor', 'mixed', 'good', 'excellent']),
  stressLevel: z.enum(['low', 'moderate', 'high', 'very-high']),
  allergies: z.string().trim().max(500).optional().default(''),
  medications: z.string().trim().max(500).optional().default(''),
  knownConditions: z.string().trim().max(700).optional().default(''),
  cycleContext: z.string().trim().max(180).optional().default(''),
  ayurvedaInterest: z.enum(['subtle', 'balanced', 'strong']),
  consentHealthIntake: z.literal(true),
  consentVersion: z.string().trim().max(40).optional().default('2026-06-09'),
})

export function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}
