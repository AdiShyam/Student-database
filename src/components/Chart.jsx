import React from 'react';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines'


export const Chart = ({data, color, units}) => {
    const  average = data => {
        const sum = data.reduce( (accumulator, element) => {
            return (accumulator + element);
        }, 0)
        const avg = sum / (data.length);
        return Math.round(avg)
    }
    if(data === undefined) {
        return <div> Graph is loading </div>
    } else {
        data = Object.values(data)
        return ( 
            <div className='graph-wrapper'>
            <Sparklines height={50} width={50} data={data} >
                <SparklinesLine color={color} />
                <SparklinesReferenceLine type ="avg" />
            </Sparklines>
            <div>{average(data)} {units}</div>
           </div>
        )
    }
}
