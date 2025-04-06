import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Abe kebe"}
  ])

  const [newName, setNewName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyAdded = persons.find((person) => person.name === newName)
    if (alreadyAdded === undefined) {
      setPersons(persons.concat({name: newName}))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input onChange={handleNewName} value={newName} type="text" name="name" id="name" />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        {persons.map((person, idx) => <p key={idx}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App
