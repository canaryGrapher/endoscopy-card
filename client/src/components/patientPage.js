import { React, useEffect, useState } from 'react';
import ButtonTab from './buttonTab';
import { PatientHeader } from './header';
import { useLocation } from 'react-router-dom';
import Recommendation from './recommendation';
import Scans from './scans';
import Reports from './reports';
import Details from './details';

// patient page after authentication
const PatientPage = () => {
    const location = useLocation();
    const [component, setComponent] = useState({
        details: false,
        scans: false,
        reports: false,
        recomm: false
    });
    
    useEffect(() => {
        if(location.pathname.split('/')[2].toLowerCase() === 'details') {
            setComponent({ ...component, details: true });
        } else if(location.pathname.split('/')[2].toLowerCase() === 'reports') {
            setComponent({ ...component, reports: true });
        } else if(location.pathname.split('/')[2].toLowerCase() === 'scans') {
            setComponent({ ...component, scans: true });
        } else if(location.pathname.split('/')[2].toLowerCase() === 'recommendations') {
            setComponent({ ...component, recomm: true });
        }
    }, []);

    return(
        <div>
            <PatientHeader />
            <ButtonTab />
            {component.details && <Details />}
            {component.scans && <Scans />}
            {component.reports && <Reports />}
            {component.recomm && <Recommendation />}
        </div>
    );
}

export default PatientPage;