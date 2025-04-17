import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const AnecdoteMostVote = ({anecdotes, votes}) => {
  let _max = 0;
  for (let vote in votes) {
    if (votes[vote] > votes[_max]) {
      _max = vote
    }
  }

  return (
    <div>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[_max]}</p>
    <p>has {votes[_max]} votes</p>
  </div>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length)

  let prev  = selected
  let newSelected = selected
  const handleSelected = () => {
    while (prev == newSelected) {
      newSelected = getRandomIndex()
    }

    setSelected(newSelected)
    prev = newSelected
  }

  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})
  const handleVote = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    }
    setVotes(newVotes)
  }

  return (
    <>
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    <Button onClick={handleSelected} text="next anecdote" />
    <Button onClick={handleVote} text={"vote"} />
    </div>
    <AnecdoteMostVote votes={votes} anecdotes={anecdotes}/>

    </>
  )
}

export default App
