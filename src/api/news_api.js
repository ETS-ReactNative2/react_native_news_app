import axios from 'axios';

const baseURL = 'http://newsapi.org/v2/';
const API_KEY = '2e938b7bf1464889907ef4f0e99a19da';

const API = axios.create({ 
    baseURL: baseURL,
    timeout: 1000,
});

const getNews = (requestURL) => API.get(`${requestURL}&apiKey=${API_KEY}`).then(function (response) {
    // handle success
    return response.data
})
.catch(function (error) {
    // handle error
    return error
});

export default NEWS_API = {
    getNews,
}