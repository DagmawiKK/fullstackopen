import axios from "axios"

const baseUrl = "http://localhost:3001/persons"


const getAll = () => {
    const r = axios.get(baseUrl)
    console.log("r", r)
    return r

}
const addNew = (newPerson) => axios.post(baseUrl, newPerson)
const deleteContact = (deletePerson) => axios.delete(`${baseUrl}/${deletePerson.id}`)
 
export default {
    getAll,
    addNew,
    deleteContact
}