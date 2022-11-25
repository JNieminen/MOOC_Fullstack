import { useState } from 'react'

const Title = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} > {text} </button>
)

const Stat = ({ text, value }) => (
  <>
    {text} {value}<br />
  </>
)



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
      <Stat text='good' value={good} />
      <Stat text='neutral' value={neutral} />
      <Stat text='bad' value={bad} />
    </div>
  )
}

export default App