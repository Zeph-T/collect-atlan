const BASE_URL = 'http://localhost:8000/api';

export const GET_ALL_FORMS = `${BASE_URL}/forms/getall`;
export const GET_FORM_DATA_BY_ID = `${BASE_URL}/forms/get/`;
export const UPDATE_FORM = `${BASE_URL}/forms/update`
export const CREATE_FORM = `${BASE_URL}/forms/create`;
export const ADD_QUESTION = `${BASE_URL}/questions/add`;
export const DELETE_QUESTION = `${BASE_URL}/questions/delete`;
export const UPDATE_QUESTION = `${BASE_URL}/questions/update`;

const INTEGRATIONS_BASE_URL = 'http://localhost:8000/integrations'

export const CONNECT_GOOGLE_SHEET = `${INTEGRATIONS_BASE_URL}/googlesheets/connect`;
