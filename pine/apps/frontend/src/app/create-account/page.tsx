'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/auth/supabase-client'

export default function CreateAccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="space-y-4 p-6 border rounded"
      >
        <h1 className="text-xl font-bold">Create Account</h1>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          required
          className="input w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Creating…' : 'Create Account'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="btn-secondary w-full"
        >
          Back to Login
        </button>
      </form>
    </div>
  )
}
