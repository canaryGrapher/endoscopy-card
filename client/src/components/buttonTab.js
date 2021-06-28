import React from 'react';
import './../App.css';
import { Button } from 'reacthalfmoon';
import { useHistory } from 'react-router-dom';

const ButtonTab = () => {

    const history = useHistory();

    return(
        <div className='mt-10 d-flex flex-column flex-md-row justify-content-center align-items-center mt-20'>
            <Button className='h-50 w-200 font-size-18 button-tab-button' id='detail-button' onClick={() => history.push('/patient/details')}>
                Details
            </Button>
            <Button className='h-50 w-200 font-size-18 button-tab-button' id='report-button' onClick={() => history.push('/patient/reports')}>
                Reports
            </Button>
            <Button className='h-50 w-200 font-size-18 button-tab-button' id='scan-button' onClick={() => history.push('/patient/scans')}>
                Scans
            </Button>
            <Button className='h-50 w-200 font-size-18 button-tab-button' id='recomm-button' onClick={() => history.push('/patient/recommendations')}>
                Recommendations
            </Button>
        </div>
    );
}

export default ButtonTab;