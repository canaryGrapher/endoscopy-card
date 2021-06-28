import { React, useState, useEffect } from 'react';
import './../App.css';
import countryCodes from 'country-codes-list';
import { countryCodeEmoji } from 'country-code-emoji';
import flag from 'country-code-emoji'
import { Button } from 'reacthalfmoon';
import { createPatient, getPatient, useEndoscopyDispatch, useEndoscopyState } from './../context';

const Details = () => {

    const [flags, setFlags] = useState([]);
    const [edit, setEdit] = useState(false);
    const [patient, setPatient] = useState({
        name: '',
        dob: '',
        sex: '',
        mobile: '',
        country: '',
        email: '',
        address: '',
        hospitalNo: ''
    });

    const admin = useEndoscopyState();
    const dispatch = useEndoscopyDispatch();

    useEffect(async() => {
        const myCodes = countryCodes.customList('countryCode');
        setFlags(Object.keys(myCodes).map(countryCodeEmoji));
        for (let [key, value] of Object.entries(myCodes)){
            myCodes[key] = value.slice(0, value.length - 4).trim();
        }
        try {
            if(admin.patientName && admin.hospitalNum){
                let payload = admin.hospitalNum;
                let response = await getPatient(dispatch, payload);                
                document.getElementById('name-input').innerHTML = response.name;
                document.getElementById('dob-input').innerHTML = response.dob.split('-')[2].slice(0, 2) + '/' + response.dob.split('-')[1] + '/' + response.dob.split('-')[0];
                
                // set the sex from the options
                for ( var i = 0; i < document.getElementById('sex-input').options.length; i++ ) {
                    if ( document.getElementById('sex-input').options[i].value.toUpperCase() == response.sex.toUpperCase() ) {
                        document.getElementById('sex-input').options[i].selected = true;
                    }
                }

                // set the country flag
                for (let [key, value] of Object.entries(myCodes)){
                    if(value === response.country){
                        for(var i = 0; i < document.getElementById('code-input').options.length; i++){
                            if(flag(key) === flags[i]){
                                document.getElementById('code-input').options[i+1].selected = true;
                            }
                        }
                    }    
                }

                document.getElementById('number-input').innerHTML = response.mobile;
                document.getElementById('email-input').innerHTML = response.email;
                document.getElementById('address-input').innerHTML = response.address;
                document.getElementById('hospital-input').innerHTML = response.hospitalNo;
            } 
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleCreatePatient = async () => {
        try {
            let payload = patient;
            let response = await createPatient(dispatch, payload);
            if(Boolean(response.data)){    
                if(response.data.errors[0].param === 'patient_name'){
                    document.getElementById('blank-name-error').classList.remove('d-none');
                    document.getElementById('blank-name-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'hospital_no'){
                    document.getElementById('blank-hospital-error').classList.remove('d-none');
                    document.getElementById('blank-hospital-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'mobile_no'){
                    document.getElementById('blank-mobile-error').classList.remove('d-none');
                    document.getElementById('blank-mobile-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'email'){
                    document.getElementById('blank-email-error').classList.remove('d-none');
                    document.getElementById('blank-email-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'date_of_birth'){
                    document.getElementById('blank-dob-error').classList.remove('d-none');
                    document.getElementById('blank-dob-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'address'){
                    document.getElementById('blank-address-error').classList.remove('d-none');
                    document.getElementById('blank-address-error').classList.add('d-block');
                }
                if(response.data.errors[0].param === 'sex'){
                    document.getElementById('blank-sex-error').classList.remove('d-none');
                    document.getElementById('blank-sex-error').classList.add('d-block');
                }
            } else {
                localStorage.setItem('patient_name', patient.patient_name);
                localStorage.setItem('hospital_no', patient.hospital_no);
                toggleEdit();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdatePatient = () => {
        try {
            
        } catch (error) {
            
        }   
    }

    // toggles properties based on edit status
    const toggleEdit = () => {
        if(edit) {
            document.getElementById('name-input').contentEditable = false;
            document.getElementById('dob-input').contentEditable = false;
            document.getElementById('sex-input').disabled = true;
            document.getElementById('code-input').disabled = true;
            document.getElementById('number-input').contentEditable = false;
            document.getElementById('email-input').contentEditable = false;
            document.getElementById('address-input').contentEditable = false;
            document.getElementById('hospital-input').contentEditable = false;
            handleCreatePatient();
        } else {
            document.getElementById('name-input').contentEditable = true;
            document.getElementById('dob-input').contentEditable = true;
            document.getElementById('sex-input').disabled = false;
            document.getElementById('code-input').disabled = false;
            document.getElementById('number-input').contentEditable = true;
            document.getElementById('email-input').contentEditable = true;
            document.getElementById('address-input').contentEditable = true;
            document.getElementById('hospital-input').contentEditable = true;
        }
        setEdit(!edit);
    }

    return(
        <div className='d-flex flex-column align-items-center w-three-quarter mt-10' style={{ height: '48rem' }}>
            <form className='w-full d-flex flex-column'>
                <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
                    <div className='form-group mr-md-5'>
                        <label for='full-name' className='required'>Full name</label>
                        <p type='text' id='name-input' style={{ height: '4rem' }} className='p-10 w-md-550 w-300 border text-muted' onInput={(e) => { patient.patient_name = document.getElementById('name-input').innerHTML; }}/>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-name-error'>
                          Invalid Patient Name
                        </div>
                    </div>
                    <div className='form-group ml-md-5'>
                        <label for='dob' className='required'>DOB</label>
                        <p type='date' id='dob-input' className='p-10 w-md-200 border w-300 text-muted' style={{ height: '4rem' }} onInput={(e) => patient.date_of_birth = document.getElementById('dob-input').innerHTML}/>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-dob-error'>
                          Invalid Date of Birth
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-md-row flex-column justify-content-space-between align-items-center'>
                <div className='form-group mr-md-5 ml-md-5'>
                        <label for='sex' className='required'>Sex</label>
                        <select id='sex-input' className="form-control mt-5 w-300 w-md-150 border rounded-0" style={{ height: '4rem' }} required="required" onChange={() => patient.sex = document.getElementById('sex-input').options[document.getElementById('sex-input').selectedIndex].value.toUpperCase() }>
                          <option value='' selected="selected" disabled="disabled">Sex</option>
                          {
                            ['Male', 'Female', 'Others'].map((flag, index) => {
                                return <option value={flag} key={index}>{flag}</option>;
                            })
                          }
                        </select>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-sex-error'>
                          Invalid Sex of Patient
                        </div>
                    </div>
                    <div className='form-group mr-md-5 ml-md-5'>
                        <label for='code' className='required'>Mobile</label>
                        <select id='code-input' className="form-control mt-5 w-300 w-md-auto border rounded-0" style={{ height: '4rem' }} required="required" onChange={(e) => patient.country = 'India'}>
                          <option value='' selected="selected" disabled="disabled">Code</option>
                          {
                            flags.map((flag, index) => {
                                return <option value={flag} key={index}>{flag}</option>;
                            })
                          }
                        </select>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-country-error'>
                          Invalid Country Code
                        </div>
                    </div>
                    <div className='form-group ml-md-5 mr-md-5 '>
                        <p type='number' id='number-input' style={{ height: '4rem' }} className='w-300 border p-10 text-muted' onChange={(e) => { patient.mobile_no = document.getElementById('number-input').innerHTML; }}/>
                    </div>
                    <div className='form-group ml-md-5'>
                        <label for='email' className='required'>Email</label>
                        <p id='email-input' autoComplete='off' style={{ height: '4rem' }} className='w-300 w-md-200 border p-10 text-muted' onInput={(e) => { patient.email = document.getElementById('email-input').innerHTML; }}/>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-email-error'>
                          Invalid Email
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-md-row flex-column justify-content-space-between align-items-center'>
                    <div className='form-group'>
                        <label for='address' className='required'>Address</label>
                        <p id='address-input' className='h-100 big-text-box border p-10 text-muted' onInput={(e) => { patient.address = document.getElementById('address-input').innerHTML; }}></p>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-address-error'>
                          Invalid Address
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-md-row flex-column justify-content-space-between align-items-center'>
                    <div className='form-group ml-md-5'>
                        <label for='hosp' className='required'>Hospital Number</label>
                        <p id='hospital-input' className='big-text-box border p-10 text-muted' style={{ height: '4rem' }} placeholder='Hospital Number' required='required' onInput={(e) => { patient.hospital_no = document.getElementById('hospital-input').innerHTML; }}/>
                        <div className='invalid-feedback text-left d-none text-muted' id='blank-hospital-error'>
                          Invalid Hospital Number
                        </div>
                    </div>
                </div>
            </form>
            <div className='pb-20'>
                <Button className='w-150 h-50 font-size-18 font-weight-bold colour-button' onClick={toggleEdit}>{edit ? "SAVE" : "EDIT"}</Button>
            </div>
        </div>
    );
}

export default Details;