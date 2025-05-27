import Image from 'next/image';
import GoogleButton from './googlebutton';
import MicrosoftButton from './microsoftbutton';

const LeftPanel = () => {
    return (
        <div className='flex flex-col h-full items-center justify-between'>
            <div className='flex flex-col items-center justify-center flex-grow'>
                <div className='flex items-center justify-center gap-2'>
                    <Image src='/logo.png' width={50}  height={50} alt='logo' />
                    <Image src='/jogi.png' width={138} height={72} alt='name' />
                </div>
                <div className='text-white text-center mt-3'>
                    <h1 className='text-2xl font-bold'>Administración</h1>
                </div>
                <div className='mt-20 space-y-4'>
                    <GoogleButton />
                    <MicrosoftButton />
                </div>
            </div>
            <p className='text-white text-sm mb-5'>&copy; 2025 Jogi</p>
        </div>
    );
};

export default LeftPanel;