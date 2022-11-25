import { useState } from 'react'

const Title = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} >{text}</button>
)

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      {anecdote}<br />
      has {votes} votes<br />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'If something can go wrong, it will.',
    'Any code of your own that you haven’t looked at for six or more months might as well have been written by someone else.',
    'There’s always one more bug.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const mostVotes = () => votes.indexOf(Math.max(...votes))

  const handleAnecdoteClick = () => setSelected(randInt(0, anecdotes.length))
  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <Title text='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVotes()]} votes={votes[mostVotes()]} />
    </div>
  )
}

export default App