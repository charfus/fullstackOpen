import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));
 
  const voteFunc = () => {
    let copy = [...vote];
    copy[selected] = copy[selected] + 1
    setVote(copy)
  }

  const randomNum = () => {
    let num = Math.floor(Math.random() * (anecdotes.length - 0) + 0)    
    setSelected(num)
  }
  const mostFavorite = vote.indexOf(Math.max(...vote))  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <div>has {vote[selected]} votes</div>
      <p>
      <button onClick={voteFunc}>vote</button>
      <button onClick={randomNum}>next anecdote</button>      
      </p>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostFavorite]} 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)