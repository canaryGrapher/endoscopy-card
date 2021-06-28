import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './../App.css';
import { useEndoscopyDispatch, useEndoscopyState, getPatientRecomm, updatePatientRecomm } from './../context';
import { Button } from 'reacthalfmoon';

const Recommendation = () => {

    const [edit, setEdit] = useState(false);
    const [recomm, setRecomm] = useState('');

    const admin = useEndoscopyState();
    const history = useHistory();
    const dispatch = useEndoscopyDispatch();

    // toggles properties based on edit status
    const toggleEdit = () => {
        if(edit) {
            updateRecomm();
            document.getElementById('recomm-input').contentEditable = false;
        } else {
            document.getElementById('recomm-input').contentEditable = true;
        }
        setEdit(!edit);
    }

    const updateRecomm = async() => {
        try {
            let payload = {
                hospitalNum: localStorage.getItem('hospital_no'),
                recomm: recomm
            }
            let response = await updatePatientRecomm(dispatch, payload);
        } catch (error) {
            
        }
    }

    const getRecomm = async() => {
        try {
            let response = await getPatientRecomm(dispatch, localStorage.getItem('hospital_no'))
            setRecomm(response.data); 
            document.getElementById('recomm-input').innerHTML = response.data; 
        } catch (error) {
            
        }
    }

    useEffect(async () => {
        if(!admin.patientName || !admin.hospitalNum || !admin.token) {
            history.push('/patient/details');
        } else {
            await getRecomm();
        }
    }, [])

    return(
        <div className='d-flex flex-column w-three-quarter align-items-center mt-20'>
            <div className='w-three-quarter'>
                <label for='recomm' className='required'>Enter recommendations</label>
                <p className='h-300 text-muted p-10' id='recomm-input' onInput={(e) => setRecomm(document.getElementById('recomm-input').innerHTML)}></p>
            </div>
            <Button className='w-150 h-50 mt-20 font-size-18 font-weight-bold colour-button' onClick={toggleEdit}>{edit ? 'SAVE' : 'EDIT'}</Button>
        </div>
    );
}

export default Recommendation;