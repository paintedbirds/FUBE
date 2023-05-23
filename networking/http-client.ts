import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: APPLICATION_JSON,
    [CONTENT_TYPE]: APPLICATION_JSON,
  },
});

export { httpClient };
