import React, { useEffect, useState } from 'react';
import { Button } from 'reacthalfmoon';
import './../App.css';
import { LandingHeader } from './header';
import { getAllPatients, useEndoscopyDispatch, useEndoscopyState } from './../context';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {

    const [patientList, setPatientList] = useState([]);
    const [searchOrGo, setSearchOrGo] = useState(false);
    const [finalList, setFinalList] = useState([]);

    const dispatch = useEndoscopyDispatch();

    const history = useHistory();

    useEffect(async () => {
        try {
            let response = await getAllPatients(dispatch);
            let pObj = {
                name: '',
                num: ''
            }
            response.map((patient) => {
                pObj = {
                    name: patient.name,
                    num: patient.hospitalNo
                }
                patientList.push(pObj);
            })
        } catch (error) {
            
        }
    })

    const clearList = () => {
        setFinalList([]);
    }

    const searchDatabase = (e) => {

        if(searchOrGo){
            return history.push('/patient/details');
        }

        clearList();
        let searchText = e.target.value.toLowerCase();
        for(let i = 0; i < patientList.length; i++){
            if(searchText === '')
                clearList();
            else if(patientList[i].name.substr(0, searchText.length).toLowerCase() === searchText){
                let tempNumList = []; 
                finalList.map((f) => {
                    tempNumList.push(f.num);
                });
                if(!tempNumList.includes(patientList[i].num))
                    setFinalList([...finalList, patientList[i]])
            }
        }
    }

    const insertData = (index) => {
        const searchBox = document.getElementById('search-box');
        searchBox.value = finalList[index].name;
        clearList();
        setSearchOrGo(true);
        localStorage.setItem('patient_name', finalList[index].name);
        localStorage.setItem('hospital_no', finalList[index].num);
        dispatch({ type: 'SEARCH_SUCCESS' });
    }

    return (
        <div className='d-flex flex-column' style={{ height:'100vh', width: '100vw', overflowX: 'hidden' }}>
            <LandingHeader />
            <div className='d-flex flex-row align-items-center justify-content-center'>
                <div className='input-group d-flex flex-md-row flex-column extra-margin'>
                    <input type='search' id='search-box' autoComplete='off' className='form-control form-control-lg w-md-500 w-350 my-20 my-md-0 p-20 border-md-right-0 rounded' placeholder='Enter patient name' onInput={searchDatabase}/>
                    <div className='input-group-append d-flex flex-row'>
                        <Button className='border-0' style={{ backgroundColor: '#8c44b4', height: 56, borderRadius: 10, width: 200, }} onClick={searchDatabase}>
                            <p className='text-white align-center'>{searchOrGo ? 'Go' : 'Search'}</p>
                        </Button>
                    </div>
                    <div className='h-auto w-full search-list'>
                        {
                            finalList.slice(0, 5).map((patient, index) => {
                                return (
                                    <div className='search-item d-flex flex-row justify-content-start shadow-lg w-full h-50 border border-0 rounded' style={{ marginTop: '1px' }} onClick={() => insertData(index)}>
                                        <div className='w-half px-20 text-bold font-size-20'>
                                            {patient.name}
                                        </div>
                                        <div className='w-half text-right px-20 text-muted'>
                                            {patient.num}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;