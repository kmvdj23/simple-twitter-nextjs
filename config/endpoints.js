import axios from "axios"

import { baseUrl } from "./baseUrl"
import { authFetch } from "./auth"

import customStorage from "./customStorage"


const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1200,
})

const invoke = async (url, method = "get", data = {}, csrf = "", auth="") => {
  return instance({
    method: method,
    url: url,
    data: data,
    headers: {
      ...instance.defaults.headers,
      "X-CSRFToken": csrf,
      "Authorization": auth ? "Bearer " + auth : auth
    },
  })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
}

const loginEndpoint = async (username, password) => {
  const data = { username, password }
  return invoke("login", "post", data)
}

const signupEndpoint = async (data) => {
  return invoke("signup", "post", data)
}

const refreshToken = async (token) => {
  return invoke("refresh", "post", token)
}

const getUsers = async () => {
  return fetch(baseUrl + "users", {
        method: "get",
      }).then((response) => Promise.resolve(response.json()))
    .catch((error) => Promise.reject(error))
  // return invoke("users")
}

export { instance, invoke, loginEndpoint, refreshToken, signupEndpoint, getUsers }
