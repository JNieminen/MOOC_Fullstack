import { useState, useEffect } from 'react'
import personService from './services/persons'
import { Persons, PersonForm } from './components/Person'

const Filter = ({ changeHandler, filter }) => (
  <div>filter shown with <input value={filter}
    onChange={changeHandler} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (!persons.some(persons => persons.name === newName)) {
      const personObject = { name: newName, number: newNumber }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      const korvaa = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (korvaa) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const id = changedPerson.id

        personService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(
              `${newName} was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }
  }

  const deleteName = (event) => {
    const poista = window.confirm(`Delete ${event.target.value}`)
    if (poista) {
      personService
        .deleteName(event.target.id)
        .then(
          setPersons(persons.filter(person => { return person.id !== parseInt(event.target.id) }))
        )
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
      <Persons persons={showPersons} buttonHandler={deleteName} />
    </div>
  )

}

export default App

