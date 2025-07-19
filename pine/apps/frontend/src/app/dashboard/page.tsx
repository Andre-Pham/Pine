'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthUser } from '@/auth/use-auth-user'
import { supabase } from '@/auth/supabase-client'

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthUser()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (user === null) {
    return <p className="p-6">Loading…</p>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button
        onClick={() => router.push('/login')}
        className="btn-secondary"
      >
        Go to Login
      </button>
      <button
        onClick={handleLogout}
        className="btn-primary"
      >
        Logout
      </button>
    </div>
  )
}
