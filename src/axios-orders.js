import axios from 'axios';

const instance =  axios.create({
  baseURL: "https://my-burger-react-application.firebaseio.com/",
});

export default instance;