import { React, useEffect, useState } from 'react';
import './../App.css';
import { Button } from 'reacthalfmoon';
import { getPatientReport, updatePatientReport, useEndoscopyDispatch, useEndoscopyState } from './../context';
import { useHistory } from 'react-router-dom';

const Reports = () => {

    const [edit, setEdit] = useState(false);
    const [report, setReport] = useState('');

    const admin = useEndoscopyState();
    const history = useHistory();
    const dispatch = useEndoscopyDispatch();

    // toggles properties based on edit status
    const toggleEdit = () => {
        if(edit) {
            updateReport();
            document.getElementById('report-input').contentEditable = false;
        } else {
            document.getElementById('report-input').contentEditable = true;
        }
        setEdit(!edit);
    }

    const updateReport = async() => {
        try {
            let payload = {
                hospitalNum: localStorage.getItem('hospital_no'),
                report: report
            }
            let response = await updatePatientReport(dispatch, payload);
        } catch (error) {
            
        }
    }

    const getReport = async() => {
        try {
            let response = await getPatientReport (dispatch, localStorage.getItem('hospital_no'))
            setReport(response.data); 
            document.getElementById('report-input').innerHTML = response.data;
        } catch (error) {
            
        }
    }

    useEffect(async () => {
        if(!admin.patientName || !admin.hospitalNum || !admin.token) {
            history.push('/patient/details');
        } else {
            await getReport();
        }
    }, []);

    return(
        <div className='d-flex flex-column w-three-quarter align-items-center mt-20'>
            <div className='w-three-quarter'>
                <label for='report' className='required'>Enter report</label>
                <p className='h-300 text-muted p-10' id='report-input' onInput={(e) => setReport(document.getElementById('report-input').innerHTML)}></p>
            </div>
            <Button className='w-150 h-50 mt-20 font-size-18 font-weight-bold colour-button' onClick={toggleEdit}>{edit ? 'SAVE' : 'EDIT'}</Button>
        </div>
    );
}

export default Reports;