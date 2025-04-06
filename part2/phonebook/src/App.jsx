import { useState } from 'react'

const Search = ({searchSubmit, handleInputSearch, search}) => {
  return (
    <form onSubmit={searchSubmit}>
    <input onChange={handleInputSearch}type="text" name="search" id="search" value={search}/>
  </form>
  )
}

const AddNewPerson = ({handleSubmit, handleNewName, newName, handleNewNumber, newNumber}) => {
  return (
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
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const DisplayNumbers = ({filtered}) => {
  return (
    <>
    {filtered.map((person, idx) => <Person key={idx} person={person}/>)}
    </>
  )
}
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

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleInputSearch = (e) => setSearch(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyAdded = persons.find((person) => person.name === newName)
    if (alreadyAdded === undefined) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setFiltered(filtered.concat({name: newName, number: newNumber}))
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
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
      <Search searchSubmit={searchSubmit} handleInputSearch={handleInputSearch} search = {search}/>
      <h2>add a new</h2>
      <AddNewPerson handleSubmit={handleSubmit} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <div>
        <h2>Numbers</h2>
        <DisplayNumbers filtered={filtered}/>
      </div>
    </div>
  )
}

export default App
