import axios from "axios"

const baseUrl = "/api/persons"


const getAll = () => axios.get(baseUrl)
const addNew = (newPerson) => axios.post(baseUrl, newPerson)
const deleteContact = (deletePerson) => axios.delete(`${baseUrl}/${deletePerson.id}`)
const updateContact = (updatedContact) => axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact)
 
export default {
    getAll,
    addNew,
    deleteContact,
    updateContact,
}