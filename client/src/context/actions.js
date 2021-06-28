import axios  from 'axios';

// action to sign in an admin
export async function signIn(dispatch, signInPayload) {
  try {
    dispatch({ type: 'AUTH_REQUEST' });
    let resp = {}
    await axios({
        method: 'POST',
        url: '/api/doctor/login',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*", 
        },
        data: JSON.stringify(signInPayload),
      })
      .then((response) => {
        if (response.status === 200) {
            resp = response.data;
            dispatch({ type: 'LOGIN_SUCCESS',  payload: response.data.token });
            localStorage.setItem('token', response.data.token);
        }
      })
      .catch((error) => {
        let errObj = {...error};
        resp = errObj.response;
        dispatch({ type: 'AUTH_ERROR', error: error });
      });
      return resp;
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR', error: error });
  }
}

// action to close the current patient
export async function closePatient(dispatch) {
  localStorage.removeItem('patient_name');
  localStorage.removeItem('hospital_no');
  dispatch({ type: 'PATIENT_CLOSE' });
}

// action to log the admin out
export async function logout(dispatch) {
  localStorage.removeItem('token');
  localStorage.removeItem('patient_name');
  localStorage.removeItem('hospital_no');
  dispatch({ type: 'LOGOUT' });
}

// action to create a patient
export async function createPatient(dispatch, signUpPayload) {
  try {
    let resp = {}
    await axios({
        method: 'POST',
        url: '/api/admin/create/patient',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*", 
            'x-auth-token': localStorage.getItem('token')
        },
        data: JSON.stringify(signUpPayload),
      })
      .then((response) => {
        if (response.status === 200) {
            resp = response;
        }
      })
      .catch((error) => {
        let errObj = {...error};
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to fetch all the patients in the database
export async function getAllPatients(dispatch) {
  try {
    let resp = {}
    await axios({
        method: 'GET',
        url: '/api/admin/patients/all',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        console.log(error)
        let errObj = {...error};
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to fetch patient details with hospital number
export async function getPatient(dispatch, patientPayload) {
  try {
    let resp = {}
    await axios({
        method: 'GET',
        url: `/api/patient/details/${patientPayload}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        console.log(error)
        let errObj = {...error};
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to fetch patient's reports with hospital number
export async function getPatientReport(dispatch, patientPayload) {
  try {
    let resp = {}
    await axios({
        method: 'GET',
        url: `/api/patient/report/${patientPayload}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        console.log(error)
        let errObj = {...error};
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to update patient's reports with hospital number
export async function updatePatientReport(dispatch, patientPayload) {
  try {
    console.log(patientPayload)
    let resp = {}
    await axios({
        method: 'PUT',
        url: `/api/admin/upload/recommendation/${patientPayload.hospitalNum}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
        data: { report: patientPayload.report },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        let errObj = {...error};
        console.log(errObj)
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to fetch patient's recommendation with hospital number
export async function getPatientRecomm(dispatch, patientPayload) {
  try {
    let resp = {}
    await axios({
        method: 'GET',
        url: `/api/patient/recommendation/${patientPayload}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        console.log(error)
        let errObj = {...error};
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to update patient's recommendations with hospital number
export async function updatePatientRecomm(dispatch, patientPayload) {
  try {
    console.log(patientPayload)
    let resp = {}
    await axios({
        method: 'PUT',
        url: `/api/admin/upload/recommendation/${patientPayload.hospitalNum}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
        data: { recommendation: patientPayload.recomm },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        let errObj = {...error};
        console.log(errObj)
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to get patient's scans with hospital number
export async function getPatientScans(dispatch, patientPayload) {
  try {
    let resp = {}
    await axios({
        method: 'GET',
        url: `/api/patient/scans/${patientPayload}`,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-auth-token': localStorage.getItem('token')  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        let errObj = {...error};
        console.log(errObj)
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

// action to upload patient's scans with hospital number
export async function uploadPatientScan(dispatch, patientPayload) {
  try {
    console.log(JSON.stringify({ scanName: patientPayload.scanName, scanTime: patientPayload.scanTime }))
    let resp = {}
    let form = new FormData();
    form.append('file', patientPayload.file);
    form.append('scanTime', patientPayload.scanTime);
    form.append('scanName', patientPayload.scanName);
    await axios.post(
      `/api/admin/upload/scans/${patientPayload.hospitalNum}`,
      form,
      { 
        headers: {
          'Accept': 'multipart/formdata',
          'Content-Type': 'multipart/formdata',
          'Access-Control-Allow-Origin': "*",
          'x-auth-token': localStorage.getItem('token')
        }  
      },
    ).then((response) => {
        console.log(response)
        if (response.status === 200) {
          resp = response.data;
        }
      })
      .catch((error) => {
        let errObj = {...error};
        console.log(errObj)
        resp = errObj.response;
      });
      return resp;
  } catch (error) {
    console.log(error)
  }
}

