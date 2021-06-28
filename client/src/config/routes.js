// routes for the application

import LandingPage from './../components/landingPage';
import PatientPage from '../components/patientPage';
import SignIn from '../components/signIn';

const routes = [  
  {
    path:'/patient/details',
    component: PatientPage,
    isPrivate: true
  },
  {
    path:'/patient/reports',
    component: PatientPage,
    isPrivate: true
  },
  {
    path:'/patient/scans',
    component: PatientPage,
    isPrivate: true
  },
  {
    path:'/patient/recommendations',
    component: PatientPage,
    isPrivate: true
  },
  {
    path:'/search',
    component: LandingPage,
    isPrivate: true
  },
  {
    path:'/',
    component: SignIn,
    isPrivate: false
  },
]
 
export default routes;