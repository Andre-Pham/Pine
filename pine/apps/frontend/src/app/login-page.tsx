"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/auth/supabase-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Attempt sign-in with Supabase
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Redirect to dashboard on success
      router.push("/dashboard");
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // After sign-up, auto-log in or prompt verification as per Supabase settings
      // For simplicity, assume email sign-up doesn't require additional verification:
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) {
        setError(loginError.message);
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4 p-6 border rounded">
        <h1 className="text-xl font-bold">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <input 
            type="email" placeholder="Email" required 
            className="input" // assume Tailwind styles or shadcn input
            value={email} onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="password" placeholder="Password" required 
            className="input"
            value={password} onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button 
          type="submit" disabled={loading} 
          className="btn-primary w-full">
          {loading ? "Logging in..." : "Login"}
        </button>
        <button 
          type="button" disabled={loading}
          className="btn-secondary w-full"
          onClick={handleSignUp}>
          {loading ? "Please wait..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
