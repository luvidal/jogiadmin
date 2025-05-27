import { useMsal } from '@azure/msal-react';
import { useAccess } from '@/context/access';
import Anchor from '@/components/anchor';
import Image from 'next/image';
import { post } from '@/utils/api';

const MicrosoftButton = () => {
  const { setAccess } = useAccess()
  const { instance } = useMsal()

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ['openid', 'profile', 'email'],
      });
      
      const { idToken:credential } = loginResponse;
      const data = await post(`users/login`, { credential });

      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        setAccess(true);
      } else {
        alert('Ocurrió un error en el proceso de autentificación');
      }
        } catch (error: any) {
          const message = error?.message || ''
          const name = error?.name || ''

          const isUserCancel =
            name === 'BrowserAuthError' && message.includes('user_cancelled') ||
            name === 'InteractionRequiredAuthError' && message.includes('interaction_in_progress') ||
            message.includes('popup') || message.includes('access_denied')

          if (isUserCancel) {
            console.warn('Login popup was closed or canceled by the user')
            return
          }

          console.error('Unexpected error during Microsoft login:', error)
          alert('Ocurrió un error en el proceso de autentificación')
        }
  }

  return (
    <Anchor
      className='flex items-center justify-between bg-white text-gray-600 w-[200px] h-[40px] text-[13px] justify-between mt-2 p-3 border-none rounded'
      onClick={handleLogin}
    >
      Sign in with Microsoft
      <Image src='/microsoft_logo.svg' alt='Microsoft Logo' width={16} height={16} />
    </Anchor>
  );
};

export default MicrosoftButton;
