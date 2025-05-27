import '@/styles/globals.css'

import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from '@/utils/msal'

import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AccessProvider } from '@/context/access'
import { RoleProvider } from '@/context/role'

const clientId = '316266557218-ijljdla4qmo5nr2basfn1rh1dgd5q9t3.apps.googleusercontent.com'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <MsalProvider instance={msalInstance}>
        <AccessProvider>
          <RoleProvider>
            <Component {...pageProps} />
          </RoleProvider>
        </AccessProvider>
      </MsalProvider>
    </GoogleOAuthProvider>
  )
}

export default App
