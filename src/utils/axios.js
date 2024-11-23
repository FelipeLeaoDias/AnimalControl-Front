const axios = require('axios').default
import {BASE_URL} from '@env'

const api = axios.create({
  baseURL: 'http://animalcontrol.0xfb.xyz:3000',
})


const postUnauth = async (route, data) => {
  try{
    const response = await api.post(route, {email: data.email, password: data.password})
    return response.data
  }catch(err){
    console.log(err)
    throw new Error(err.response.data.message)
  }
}

export const get = async (route, token) => {
  try{
    const response = await api.get(route, {headers:{"Authorization":`Bearer ${token}`}})
    return response.data
  }catch(err){
    console.log(err)
    throw new Error(err.response.data.message)
  }
}

export const postLogin = async (email, password) => {
  return await postUnauth('/auth/login', {email, password})
}

export const postSignUp = async (email, password) => {
  return await postUnauth('/user', {email, password})
}

export const postAuth = async (route, data, token) => {
  try{
    console.log(data)
    const response = await api.post(route,data, {headers:{"Authorization":`Bearer ${token}`}})
    return response.data
  }catch(err){
    throw new Error(err.response.data.message)
  }
}

