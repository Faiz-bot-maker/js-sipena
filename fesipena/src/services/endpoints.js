export const ENDPOINTS = {
  PENELITIAN: {
    GET_ALL: '/api/penelitian',
    GET_BY_ID: (id) => `/api/penelitian/${id}`,
    CREATE: '/api/penelitian',
    UPDATE: (id) => `/api/penelitian/${id}`,
    DELETE: (id) => `/api/penelitian/${id}`,
  }
};

export default ENDPOINTS;
