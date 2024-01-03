import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'primereact/button';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useSelector} from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DropdownItem {
  id: string;
  value: string;
  type: string;
}

interface Dropdown {
  id: string;
  dropdown: string;
  list: DropdownItem[];
}

interface DropdownResponse {
  message: {
    code: string;
    description: string;
  };
  data: Dropdown[];
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  mrNumber: string;
  email: string;
  deviceId: string;
}

const PatientCreation: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<Dropdown[]>([]);
  const { organization } = useSelector((state: any) => state.Login);
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState<any>({
    gender: [],
    country: [],
  });

  const [formValues, setFormValues] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    ssn: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    mrNumber: '',
    email: '',
    deviceId: ''
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch('http://47.32.254.89:7000/api/dropdowns/get-all');
        const data: DropdownResponse = await response.json();
        if (data && data.message && data.message.code === 'MHC - 0200') {
          setDropdownData(data.data);
          console.log('Fetched data:', data.data);
        } else {
          console.error('Error fetching dropdown data:', data.message.description);
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSaveClick = async () => {
    console.log("Organization:", organization);
    const requestBody = {
        id: "",
        active: "",
        resource: [
          {
            fullUrl: "",
            resourceType: ""
          }
        ],
        basicDetails: [
          {
            coding: [
              {
                system: "",
                code: "",
                display: ""
              }
            ],
            name: [
              {
                use: formValues.middleName,
              given: formValues.firstName,
              family: formValues.lastName,
              }
            ],
            gender: selectedValues.gender[0] || '',
          birthDate: formValues.birthDate,
          mrNumber: formValues.mrNumber,
          ssn:formValues.ssn,
            profile: "",
            licenseId: "",
            confirmEmail: "",
            get_birthDate: [
              {
                extension: [
                  {
                    url: ""
                  }
                ]
              }
            ],
            maritalStatus: "",
            sexualOrientation: ""
          }
        ],
        email: formValues.email,
        organization,
        contact: [
          {
            address: [
              {
                addressLine1: formValues.addressLine1,
              addressLine2: formValues.addressLine2,
              city: formValues.city,
              state: formValues.state,
              postalCode: formValues.postalCode,
              country: selectedValues.country[0] || ''
              }
            ],
            motherName: "",
            firstName: "",
            lastName: "",
            homePhone: "",
            workPhone: "",
            mobilePhone: "",
            contactEmail: "",
            trustedEmail: "",
            emergency: [
              {
                relationShip: "",
                emergencyContact: "",
                emergencyPhone: ""
              }
            ],
            additionalAddress: [
              {
                addressUse: "",
                addressType: "",
                startDate: "",
                endDate: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                district: "",
                state: "",
                postalCodeNumber: "",
                country: ""
              }
            ]
          }
        ],
        userType: "",
        employer: [
          {
            occupation: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            unassignedUSA: "",
            industry: "",
            addressLine1: "",
            addressLine2: ""
          }
        ],
        guardian: [
          {
            name: "",
            relationship: "",
            gender: "",
            address: [
              {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                country: ""
              }
            ],
            workPhone: "",
            email: ""
          }
        ],
        misc: [
          {
            dateDeceased: "",
            reason: ""
          }
        ],
        stats: [
          {
            languageDeclined: true,
            ethnicityDeclined: true,
            raceDeclined: true,
            language: "",
            ethnicity: "",
            race: "",
            familySize: 0,
            financialReviewDate: "",
            monthlyIncome: "",
            homeless: "",
            interpreter: "",
            migrant: "",
            referralSource: "",
            religion: "",
            vfc: ""
          }
        ],
        insurance: [
          {
            primary: [
              {
                planName: "",
                subscriber: "",
                effectivedate: "",
                relationship: "",
                policyNumber: "",
                birthDate: "",
                groupNumber: "",
                ss: "",
                subscriberEmployee: "",
                subscriberPhone: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                gender: "",
                subscriberAddress: [
                  {
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    country: "",
                    zipCode: ""
                  }
                ],
                co_pay: "",
                acceptAssignment: "",
                title: "",
                seaddress: ""
              }
            ],
            secondary: [
              {
                insuranceDetails: {
                  planName: "",
                  subscriber: "",
                  effectivedate: "",
                  relationship: "",
                  policyNumber: "",
                  birthDate: "",
                  groupNumber: "",
                  ss: "",
                  subscriberEmployee: "",
                  subscriberPhone: "",
                  city: "",
                  state: "",
                  country: "",
                  zipCode: "",
                  gender: "",
                  subscriberAddress: [
                    {
                      addressLine1: "",
                      addressLine2: "",
                      city: "",
                      state: "",
                      country: "",
                      zipCode: ""
                    }
                  ],
                  co_pay: "",
                  acceptAssignment: "",
                  title: "",
                  seaddress: ""
                }
              }
            ]
          }
        ],
        familyHealth: [
          {
            id: "",
            name: "",
            deceadsed: "",
            diabetes: "",
            disease: "",
            stroke: "",
            mentalIllness: "",
            cancer: "",
            unknown: "",
            other: ""
          }
        ],
        socialHistory: [
          {
            smoker: "",
            smokePerDay: 0,
            everSmoked: "",
            smokeYears: 0,
            quitYear: 0,
            quitIntrest: "",
            drinkAlcohal: "",
            recreationalDrugs: "",
            pastAlcohal: "",
            tabaccoUse: "",
            usingTime: 0,
            partner: "",
            sexInfection: "",
            caffine: "",
            migrantOrSeasonal: "",
            usePerDay: 0,
            occupation: "",
            maritalStatus: "",
            child: "",
            noOfChild: 0,
            childAge: [
              ""
            ],
            sexActive: ""
          }
        ],
        primaryCarePhysician: [
          {
            id: "",
            primaryCarePhysician: "",
            phoneNo: "",
            medicalClinicName: "",
            fax: "",
            clinicAddress: "",
            notifyprimaryCarePhysician: true,
            patientSignature: "",
            psDateTime: "",
            guardianSignature: "",
            gsDateTime: "",
            releaseOfInformation: "",
            informationDateTime: "",
            faxed: ""
          }
        ],
        deviceId: "",
        devices: [
          {
            id: "",
            deviceId: "",
            companyName: "",
            brandName: "",
            gmdnPTName: "",
            snomedCTName: "",
            dateTime: "",
            batch: "",
            serialNumber: "",
            identificationCode: true,
            mriSaftyStatus: "",
            containsNRL: true,
            status: ""
          }
        ],
        password: "",
        username: ""
      
    };
    try {
      const response = await axios.post('http://47.32.254.89:7000/api/patient/register', requestBody);
      console.log('API response:', response.data);
      console.log('Request : ', requestBody)
      if (response.data.message && response.data.message.code === 'MHC - 0200') {
        toast.success(response.data.message.description)
        navigate('/patient-table');
      } else {
        console.log('Request : ', requestBody)
        console.log('Error Registering:',response.data.message)
        toast.warning(`Error: ${response.data.message.description}`);

    }
  }catch (error) {
      // console.log('Request : ', requestBody)
      // console.error('Error:', error);
      console.log(requestBody)
    }
  };

  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    gender: false,
    country: false,
  });

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, dropdownName: string) => {
    setSelectedValues({ ...selectedValues, [dropdownName]: e.target.value as string[] });
    setOpenState({ ...openState, [dropdownName]: false });
  };

  const handleClose = (dropdownName: string) => {
    setOpenState({ ...openState, [dropdownName]: false });
  };

  const handleOpen = (dropdownName: string) => {
    setOpenState({ ...openState, [dropdownName]: true });
  };

  const renderDropdown = (dropdownName: string) => {
    const dropdown = dropdownData.find((item) => item.dropdown === dropdownName);

    if (!dropdown) {
      return null;
    }

    return (
      <FormControl sx={{ marginLeft: '3px', width: 315 }} key={dropdownName}>
        <InputLabel id={`demo-simple-name-label-${dropdownName}`}>{dropdownName}</InputLabel>
        <Select
          labelId={`demo-simple-name-label-${dropdownName}`}
          id={`demo-simple-name-${dropdownName}`}
          value={selectedValues[dropdownName]}
          onChange={(e: any) => handleSelectChange(e, dropdownName)}
          onClose={() => setOpenState({ ...openState, [dropdownName]: false })}
          onOpen={() => setOpenState({ ...openState, [dropdownName]: true })}
          open={openState[dropdownName]}
          input={<OutlinedInput label={dropdownName} />}
        >
          {dropdown.list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div style={{ width: '100vw', marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className='mb-10'>Patient Details</h2>

        <div className="row w-100 ">
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-1" label="First Name" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })} />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-2" label="Middle Name" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, middleName: e.target.value })} />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-3" label="Last Name" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })} />
          </div>
        </div>

        <div className="row w-100">
          <div className='col-md-6 mb-2'>
            {renderDropdown('gender')}
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Date of Birth" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, birthDate: e.target.value })} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="SSN" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, ssn: e.target.value })} />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="MrNumber" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, mrNumber: e.target.value })} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-1" label="Address Line 1" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, addressLine1: e.target.value })} />
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="Address Line 2" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, addressLine2: e.target.value })} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-1" label="City" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, city: e.target.value })} />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-2" label="State/Provide" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, state: e.target.value })} />
          </div>
          <div className='col-md-4 mb-2'>
            <TextField id="outlined-basic-3" label="Zip/Postal Code" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-6 mb-2'>
            {renderDropdown('country')}
          </div>
          <div className='col-md-6 mb-2'>
            <TextField id="outlined-basic-2" label="DeviceId" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, deviceId: e.target.value })} />
          </div>
        </div>

        <div className="row w-100 ">
          <div className='col-md-12 mb-2'>
            <TextField id="outlined-basic-1" label="Email" variant="outlined" fullWidth onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
          </div>
        </div>

        <div className="card d-flex flex-row gap-3 mt-2">
          <Button label="Cancel" onClick={() => { navigate('/patient-table') }} severity="secondary" style={{ color: '#000', backgroundColor: '#fff', border: '2px solid #0f3995' }} />
          <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSaveClick} />
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default PatientCreation;