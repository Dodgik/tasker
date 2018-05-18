import fetch from 'isomorphic-fetch'
import queryString from 'query-string'
import MD5 from 'md5.js'


const getProps = {
  method: 'GET',
};

const postProps = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const fetchWrap = (path, props = postProps, query = '', apiParams) => {
  const { apiHost, developer } = apiParams;
  
  let response;
  return fetch(`${apiHost}${path}?developer=${developer}&${query}`, props)
    .then(res => {
      response = res
      return response.json();
    })
    .then(json => {
      if (response.ok && json.status == 'ok') {
        return { response: json.message || json }
      } else {
        return { error: json.message || json }
      }
    })
    .catch(error => {
      console.error('---api tasks fetch error: ', error)
      return { error: error }
    });
}

const fetchPOST = (path, data, apiParams) => {
  const initProps = data ? Object.assign(postProps, { body: JSON.stringify(data) }) : postProps;
  return fetchWrap(path, initProps, apiParams);
}

const fetchGET = (path, data, apiParams) => {
  const query = queryString.stringify(data);
  return fetchWrap(path, getProps, query, apiParams);
}

export const all = (data, apiParams) => {
  return fetchGET('/', data, apiParams);
}

export const add = (formData, apiParams) => {
  return fetchWrap(`/create/`, {
    method: 'POST',
    body: formData,
  }, apiParams);
}

export const set = (data, apiParams) => {
  const { id, status, text } = data;
  const token = 'beejee';
  const query = queryString.stringify({ status, text, token });
  const queryMD5 = new MD5().update(query).digest('hex');

  var formData = new FormData();
  formData.append('status', status);
  formData.append('text', text);
  formData.append('token', token);
  formData.append('signature', queryMD5);

  return fetchWrap(`/edit/${id}`, {
    method: 'POST',
    body: formData,
  }, apiParams);
}
