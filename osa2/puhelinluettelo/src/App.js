import { useState } from 'react'

const Person = ({ person }) => (<>{person.name} {person.number}<br /></>)

const App = () => {
  const debugData = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]
  const [persons, setPersons] = useState(debugData)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (!persons.some(persons => persons.name === newName)) {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const nameContainsFilter = (name, filter) => (
    name.toLowerCase().includes(filter.toLowerCase())
  )

  const showPersons = (filter.length === 0)
    ? persons
    : persons.filter(person => nameContainsFilter(person.name, filter))

  //console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter}
        onChange={handleFilterChange} />
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showPersons.map(person =>
          <Person key={person.name} person={person} />)
        }
      </div>

    </div>
  )

}

export default App

