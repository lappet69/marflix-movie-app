import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';
// import 'flowbite/dist/flowbite.min.css';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
