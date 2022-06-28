import { FiLock, FiUser } from "react-icons/fi"
import HStack from "./HStack"

export const PasswordInput = ({ setValue }) => {
    return (
        <HStack className="px-6 py-2 w-full bg-background-2 dark:bg-d-background-2 rounded-full  text-rhaz-major-grey gap-3 border-[1px] border-background-3 dark:border-d-background-3 text-foreground-2 dark:text-foreground-2" >
            <FiLock />
            <input
                className="bg-transparent focus:border-debug text-foreground-1  placeholder:text-foreground-2 dark:text-foreground-2 w-full"
                type="password"
                onChange={(e) => setValue(e.target.value)}
                placeholder="password"
            />
        </HStack>
    )
}

export const EmailInput = ({ setValue }) => {
    return (
        <HStack className="px-6 gap-3 py-2 w-full bg-background-2 dark:bg-d-background-2 rounded-full text-foreground-2 dark:text-foreground-2 border-[1px] border-background-3 dark:border-d-background-3">
            <FiUser />
            <input
                className="bg-transparent text-foreground-1 placeholder:text-foreground-2 dark:text-foreground-2 w-full"
                placeholder="email"
                onChange={(e) => setValue(e.target.value)}>
            </input>
        </HStack>

    )
}
