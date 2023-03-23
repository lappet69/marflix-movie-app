import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Barlow_Semi_Condensed } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from 'recoil';

const barlow = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: '400'
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <div className={`${barlow.className}`}>
          <Component {...pageProps} />
          <ToastContainer />
        </div>
      </AuthProvider>
    </RecoilRoot>
  )
}
