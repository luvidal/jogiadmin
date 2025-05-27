import { GoogleLogin } from '@react-oauth/google';
import { useAccess } from '@/context/access';
import { post } from '@/utils/api';

const GoogleButton = () => {
    const { setAccess } = useAccess();
    
    const gSignIn = async (credential: any) => {
        const data = await post(`users/login`, credential);
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          setAccess(true);
        } else {
          alert('Acceso denegado.');
        }
    }
  
    return (
        <div className='flex items-center justify-center bg-white w-[200px] h-[40px] rounded'>
            <GoogleLogin onSuccess={ gSignIn } />
        </div>
    );
};

export default GoogleButton;