import {useCallback, useEffect, useState} from "react";

import axios from "axios";

function getAxiosRequest(config) {
  if (config.type === 'GET') {
    return axios.get(config.path);
  }
  if (config.type === 'PUT') {
    return axios.put(config.path, config.data, {withCredentials: true});
  }
  throw new Error(config.type + ': Request-Type is not supported.');
}

function ApiRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(null);
  const [doRequest, setDoRequest] = useState(false);

  const makeRequest = useCallback((config) => {
    setData(null);
    setError(null);
    setDoRequest(true);
    setConfig(config || {})
  }, []);

  useEffect(() => {
    if (doRequest === false || config === null) {
      return;
    }
    setLoading(true);
    getAxiosRequest(config)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          return;
        }
        setError({
          type: 'error',
          title: 'Something went wrong.',
          content: JSON.stringify(res.data),
        });
      })
      .catch((err) => {
        setError({
          type: 'error',
          title: 'Something went wrong.',
          content: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
        setDoRequest(false);
        setConfig(null);
      })
  }, [config, doRequest]);

  return {data, error, loading, makeRequest};
}

export default ApiRequest;
