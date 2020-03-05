import axios from 'axios'

const BASE_URL = process.env.BASE_URL

export const api = () => {
  const http = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })

  return {
    api: http,
    async get (url, params, options) {
      return this.api({
        ...options,
        ...{
          url,
          method: 'get',
          params: { ...params }
        }
      })
    }
  }
}
