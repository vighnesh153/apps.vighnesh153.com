import axios from "axios";

axios.interceptors.request.use((req) => {
  console.log('Making a request.');
  return req;
});

axios.interceptors.response.use((res) => {
  console.log('Received a response.');
  return res;
});
