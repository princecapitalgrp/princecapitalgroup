/**
 * Email Capture Form Component
 * Collects email and stores in Supabase
 */

import { useState } from 'react'
import { useSaveEmail } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface EmailCaptureFormProps {
  title?: string
  subtitle?: string
  placeholder?: string
  interest?: string
  onSuccess?: () => void
}

export default function EmailCaptureForm({
  title = 'Stay Updated',
  subtitle = 'Get access to exclusive research and weekly process memos.',
  placeholder = 'your@email.com',
  interest,
  onSuccess,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const { saveEmail, loading, error, success } = useSaveEmail()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      return
    }

    const result = await saveEmail(email, name || undefined, interest)

    if (result) {
      setEmail('')
      setName('')
      onSuccess?.()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="bg-background border-border"
          />
        </div>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="bg-background border-border"
          />
          <Button
            type="submit"
            disabled={loading || !email.trim()}
            className="whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </span>
            )}
          </Button>
        </div>

        {success && (
          <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Success!</p>
              <p>Check your email for updates.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
