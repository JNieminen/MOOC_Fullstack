const Person = ({ person }) => (<>{person.name} {person.number}<br /></>)

const Persons = ({ persons }) => (
    <div>
        {persons.map(person =>
            <Person key={person.name} person={person} />)
        }
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

export { Persons, PersonForm }