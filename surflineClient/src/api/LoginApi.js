import axios from 'axios'; 

const loginServer = `http://localhost:4000/api/user`

export default async function LoginRequest(email, pass) {
  return axios.post(`${loginServer}/login`, {
    email: `${email}`,
    password: `${pass}`
  })
  .then((response) => {
    return response.data.token;
  })
}

export async function CreateUser(name, email, pass) {
  return axios.post(`${loginServer}/register`, {
    name: `${name}`,
    email: `${email}`,
    password: `${pass}`
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return undefined;
  })
}


