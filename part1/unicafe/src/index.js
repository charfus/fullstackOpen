import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ name, handleClick }) => {    
    return(
        <button onClick={handleClick}>{name}</button>
    )
}

const Statistic = ({name, count}) => {
  return(    
    <tr>
    <td>{name}</td>
    <td>{count}</td>
    </tr>    
  )
}

const Statistics = ({good, bad,neutral}) => {
  const sum = good + neutral + bad;
  const val = (good * 1) + (neutral * 0) + (bad * -1);
  const average = () => {    
    if(sum > 0){
      return val / sum }
    return 0
  }
  
  const positive = () => {
    if(sum > 0){
      return `${good / sum} %` }
    return `0 %`    
  }

  return(
    <div>
    {sum > 0 ? 
    <table>
    <tbody>
          <Statistic name='good' count={good} />
          <Statistic name='neutral' count={neutral} /> 
          <Statistic name='bad' count={bad} />
          <Statistic name='all' count={good + neutral + bad} />
          <Statistic name='average' count={average()} />
          <Statistic name='positive' count={positive()} />
    </tbody>
    </table>
    :`No feedback given`
    }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  return (
    <div>
      <h3>give feedback</h3>
          <Button name='good' handleClick={() => { setGood(good + 1)}}/>
          <Button name='neutral' handleClick={() => { setNeutral(neutral + 1)}}/>
          <Button name='bad' handleClick={() => { setBad(bad + 1)}}/> 
      <h3>statistics</h3>    
          <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)