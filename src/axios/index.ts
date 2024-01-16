import axios from "axios";


const URL = process.env.NEXT_PUBLIC_MY_BASE_URL;
const instanse = axios.create({
    baseURL: URL,
})





export default instanse