import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_FUBE;
const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: APPLICATION_JSON,
    Authorization: 'Token fd0ba4ac4c25fe479e9eeb5f5a4f085c61967dda',
    [CONTENT_TYPE]: APPLICATION_JSON,
  },
});

export { httpClient };