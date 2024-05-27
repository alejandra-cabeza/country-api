import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(url, { params, cancelToken: source.token })
            .then(res => {
                setLoading(false);
                res.data && setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                if (axios.isCancel(err)) {
                  console.log('Request cancelled');
                } else {
                  setError(err);
                }
              })
        return () => {
            source.cancel();
        }
    }, [url, params])

    return { data, loading, error }
}

export default useFetch;