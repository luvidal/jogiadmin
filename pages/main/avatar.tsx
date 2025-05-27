import { useState, useEffect } from 'react';
import Icon from '@/components/icon';
import Image from 'next/image';

interface Props {
  size?: number;
  onClick:() => void;
  className: string;
}

const Avatar = ({ size = 50, onClick, className }: Props) => {
  const [picture, setPicture] = useState<string>('');

  useEffect(() => {
    const picture = JSON.parse(localStorage.getItem('user') || '{}').picture || '';
    setPicture(picture);
  }, []);

  const Emptyuser = () =>
    <div className='rounded-full bg-white flex items-center justify-center' style={{ width: size, height: size }}>
      <Icon name='User' size={24} className='text800' />
    </div>

  return (
    <div className={ className } onClick={ onClick }>
      { 
        picture ?
          <Image src={ picture } alt='user' width={ size } height={ size } className='rounded-full' /> 
        : 
          <Emptyuser/>
      }
    </div>
  )
}

export default Avatar;