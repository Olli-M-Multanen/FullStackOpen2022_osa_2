import { useState, useEffect } from 'react'
import personService from './services/persons'
import List from './components/contactList'
import Add from './components/contactAdd'
import Filter from './components/contactFilter'

const App = () => {
  const [persons, setPersons] = useState([])
  // States
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
  // Add new person
  const addContact = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
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
      handleContactChange()
      setNewName('')
      setNewNumber('')
    }
    // if object is not found in array, concat the object to array
    if (!isFound) {
      personService
        .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })}
  }
    // Filter contacts by a string
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
  const handleContactChange = () => {
    persons.some(object => {
      if (object.name === newName) {
        console.log(object.id)
        if (window.confirm(`update ${object.name}'s number to ${newNumber} ?`)) {
          personService
          .update(object.id, {
            name: object.name,
            number: newNumber,
            id: object.id
          })
          window.location.reload(false)
        }
      }
  })
}
  const handleDelete = (contact) => {
    console.log(contact)
    console.log(`delete person ${contact.id} ?`)
    if (window.confirm(`delete ${contact.name}?`)) {
      personService
      .remove(contact.id)
      window.location.reload(false)
    } 
  }
  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Add
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleContactChange={handleContactChange}/>
      <h2>Numbers</h2>
      <List query={query} handleDelete={handleDelete}/>
    </>
  )
}

export default App