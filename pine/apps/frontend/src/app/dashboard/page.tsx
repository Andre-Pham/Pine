'use client'

import { useRouter } from 'next/navigation'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'

export default function DashboardPage() {
  const router         = useRouter()
  const supabase       = useSupabaseClient()
  const session        = useSession()

  // (session is guaranteed by layout, but you can still inspect it)
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  )
}
