import HStack from "./HStack"
import VStack from "./VStack"
import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaTrash, FaLock } from "react-icons/fa";
import BounceButton from "./BounceButton";
import { useEffect, useState } from "react";


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
        <div className="w-full" onClick={() => setEditing(true)}>
            {editing ? (
                <input
                autoFocus
                type={"text"}
                className={"px-3 py-1 border-[#393B3D] bg-[#222222] border-[1px] rounded-md w-full"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                />
            ) : (
                <BounceButton>
                <HStack className='gap-2 w-full flex-wrap text-xs'>
                    
                        {tags.map(t => (
                            <HStack className=" bg-[#7A7C7F] py-1 px-3 rounded-full gap-2 border-slate-500 shadow-sm border-[2px]" key={t}>
                                <FaTag style={{ fill: 'border-gray-500' }} />
                                {t}
                            </HStack>
                        ))}
                        {tags.length == 0 && (
                            <HStack 
                                // className="border-[#7A7C7F] text-[#7A7C7F] border-[1px] py-1 px-4 rounded-full gap-2"
                                className="text-[#7A7C7F] rounded-full gap-2"
                            >
                                <FaTag style={{ fill: 'border-gray-500' }} />
                                Add Tag
                            </HStack>
                        )}
                  
                </HStack>
                </BounceButton>
                
            )}
        </div>
    )
}