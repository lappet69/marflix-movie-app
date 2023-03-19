import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';


interface IAuth {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>;
  error: string | null
  loading: boolean
}
interface AuthProviderProps {
  children: React.ReactNode

}
const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => { },
  signUp: async () => { },
  logout: async () => { },
  error: null,
  loading: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // persisting the user
  useEffect(

    () => onAuthStateChanged(auth, (user) => {
      if (user) {
        // logged in
        setUser(user)
        setLoading(false)
      } else {
        // not logged in
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setInitialLoading(false)

    }),
    [auth]
  )


  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user)
      router.push('/')
      setLoading(false)
    }).catch((error) => { console.log(error.message) }).finally(() => setLoading(false))
  }
  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user)
      router.push('/')
      setLoading(false)
    }).catch((error) => { console.log(error.message) }).finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth).then(() => {
      setUser(null)
      // router.push('/login')
    }).catch((error) => { console.log(error) }).finally(() => { setLoading(false) })
  }

  const memoValue = useMemo(() => ({
    user, signIn, signUp, logout, loading, error
  }),
    [user, loading])
  return (
    <AuthContext.Provider value={memoValue}>
      {!initialLoading && children}
      {/* {children} */}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}