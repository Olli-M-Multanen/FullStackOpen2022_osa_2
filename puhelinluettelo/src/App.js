import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ filter , handleFilterChange }) => {
  return (
    <>
    <div>filter shown with
      <input
        value={filter}
        onChange={handleFilterChange}>
      </input>
    </div>
    </>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <>
    <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>

      </form>
    </>
  )
}

const Persons = ({ query }) => {
  return (
    <>
    {query.map((persons) => {
        return (
          <div key={persons.name}>
            <p>{persons.name} {persons.number}</p>
            </div>
        )
      })}
    </>
  )
}




const App = () => {
  const [persons, setPersons] = useState([])
  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])



  // Add new person
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // check to see if object already exists in array
    const isFound = persons.some(object => {
      if (object.name === newName) {
        return true
      }
      return false
    })
    // if object found = true
    // alert
    if (isFound) {
      alert(`${newName} is already added to phonebook !`)
      setNewName('')
      setNewNumber('')
    }

    // if object is not found in array, concat the object to array
    if (!isFound) {
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })}
  }
    // Filter phonebook by a string
  const query = persons.filter(name => name.name.toLowerCase().includes(filter))

  // handleChanges
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
      }
  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons query={query}/>
    </>
  )
}

export default App