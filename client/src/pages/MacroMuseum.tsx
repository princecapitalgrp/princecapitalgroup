/**
 * Macro Museum Page
 * Dynamic content pulled from Supabase
 * Displays macro analysis posts, case studies, and frameworks
 */

import { useState, useEffect, useRef } from 'react'
import { usePosts } from '@/hooks/useSupabase'
import { useSEO } from '@/hooks/useSEO'
import { Loader2, Filter, Calendar, User, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EmailCaptureForm from '@/components/EmailCaptureForm'

type Category = 'analysis' | 'case_study' | 'framework' | 'macro_view' | 'all'

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Posts' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'case_study', label: 'Case Studies' },
  { value: 'framework', label: 'Frameworks' },
  { value: 'macro_view', label: 'Macro Views' },
]

export default function MacroMuseum() {
  useSEO({
    title: 'Macro Museum | Prince Capital Group',
    description: 'Macro analysis, case studies, and trading frameworks from PCG research.',
    canonical: 'https://princecapitalgroup.com/macro-museum',
  })

  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const { posts, loading, error } = usePosts(
    selectedCategory === 'all' ? undefined : selectedCategory,
    20
  )

  // Fade-up animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    if (pageRef.current) {
      pageRef.current.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [posts])

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ background: 'oklch(0.22 0.04 243)' }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-mono text-accent tracking-wider">
              RESEARCH ARCHIVE
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              Macro Museum
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              A curated collection of macro analysis, case studies, and trading frameworks from
              PCG research. Explore how we think about market structure, cross-pair relationships,
              and macro context.
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section className="border-b border-border py-8 md:py-10">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent">FILTER BY CATEGORY</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-accent" />
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded p-6 text-red-800">
              <p className="font-medium">Error loading posts</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No posts found in this category.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <div
                  key={post.id}
                  className="fade-up opacity-0"
                  style={{
                    transitionDelay: `${idx * 50}ms`,
                  }}
                >
                  <div
                    className="border border-border rounded p-6 md:p-8 cursor-pointer transition-all hover:border-accent/50 hover:shadow-sm"
                    onClick={() =>
                      setExpandedPostId(expandedPostId === post.id ? null : post.id)
                    }
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded">
                            {post.category.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded Content */}
                    {expandedPostId === post.id && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                          Last updated:{' '}
                          {new Date(post.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    )}

                    {/* Expand Indicator */}
                    <div className="mt-4 text-xs text-accent font-mono">
                      {expandedPostId === post.id ? '▼ Click to collapse' : '▶ Click to expand'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className="border-t border-border py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Get Access to Exclusive Research
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Join our community to receive weekly process memos, new macro museum posts, and
              updates on PCG research.
            </p>
          </div>
          <EmailCaptureForm
            title="Subscribe to Updates"
            subtitle="Weekly memos + exclusive research access"
            interest="macro_museum"
          />
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <p className="text-xs text-muted-foreground text-center">
            All content is educational in nature. Nothing herein constitutes investment advice,
            trading signals, or recommendations.
          </p>
        </div>
      </section>

      {/* Fade-up animation styles */}
      <style>{`
        .fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
        .fade-up.visible {
          opacity: 1;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
