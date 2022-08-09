import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'
  },{
    name: 'Salla Vuorinen',
    number: '040-8973456'
  },{
    name: 'Pekka Haavisto',
    number: '040-1920437'
  },{
    name: 'Makke Mikkelinen',
    number: '040-9385647'
  },{
    name: 'Susse Kievinen',
    number: '040-3376547'
  },{
    name: 'Blum Blumberg',
    number: '040-9387694'
  },{
    name: 'Nikjel Nikjelson',
    number: '040-2298375'
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
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
        <div> filter shown with
          <input
            value={filter}
            onChange={handleFilterChange}>
          </input>
        </div>

      <h2>add a new</h2>
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

      <h2>Numbers</h2>
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

export default App