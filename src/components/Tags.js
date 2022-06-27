import HStack from "./HStack"
import VStack from "./VStack"
import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaTrash, FaLock } from "react-icons/fa";
import BounceButton from "./BounceButton";
import { useEffect, useState } from "react";

const Tag = ({tag}) => {
    const tagColor = 'tag-1'
    const colourClasses = `bg-${tagColor} border-${tagColor}-highlight`
    
    return (
            <HStack 
                className={`${colourClasses} py-1 px-3 rounded-full gap-2  border-[1px]`} 
                key={tag}
            >
                <FaTag 
                    className={`text-${tagColor}-highlight`}
                />
                {tag}
            </HStack>

    )
}
export const Tags = ({tags, onEnter}) => {

    let initialText = ""
    for (let tag of tags) {
        initialText += "#" + tag + " "
    }
    const [value, setValue] = useState(initialText)
    
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        let initialText = ""
        for (let tag of tags) {
            initialText += "#" + tag + " "
        }
        setValue(initialText)   
    }, [tags])
    function onKeyDown(e) {
        if (e.key == 'Enter') {
            const tags = value.split(' ').filter(a => a.startsWith('#')).map(a => a.slice(1))
            setEditing(false)
            onEnter(tags)
        }
    }
    return (
        <div className="w-full">
            {editing ? (
                <input
                autoFocus
                type={"text"}
                className={"px-3 py-1 border-background-3 bg-background-4 border-[1px] rounded-md w-full"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                />
            ) : (
                <BounceButton
                    onClick={() => setEditing(true)}
                >
                    <HStack className='gap-2 w-full flex-wrap text-xs'>
                        
                            {tags.map(t => (<Tag tag={t} key={t}/>))}
                            {tags.length == 0 && (
                                <HStack 
                                    className="text-foreground-1 rounded-full gap-2"
                                >
                                    <FaTag 
                                        className="text-foreground-1"
                                    />
                                    Add Tag
                                </HStack>
                            )}
                    
                    </HStack>
                </BounceButton>
                
            )}
        </div>
    )
}