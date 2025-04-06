import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(persons)

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyAdded = persons.find((person) => person.name === newName)
    if (alreadyAdded === undefined) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setFiltered(persons)
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

  const handleInputSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    if (search != ""){
      const newPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
      setFiltered(newPersons)
    }
    if (search === "") {
      setFiltered(persons)
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
        <form onSubmit={searchSubmit}>
          <input onChange={handleInputSearch}type="text" name="search" id="search" value={search}/>
        </form>
      <h2>add a new</h2>
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
        {filtered.map((person, idx) => <p key={idx}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App
