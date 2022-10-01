import axios from 'axios';

const warehouseAPI = () =>
  axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export { warehouseAPI };
