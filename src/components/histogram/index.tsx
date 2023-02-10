import React, {useState} from 'react'
import { AgChartsReact } from 'ag-charts-react';

interface props {
  scores: {score: number}[]
}

const Histogram = (props: props) => {

const options = {
  title: {
    text: "Score Histogram"
  }, 
  data: props.scores,
  series: [
    {
      type: 'histogram',
      xKey: 'score',
      xName: 'Score',
      bins: [[0,10], [10,20], [20,30], [30,40], [40,50], [50,60], [60,70], [70,80], [80,90], [90,100]]
    },
  ],
  legend: {
    enabled: false
  },
  axes: [
    {
      type: 'number',
      position: 'bottom',
      title: { text: 'Score' },
    },
    {
      type: 'number',
      position: 'left',
      title: { text: 'Occurences' },
    },
  ],

}
    return (
        <div className='my-5'>
             <AgChartsReact options={options}/>
        </div>
    )
}

export default Histogram