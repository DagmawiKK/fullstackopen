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
  const personStyle = {
    fontSize: "1rem",
    margin: "1rem",
    padding: 10,
  }

  const buttonStyle = {
    fontSize: "1rem",
    marginLeft: "1rem",
    padding: 10,
    borderRadius: 10,
    border: "None"
  }
  return (
    <>
    <p style={personStyle}>{person.name} {person.number}</p>
    <button style={buttonStyle} onClick={handleDelete}>Delete</button>
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

const Notification = ({notification}) => {
  if (notification.length == 0) {
    return
  }
  const notificationStyle = {
    color: "white",
    fontSize: "2rem",
    margin: "2rem",
    padding: 18,
    backgroundColor: "green",
    border: "none",
    borderRadius: 10,
  }

  const errorVariant = "red"

  return (
    <div style={notification[0] == "m" ? notificationStyle: {...notificationStyle, backgroundColor: errorVariant}}>{notification[1]}</div>
  )
}

// With useEffect (fetching)

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])
  const [notification, setNotification] = useState([])

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
                        .catch((e) => {
                          setNotification(["e", `${alreadyAdded.name} has been deleted before`])
                          setTimeout(() => {
                            setNotification([])
                          }, 2000);
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
                      .then(() => {
                        setNotification(["m", `${newName} has been added`])
                        setTimeout(() => {
                          setNotification([])
                        }, 2000);
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
      <Notification notification={notification}/>
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
