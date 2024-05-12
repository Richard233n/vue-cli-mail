import axios from 'axios'

const service = axios.create({
  baseURL: 'http://webapi.hanmaweilai.com',
  timeout: 3000
})

export default service
