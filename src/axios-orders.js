import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-a351f.firebaseio.com/' // setting base url so no need to write this in every code
});

export default instance;