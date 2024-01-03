import { Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Q15StaffConfiguration from '../pages/staffConfiguration'
import AccessControl from '../pages/accesscontrol'
import SecretKey from '../pages/secretkey'
import Organization from '../pages/organizationDetails'
import Staff from '../pages/Staff/intex'
import StaffCreation from '../pages/Staff/staffCreation'
import PatientCreation from '../pages/Patient/patientCreation'
import Patient from '../pages/Patient/intex'
import Beacon from '../pages/beaconDevices'
import OrganizationForm from '../pages/organizationDetails/Form';

const SuperAdminRoutes = [

  { path: '/dashboard', component: <Dashboard /> },
  { path: '/access-control', component: <AccessControl /> },
  { path: '/organization-details', component: <Organization /> },
  {path:'/organization-form',component:<OrganizationForm/>},

];

const AdminRoutes = [
  // { path: '/dashboard', component: <Dashboard />},
  { path: '/q15-staff-configuration', component: <Q15StaffConfiguration /> },
  { path: '/patient-table', component: <Patient />},
  { path: '/staff-table', component: <Staff /> },
  { path: '/Beacon-register', component: <Beacon/>},
  { path: '/staff-register', component: <StaffCreation/>},
  { path: '/patient-register', component: <PatientCreation/>}
];

const publicRoutes = [
  { path: '/', exact: true, component: <Navigate to="/login" /> },
  {path: '/login', component: <Login />},
  {path: '/secret-key', component: <SecretKey />}
]

// const defaultRoute = { path: '*', element: <Navigate to="/login" /> };

export { AdminRoutes, SuperAdminRoutes, publicRoutes }
