/**
 * Supabase Client Setup
 * Client-side only for Vite + React
 * Uses VITE_ prefixed environment variables
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Check .env.local for VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Type definitions for database tables
 */

export interface User {
  id: string
  email: string
  full_name?: string
  subscription_tier?: 'free' | 'member' | 'premium'
  created_at: string
}

export interface MacroMuseumPost {
  id: string
  title: string
  content: string
  category: 'analysis' | 'case_study' | 'framework' | 'macro_view'
  tags: string[]
  featured_image_url?: string
  author: string
  published_at: string
  created_at: string
  updated_at: string
}

export interface WeeklyMemo {
  id: string
  title: string
  content: string
  adherence_score: number
  week_of: string
  created_at: string
  updated_at: string
}

export interface EmailCapture {
  id: string
  email: string
  name?: string
  interest?: string
  created_at: string
}
