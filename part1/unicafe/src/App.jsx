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

const StatisticsLine = ({text, val}) => {
  return (
    <p>{text} {val}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedbacks given yet</p>
      </div>
    )
  }
  else {
    const total = good + neutral + bad  ?? 0
    const avg = Number.isNaN((good - bad) / total) ? 0: (good - bad) / total
    const pos = Number.isNaN(good / total) ? 0 : good / total;
    return (
      <div>
        <h1>statistics</h1>
        <StatisticsLine text="good" val ={good} />
        <StatisticsLine text="neutral" val ={neutral} />
        <StatisticsLine text="bad" val ={bad} />
        <StatisticsLine text="all" val ={total} />
        <StatisticsLine text="average" val ={avg} />
        <StatisticsLine text="positive" val ={pos} />
      </div>
    )}
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
