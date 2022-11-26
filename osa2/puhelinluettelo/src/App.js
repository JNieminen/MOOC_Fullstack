import { useState } from 'react'

const Person = ({ person }) => (<>{person.name} {person.number}<br /></>)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} person={person} />)
    }
  </div>
)

const Filter = ({ changeHandler, filter }) => (
  <div>filter shown with <input value={filter}
    onChange={changeHandler} />
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addName}>
    <div>
      name: <input value={props.newName}
        onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber}
        onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const debugData = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Terry Gilliam', number: '44-01-798466' }
  ]
  const [persons, setPersons] = useState(debugData) // debug set
  // const [persons, setPersons] = useState([]) // empty set
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
      <Filter changeHandler={handleFilterChange} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={showPersons} />
    </div>
  )

}

export default App

