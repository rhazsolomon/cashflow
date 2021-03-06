import { useEffect, useState } from "react";
import { PieChart as Pie } from "react-minimal-pie-chart";

import { computePieDataFromTransactionTags, getAllTags } from "../backend/backend";
import HStack from "./HStack";
import VStack from "./VStack";

const PieChartValue = ({ data, d, className }) => {
    const total = data.reduce((a, b) => a + b.value, 0)
    return (
        <div className={`flex flex-col h-full justify-center items-center content-center ${className}`}>
            {d && (
                <div
                    className="text-2xl font-medium"
                    style={{ transition: 'color 0s', color: d.color }}
                >
                    {Number.parseFloat(d.value).toFixed(2)}
                </div>
            )}
            <div
                className={`${d ? 'opacity-30 text-l' : 'text-2xl font-medium'}`}
                style={{ transition: '1s' }}
            >
                {Number.parseFloat(total).toFixed(2)}
            </div>
        </div>
    )
}


const PieChartLegend = ({ tagColorMap, setTagColorMap }) => {
    const LegendRow = ({ tag, color }) => {
        return (
            <HStack className='gap-2'>
                <input
                    type={"color"}
                    value={color}
                    onChange={e => setTagColorMap({ ...tagColorMap, [tag]: e.target.value })
                    } />
                {tag}
            </HStack>
        )
    }
    return (
        <HStack className='gap-2 w-1/2 items-center  flex-wrap'>
            {Object.entries(tagColorMap).map((a) => (<LegendRow tag={a[0]} color={a[1]} />))}
        </HStack>
    )
}

const TransactionsPieChart = ({ transactions, selectedCategoryId, setSelectedCategoryId }) => {
    if (transactions.length == 0) {
        return (
            <div className="textbackground-2 text-center w-full">
                Nothing here
            </div>
        )
    }
    function generateTagColorMap(tags) {
        // TODO rework this bit
        const defaultColors = [
            "#033f63",
            "#28666e",
            "#7c9885",
            "#b5b682",
            "#fedc97"
        ]
        const initialTagColorMap = {}
        for (let i in tags) {
            initialTagColorMap[tags[i]] = defaultColors[i % defaultColors.length]
        }
        return initialTagColorMap
    }
    const allTags = getAllTags(transactions)

    const [tagColorMap, setTagColorMap] = useState(generateTagColorMap(allTags))

    useEffect(() => {
        const allTags = getAllTags(transactions)
        setTagColorMap(generateTagColorMap(allTags))
    }, [transactions])

    const data = computePieDataFromTransactionTags(transactions)

    const computeSegmentsShift = (i) => {
        if (data[i].name === selectedCategoryId) { return 4 }
        return 0
    }
    const toggleSelectedIndex = (i) => {
        if (data[i].name === selectedCategoryId) {
            setSelectedCategoryId(null)
        } else {
            setSelectedCategoryId(data[i].name)
        }

    }
    const computeSegmentsStyle = (i) => {
        const friendlyTransition = 'd 0.4s cubic-bezier(.32,.34,.4,3.45)'
        const assertiveTransition = 'd 0.2s ease-in-out, opacity 0.2s'
        let opacity = '100%'
        if (selectedCategoryId !== null) {
            opacity = data[i].name === selectedCategoryId ? '100%' : '20%'
        }

        return {
            transition: selectedCategoryId === data[i].name ? friendlyTransition : assertiveTransition,
            stroke: tagColorMap[data[i].name],
            opacity: opacity,
        }
    }

    return (
        <VStack className='w-full h-full items-center justify-center'>
            <HStack className='w-full justify-center '>
                <div className="relative h-[400px] w-[400px] ">
                    <div className=" w-full h-full absolute">
                        <Pie
                            key={'234'}
                            data={data}
                            lineWidth={40}
                            onClick={(e, i) => { toggleSelectedIndex(i) }}
                            segmentsShift={computeSegmentsShift}
                            rounded={false}
                            radius={40}
                            segmentsStyle={computeSegmentsStyle}
                            className={''}
                            onMouseOver={(e) => { e.target.style.opacity = '90%' }}
                            onMouseOut={(e) => { e.target.style.opacity = '100%' }}
                            label={() => { }}
                            labelPosition={50}
                            labelStyle={{}}
                        />
                    </div>
                    <PieChartValue
                        className={"bg-primary"}
                        data={data} 
                        d={data.filter(d => d.name === selectedCategoryId)[0]} 
                    />
                    
                </div>
            </HStack>
            <PieChartLegend tagColorMap={tagColorMap} setTagColorMap={setTagColorMap} />
            
        </VStack>


    )
}

export default TransactionsPieChart;

export const LuminousPieChart = ({ transactions }) => {
    const data = computePieDataFromTransactionTags(transactions)


   

    return (
        
                <Pie
                    key={'234'}
                    data={[{'name': 'hello', 'value': 34}]}
                    lineWidth={40}
                    segmentsShift={0}
                    rounded={false}
                    radius={40}
                    label={() => { }}
                    labelPosition={50}
                    labelStyle={{}}
                />
            
    )

}
