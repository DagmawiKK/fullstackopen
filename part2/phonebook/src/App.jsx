import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Abe kebe",
      number: "040-1234555"
    }
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyAdded = persons.find((person) => person.name === newName)
    if (alreadyAdded === undefined) {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input required onChange={handleNewName} value={newName} type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input required onChange={handleNewNumber} value={newNumber} type="text" name="number" id="number" />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        {persons.map((person, idx) => <p key={idx}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
