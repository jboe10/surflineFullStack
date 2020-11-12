import axios from 'axios'; 
const userServer = `http://localhost:5000/api`;

export async function getUserInfo() {
  const token = localStorage.getItem('auth-token');
  return axios({
    method: 'GET',
    url: `${userServer}/user`,
    headers: {'auth-token': token}
  })
  .then((response) => {
    return response.data
  })
}

export async function updateUserSpots(favSpots) {
  const token = localStorage.getItem('auth-token');
  if (token) {
    return axios({
      method: 'PUT',
      url: `${userServer}/user`,
      data: {favoriteSpots: favSpots},
      headers: {'auth-token': token}
    })
    .then((response) => {
      return response.data
    })
  }
}

export async function getSpotList() {
  return axios.get(`${userServer}/spots`)
  .then((response) => {
    return response.data
  })
}