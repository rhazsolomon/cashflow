
import sapiens from '../static/sapiens.png'
import HStack from './HStack';

const FriendlyGraphic = ({className}) => {
    return (
        <HStack className={`items-center justify-center ${className}`}>
            <img 
                className='max-w-sm'
                src={sapiens}
            />
        </HStack>
        
    )
}

export default FriendlyGraphic;