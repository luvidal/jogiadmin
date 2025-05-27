import { useTheme } from '@/context/theme'
import Icon from '@/components/icon'

interface Props {
    className?: string;
}

const None = ({ className = '' }:Props) => {
    const { color } = useTheme()
    return (
        <div className={`flex w-full h-full min-h-24 justify-center items-center ${ className }`}>
            <span className={`text-sm text-gray-400`}>Sin resultados</span>
        </div>
    )
}

export default None;