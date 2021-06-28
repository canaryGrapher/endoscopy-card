let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
let patientName = localStorage.getItem('patient_name') ? localStorage.getItem('patient_name') : '';
let hospitalNum = localStorage.getItem('hospital_no') ? localStorage.getItem('hospital_no') : '';

export const initialState = {
  token: token,
  patientName: patientName,
  hospitalNum: hospitalNum
};

export const AuthReducer = (initialState, action) => {
switch (action.type) {
  case "AUTH_REQUEST":
      return {
        ...initialState,
        loading: true
      };
  case "LOGIN_SUCCESS":
    return {
      token: action.payload,
      loading: false
    };
  case "AUTH_ERROR":
    return {
      ...initialState,
      loading: false,
      errorMessage: action.error
    };
  case "PATIENT_CLOSE":
    return {
      patientName: '',
      hospitalNo: ''
    };
  case "SEARCH_SUCCESS":
    return {
      ...initialState,
      patientName: localStorage.getItem('patient_name'),
      hospitalNo: localStorage.getItem('hospital_no')
    };
  case "LOGOUT":
    return {
      token: '',
      patientName: '',
      hospitalNo: ''
    };
  default:
    throw new Error(`Unhandled action type: ${action.type}`);
}
}