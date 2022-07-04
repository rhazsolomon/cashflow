import { FiLock, FiMail, FiMessageSquare, FiUser } from "react-icons/fi"
import HStack from "../HStack"



const Input = ({ value, setValue, type }) => {
    switch (type) {
        case 'text':
            return (
            <HStack className="px-6 gap-3 py-2 w-full bg-background-2 rounded-full border-background-3   border-[1px] text-foreground-1">
                <FiUser className="text-foreground-2"/>
                <input
                    className="bg-transparent placeholder:text-foreground-2"
                    placeholder="Full Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}>
                </input>
            </HStack>
        )
        case 'email':
            return (
                <HStack className="px-6 gap-3 py-2 w-full bg-background-2 rounded-full border-background-3   border-[1px] text-foreground-1">
                    <FiMail className="text-foreground-2"/>
                    <input
                        className="bg-transparent placeholder:text-foreground-2"
                        placeholder="email"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}>
                    </input>
                </HStack>
            )
        case 'password':
            return (
                <HStack className="px-6 py-2 w-full bg-background-2 rounded-full border-background-3 border-[1px] gap-3 text-foreground-1" >
                    
                    <FiLock className="text-foreground-2"/>
                    <input
                        className="bg-transparent focus:border-debug  placeholder:text-foreground-2"
                        type="password"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        placeholder="password"
                    />
                </HStack>
            )
        default:
            return (
                <div>Not recognised type</div>
            )
    }
}

export default Input;