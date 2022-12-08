const Person = ({ person, buttonHandler }) => (
    <>
        {person.name} {person.number}&nbsp;
        <button value={person.name} id={person.id} onClick={buttonHandler}>
            delete
        </button><br />
    </>
)

const Persons = ({ persons, buttonHandler }) => (
    <div>
        {persons.map(person =>
            <Person key={person.id} person={person} buttonHandler={buttonHandler} />)
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