import axios from "axios";

import Cookie from 'js-cookie';

import { apiUrl } from '../services/auth.service';

axios.interceptors.request.use((req) => {
  req.headers['xsrf-token'] = Cookie.get('vighnesh153-XSRF-TOKEN');
  req.url = apiUrl + req.url;
  return req;
});

axios.interceptors.response.use((res) => {
  return res;
});
