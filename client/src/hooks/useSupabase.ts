import { useEffect, useState } from 'react'
import { supabase, MacroMuseumPost, WeeklyMemo, TradeBreakdown } from '@/lib/supabase'

export function usePosts(category?: string, limit: number = 10) {
  const [posts, setPosts] = useState<MacroMuseumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!supabase) {
          setLoading(false)
          return
        }

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

export function useMemos(limit: number = 10) {
  const [memos, setMemos] = useState<WeeklyMemo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!supabase) {
          setLoading(false)
          return
        }

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

export function useSaveEmail() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const saveEmail = async (email: string, source: string = 'direct') => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      if (!supabase) {
        setError('Waitlist capture is unavailable. Supabase is not configured.')
        return false
      }

      const normalizedEmail = email.trim().toLowerCase()

      const { error: insertError } = await supabase.from('waitlist').insert([
        { email: normalizedEmail, source },
      ])

      if (insertError) {
        console.error('[PCG] Waitlist insert error:', insertError)

        if (insertError.code === '23505') {
          setError("You're already on the list")
          return false
        }

        if (insertError.code === '42501') {
          setError('Waitlist temporarily unavailable')
          return false
        }

        setError('Something went wrong. Please try again.')
        return false
      }

      setSuccess(true)
      console.info('[PCG] Waitlist signup stored.')
      return true
    } catch (err) {
      console.error('[PCG] useSaveEmail unexpected error:', err)
      setError('Something went wrong. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { saveEmail, loading, error, success }
}

export function useTradeBreakdowns(limit: number = 20) {
  const [breakdowns, setBreakdowns] = useState<TradeBreakdown[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBreakdowns = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!supabase) {
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('trade_breakdowns')
          .select('*')
          .order('date', { ascending: false })
          .limit(limit)

        if (fetchError) {
          throw new Error(fetchError.message)
        }

        setBreakdowns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trade breakdowns')
        console.error('Error fetching trade breakdowns:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBreakdowns()
  }, [limit])

  return { breakdowns, loading, error }
}

export function useRealTimePosts() {
  const [posts, setPosts] = useState<MacroMuseumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchInitialPosts = async () => {
      try {
        const { data, error: fetchError } = await supabase!
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
