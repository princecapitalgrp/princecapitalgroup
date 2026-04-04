/**
 * Custom React Hooks for Supabase
 * Client-side data fetching with error handling and loading states
 */

import { useEffect, useState } from 'react'
import { supabase, MacroMuseumPost, WeeklyMemo, EmailCapture } from '@/lib/supabase'

/**
 * usePosts - Fetch Macro Museum posts from Supabase
 * @param category - Optional: filter by category
 * @param limit - Optional: limit number of posts (default: 10)
 */
export function usePosts(category?: string, limit: number = 10) {
  const [posts, setPosts] = useState<MacroMuseumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('macro_museum_posts')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(limit)

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
          throw new Error(fetchError.message)
        }

        setPosts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [category, limit])

  return { posts, loading, error }
}

/**
 * useMemos - Fetch weekly memos from Supabase
 * @param limit - Optional: limit number of memos (default: 10)
 */
export function useMemos(limit: number = 10) {
  const [memos, setMemos] = useState<WeeklyMemo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('weekly_memos')
          .select('*')
          .order('week_of', { ascending: false })
          .limit(limit)

        if (fetchError) {
          throw new Error(fetchError.message)
        }

        setMemos(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch memos')
        console.error('Error fetching memos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMemos()
  }, [limit])

  return { memos, loading, error }
}

/**
 * useSaveEmail - Save email to Supabase
 */
export function useSaveEmail() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const saveEmail = async (email: string, name?: string, interest?: string) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const { error: insertError } = await supabase
        .from('email_captures')
        .insert([
          {
            email,
            name: name || null,
            interest: interest || null,
          }
        ])

      if (insertError) {
        throw new Error(insertError.message)
      }

      setSuccess(true)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save email'
      setError(errorMsg)
      console.error('Error saving email:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { saveEmail, loading, error, success }
}

/**
 * useRealTimePosts - Subscribe to real-time updates for posts
 * Automatically updates when new posts are added to Supabase
 */
export function useRealTimePosts() {
  const [posts, setPosts] = useState<MacroMuseumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('macro_museum_posts')
          .select('*')
          .order('published_at', { ascending: false })

        if (fetchError) throw new Error(fetchError.message)
        setPosts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchInitialPosts()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('macro_museum_posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'macro_museum_posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts((prev) => [payload.new as MacroMuseumPost, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setPosts((prev) =>
              prev.map((p) => (p.id === payload.new.id ? (payload.new as MacroMuseumPost) : p))
            )
          } else if (payload.eventType === 'DELETE') {
            setPosts((prev) => prev.filter((p) => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { posts, loading, error }
}
