import { useState } from 'react'


const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const GiveFeedback = ({handleFeedback}) => {
  return (
    <div>
      <h1>give give feedback</h1>
      <Button onClick={handleFeedback} text="good"/>
      <Button onClick={handleFeedback} text="neutral"/>
      <Button onClick={handleFeedback} text="bad"/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad  ?? 0
  const avg = Number.isNaN((good - bad) / total) ? 0: (good - bad) / total
  const pos = Number.isNaN(good / total) ? 0 : good / total;
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {avg}</p>
      <p>positive {pos}</p>
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const handleFeedback = (e) => {
    const clicked = e.target.textContent
    const newFeedback = {
      ...feedback,
      [clicked]: feedback[clicked] + 1
    }
    setFeedback(newFeedback)
  }

  return (
    <>
    <GiveFeedback handleFeedback = {handleFeedback}/>
    <Statistics good = {feedback.good} neutral={feedback.neutral} bad={feedback.bad}/>
    </>
  )

}
export default App
