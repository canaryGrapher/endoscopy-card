import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signIn, useEndoscopyDispatch, useEndoscopyState } from './../context';
import './../App.css';
import { Button } from 'reacthalfmoon';
import maheLogo from './../assets/maheLogo.png';

const SignIn = () => {

    const [data, setData] = useState({ email: '', password: '' });

    const history = useHistory();
    const admin = useEndoscopyState();
    const dispatch = useEndoscopyDispatch();

    const handleSignIn = async (e) => {
        e.preventDefault();
        let payload = {
            email: data.email,
            token: data.password
        };
        try {
            let response = await signIn(dispatch, payload);
            if(response.token) {
                history.push('/search');
            } else if (Boolean(response.data.errors)) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(admin.token) {
            history.push('/search');
        }
    }, []);

    return(
        <div className='page-wrapper'>
            <div className='d-flex flex-md-row m-0 flex-column justify-content-center'>
                <div className='w-100 h-100'>
                    <img src={maheLogo} alt='MAHE Logo' className='h-100 p-10 m-5' />
                </div>
                <div className='col-xs-12 col text-center pt-md-10 ml-md-10 text-md-left'>
                    <h2 className='font-weight-bolder'>KASTURBA MEDICAL COLLEGE</h2>
                    <h4 className='font-weight-bold manipal'>Manipal</h4>
                </div>
            </div>
            <div className='content-wrapper'>
                <form className='w-half d-flex flex-column jusify-content-center align-items-center my-form'>
                    <div className='bg-dark w-200' style={{ height: 1, marginTop: 30 }}></div>
                    <h3 className='pb-10' style={{ borderBottom: '1px solid black' }}>
                        ADMIN LOGIN
                    </h3>
                    <div className='form-group'>
                        <label for='full-name' className='required'>Email ID</label>
                        <input type='email' id='email-input' autoComplete='off' className='form-control w-md-250 w-full' placeholder='Email ID' required='required' onChange={(e) => { data.email = e.target.value; }}/>
                    </div>
                    <div className='form-group'>
                        <label for='full-name' className='required'>Password</label>
                        <input type='password' id='password-input' autoComplete='off' className='form-control w-md-250 w-full' placeholder='Password' required='required' onChange={(e) => { data.password = e.target.value; }}/>
                    </div>
                    <Button onClick={handleSignIn}>
                        Sign In
                    </Button>
                </form>                
            </div>
        </div>
    );
}

export default SignIn;