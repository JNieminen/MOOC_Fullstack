import { useState } from 'react'

const Title = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} > {text} </button>
)

const Statistics = (props) => {
  const good = parseInt(props.good)
  const neutral = parseInt(props.neutral)
  const bad = parseInt(props.bad)
  const all = good + neutral + bad
  let average = (good - bad) / all // good = 1, neutral = 0, bad = -1
  let positive = good / all

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      all {all} <br />
      average {average} <br />
      positive {positive} <br />
    </div>
  )

}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text='Unicafe feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Title text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App