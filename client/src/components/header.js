import React from 'react';
import './../App.css';
import { ArrowLeft, X } from 'react-feather';
import { Button } from 'reacthalfmoon';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import maheLogo from './../assets/maheLogo.png';
import { PlusCircle } from 'react-feather';
import { Upload } from 'react-feather';
import { useEndoscopyState, useEndoscopyDispatch, logout, closePatient, uploadPatientScan } from './../context';

const LandingHeader = () => {

    const history = useHistory();
    const dispatch = useEndoscopyDispatch();

    const handleLogout = async() => {
        try {
            await logout(dispatch);
            history.push('/');
        } catch (error) {

        }
    }

    return (
        <div className='d-flex flex-md-row m-0 flex-column justify-content-center'>
            <div className='w-100 h-100'>
                <img src={maheLogo} alt='MAHE Logo' className='h-100 p-10 m-5' />
            </div>
            <div className='col-xs-12 col text-center pt-md-10 ml-md-10 text-md-left'>
                <h2 className='font-weight-bolder'>KASTURBA MEDICAL COLLEGE</h2>
                <h4 className='font-weight-bold manipal'>Manipal</h4>
            </div>
            <div className='mx-20 text-center'>
                <Button className='h-50 pt-10 m-auto d-flex align-items-center justify-content-center border border-0' style={{ borderRadius: 10, width: 160, backgroundColor: 'rgb(140, 68, 180, 0.5)' }} onClick={() => {history.push('/patient/details')}}>
                    <span><PlusCircle size={30} color='white'/></span>
                    <h4 className='flex-grow-1 text-white'>New</h4>
                </Button>
            </div>
            <div className='mx-20 text-center'>
                <Button className='h-50 pt-10 m-auto mt-md-0 mt-20 d-flex align-items-center justify-content-center border border-0' style={{ borderRadius: 10, width: 160, backgroundColor: 'rgb(140, 68, 180, 0.5)' }} onClick={handleLogout}>
                    <h4 className='flex-grow-1 text-white'>Logout</h4>
                </Button>
            </div>
        </div>
    );
}

const PatientHeader = () => {
    const history = useHistory();
    const location = useLocation();
    
    const admin = useEndoscopyState();
    const dispatch = useEndoscopyDispatch();

    // triggers the upload file dialog on clicking upload button
    const triggerUpload = () => {
        document.getElementById('upload-scan-header').click();
    }

    const handlePatientClose = async() => {
        try {
            await closePatient(dispatch);
            history.push('/search');    
        } catch (error) {
            
        }
    }

    const uploadScan = async() => {
        try {
            let file =  document.getElementById('upload-scan-header');
            let formData = new FormData();
            formData.append('file', file.files.item(0));
            let payload = {
                file: formData,
                hospitalNum: localStorage.getItem('hospital_no'),
                scanName: file.files.item(0).name,
                scanTime: '12:00:00'
            }
            let response = await uploadPatientScan(dispatch, payload);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='d-flex flex-md-row m-0 flex-column justify-content-center'>
            <div className='w-100 h-100'>
                <img src={maheLogo} alt='MAHE Logo' className='h-100 p-10 m-5' />
            </div>
            <div className='col-xs-12 col text-center pt-md-10 ml-md-10 text-md-left'>
                <h2 className='font-weight-bold'>{ admin.patientName ? admin.patientName : 'CREATE PATIENT' }</h2>
                <h4 className='font-weight-bold manipal'>{ admin.hospitalNum ? admin.hospitalNum : '' }</h4>
            </div>
            <div className='w-md-250 w-full justify-content-center d-flex mr-20 extra-padding'>
                {
                location.pathname === '/patient/scans' 
                ? 
                <Button className='h-50 w-150 d-flex align-items-center dark-colour-button pt-10 mr-10' id='upload' style={{ borderRadius: 10 }} onClick={triggerUpload}>
                    <input type='file' style={{ display: 'none' }} id='upload-scan-header' onChange={uploadScan}></input>
                    <span><Upload size={30}/></span>
                    <h5 className='ml-5'>Upload</h5>
                </Button>
                : 
                <>
                </>
                }
                <Button className='h-50 w-50 dark-colour-button m-auto' style={{ borderRadius: '50%' }} onClick={() => history.goBack()}>
                    <ArrowLeft className='d-block pr-5' style={{ width:'3rem', height: '3rem' }}/>
                </Button>
                <Button className='h-50 w-50 mx-10 dark-colour-button m-auto' style={{borderRadius: '50%'}} onClick={handlePatientClose}>
                    <X size={40} className='d-block pr-5' style={{ width:'3rem', height: '3rem' }}/>  
                </Button>
            </div>
        </div>
    );
}

export { 
    LandingHeader, 
    PatientHeader 
};