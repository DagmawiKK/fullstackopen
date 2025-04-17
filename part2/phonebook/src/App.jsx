import { useState, useEffect } from 'react'
import phonebookService from "./services/phonebook"
import "./index.css"

const Search = ({searchSubmit, handleInputSearch, search}) => {
  return (
    <form onSubmit={searchSubmit} className="mb-4">
      <input  onChange={handleInputSearch} type="text" name="search" id="search" value={search} placeholder="Search by name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  )
}

const AddNewPerson = ({handleSubmit, handleNewName, newName, handleNewNumber, newNumber}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input  placeholder='Abebe' required onChange={handleNewName} value={newName} type="text" name="name" id="name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number:</label>
        <input placeholder='+251911121314' required onChange={handleNewNumber} value={newNumber} type="text" name="number" id="number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button type='submit' className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-md hover:from-blue-600 hover:to-indigo-600 transition duration-300">
          Add
        </button>
      </div>
    </form>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 border border-gray-200 rounded-md shadow-sm">
      <p className="text-sm text-gray-700">{person.name} {person.number}</p>
      <button onClick={handleDelete} className="ml-4 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300">
        Delete
      </button>
    </div>
  )
}

const DisplayNumbers = ({filtered, handleDelete}) => {
  return (
    <div>
      {filtered.map((person, idx) => (
        <Person key={idx} person={person} handleDelete={() => handleDelete(person)} />
      ))}
    </div>
  )
}

const Notification = ({notification}) => {
  if (notification.length === 0) {
    return null
  }
  let notificationStyle = null
  if(notification[0] === "m") {
    notificationStyle = "bg-green-500 text-white p-4 mb-2 rounded-md"
  }
  else if(notification[0] === "e") {
    notificationStyle = "bg-red-500 text-white p-4 mb-4 rounded-md"
  }
  else {
    notificationStyle = "bg-blue-500 text-white p-4 mb-4 rounded-md"

  }

  return (
    <div className={notificationStyle}>
      {notification[1]}
    </div>
  )
}

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
      setPersons(response.data)
      setFiltered(response.data)
    }

    const promise = phonebookService.getAll()
    promise.then(eventHandler)
    .catch(error => {
      console.error('Failed to fetch contacts:', error)
      setNotification(["e", "Failed to load contacts"])
    })
  }

  useEffect(effectHook, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadyAdded = persons.find((person) => person.name === newName);
    if (alreadyAdded) {
      const conf = window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
      if (conf) {
        const updatedContact = {...alreadyAdded, number: newNumber};
        phonebookService.updateContact(updatedContact)
          .then(response => {
            setFiltered(persons.map(p => p.name === newName ? response.data : p ))
            setPersons(persons.map(p => p.name === newName ? response.data : p ))
            setNotification(["u", `${alreadyAdded.name} has been updated`])
            setTimeout(() => {
              setNotification([])
            }, 2000);
          })
        .catch(error => {
          console.log(error.response.data.error)
          setNotification(["e", error.response.data.error])
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
        .catch(error => {
          console.log(error.response.data.error)
          setNotification(["e", error.response.data.error])
          setTimeout(() => {
            setNotification([])
          }, 2000);
        })
    }
  }


  const handleDelete = (person) => {
    const con = window.confirm(`Delete ${person.name}?`)
    if (con) {
      phonebookService.deleteContact(person)
      setFiltered(filtered.filter(p => p.id !== person.id ))
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    if (search !== ""){
      const newPersons = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
      setFiltered(newPersons)
    }
    if (search === "") {
      setFiltered(persons)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Phonebook</h2>
        <Notification notification={notification}/>
        <Search searchSubmit={searchSubmit} handleInputSearch={handleInputSearch} search={search}/>
        <AddNewPerson handleSubmit={handleSubmit} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Numbers</h2>
          <DisplayNumbers filtered={filtered} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}

export default App