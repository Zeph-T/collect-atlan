const BASE_URL = "http://localhost:8000/api";
export const FRONTEND_URL = "http://localhost:3000"

export const GET_ALL_FORMS = `${BASE_URL}/forms/getall`;
export const GET_FORM_DATA_BY_ID = `${BASE_URL}/forms/get/`;
export const UPDATE_FORM = `${BASE_URL}/forms/update`;
export const CREATE_FORM = `${BASE_URL}/forms/create`;
export const ADD_QUESTION = `${BASE_URL}/questions/add`;
export const DELETE_QUESTION = `${BASE_URL}/questions/delete/`;
export const UPDATE_QUESTION = `${BASE_URL}/questions/update`;
export const PUBLIC_FORM_DATA = `${BASE_URL}/form/`;

const INTEGRATIONS_BASE_URL = "http://localhost:8000/integrations";
const SUBMISSIONS_BASE_URL = "http://localhost:8002"
export const CONNECT_GOOGLE_SHEET = `${INTEGRATIONS_BASE_URL}/googlesheets/connect`;
export const GET_INTEGRATION = `${INTEGRATIONS_BASE_URL}/get/`;
export const SUBMIT_FORM_URL = `${SUBMISSIONS_BASE_URL}/submit/`