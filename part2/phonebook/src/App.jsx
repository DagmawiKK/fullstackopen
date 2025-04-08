import { useState, useEffect } from 'react'
import phonebookService from "./services/phonebook"

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

const Person = ({person, handleDelete}) => {
  return (
    <>
    <p>{person.name} {person.number}</p>
    <button onClick={handleDelete}>Delete</button>
    </>
  )
}

const DisplayNumbers = ({filtered, handleDelete}) => {
  return (
    <>
    {filtered.map((person, idx) => <Person key={idx} person={person} handleDelete={() => handleDelete(person)}/>)}
    </>
  )
}

// With useEffect (fetching)

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleInputSearch = (e) => setSearch(e.target.value)

  const effectHook = () => {
    const eventHandler = (response) => {
      console.log(response.data)
      setPersons(response.data)
      setFiltered(response.data)
    }

    const promise = phonebookService.getAll()
    promise.then(eventHandler)
  }

  useEffect(effectHook, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadyAdded = persons.find((person) => person.name === newName);
    if (alreadyAdded) {
      const conf = confirm(`${newName} is already added to phonebook, replace old number with new one?`)
      if (conf) {
        const updatedContact = {...alreadyAdded, number: newNumber};
        phonebookService.updateContact(updatedContact)
                        .then(response => {
                          setFiltered(persons.map(p => p.name === newName ? response.data: p ))
                          setPersons(persons.map(p => p.name === newName ? response.data: p ))
                        })
      }
    }
    else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService.addNew(newPerson)
                      .then(response => {
                        setPersons([...persons, response.data])
                        setFiltered([...persons, response.data]);
                      })
    }
  }

  const handleDelete = (person) => {
    const con = confirm(`delete ${person.name}`)
    if (con) {
      phonebookService.deleteContact(person)
      setFiltered(filtered.filter(p => p.id != person.id ))
      setPersons(persons.filter(p => p.id != person.id))
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
        <DisplayNumbers filtered={filtered} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
