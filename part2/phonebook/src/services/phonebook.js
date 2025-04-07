import axios from "axios"

const baseUrl = "http://localhost:3001/persons"


const getAll = () => axios.get(baseUrl)
const addNew = (newPerson) => axios.post(baseUrl, newPerson)
 
export default {
    getAll,
    addNew
}