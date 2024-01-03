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
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Staff = () => {
  const [dropdownData, setDropdownData] = useState<Dropdown[]>([]);
  const { organization } = useSelector(
    (state: any) => state.Login
  );
  const navigate = useNavigate()
  const [selectedValues, setSelectedValues] = useState<any>({
    gender: [],
    country: [],
    roles: [],
    speciality: [],
  });

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateofBirth:'',
    ssn:'',
    npi:'',
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    postalCode:'',
    phoneNumber:'',
    email:'',
    startDate:''
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch('http://47.32.254.89:7000/api/dropdowns/get-all');
        const data: DropdownResponse = await response.json();
        if (data && data.message && data.message.code === 'MHC - 0200') {
          setDropdownData(data.data);
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
    console.log(organization)
    // Construct the request body using form data and selected values
    const requestBody = {
        id:'',
      resource: [
        // Add resource details
      ],
      name: [
        {
          use: formData.middleName,
          given: formData.firstName,
          family: formData.lastName,
        },
      ],
      gender: selectedValues.gender[0] || '', // Assuming gender is a single selection
      email: formData.email,
      role: selectedValues.roles[0] || '',
      organization,
      startDate: formData.startDate,
      speciality:[
        selectedValues.speciality[0] || ''
      ],
      dateofBirth:formData.dateofBirth,
      ssn:formData.ssn,
      npi:formData.npi,
      contact:[
        {
            address:[{
                addressLine1:formData.addressLine1,
                addressLine2:formData.addressLine2,
                city:formData.city,
                country:selectedValues.country[0] || '',
                state:formData.state,
                zip:formData.postalCode
        }],
        mobilePhone:formData.phoneNumber
        }
      ]
    };

    try {
      const response = await axios.post('http://47.32.254.89:7000/api/staff/register', requestBody)
        // if(response.data.)
      // const responseData = await response.json();
      console.log('Save response:', response);
      if (response.data.message.code === 'MHC - 0200') navigate(-1)
      // Handle success or display error to the user
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error and display a message to the user
    }
  };

  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    gender: false,
    country: false,
    roles: false,
    speciality: false,
  });

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, dropdownName: string) => {
    setSelectedValues({ ...selectedValues, [dropdownName]: e.target.value as string[] });
    setOpenState({ ...openState, [dropdownName]: false }); // Close the dropdown after selecting
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
          multiple
          value={selectedValues[dropdownName]}
          onChange={(e:any) => handleSelectChange(e, dropdownName)}
          onClose={() => setOpenState({ ...openState, [dropdownName]: false })}
          onOpen={() => setOpenState({ ...openState, [dropdownName]: true })}
          open={openState[dropdownName]}
        //   onChange={(e) => setSelectedValues({ ...selectedValues, [dropdownName]: e.target.value as string[] })}
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
    <div style={{width: '100vw',marginTop:'30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{width:'50vw',height:'100vh', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <h4 className='mb-2'>Staff Details</h4>
    
      <div className="row w-100 ">
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-1" label="First Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
        </div>
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-2" label="Middle Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}/>
        </div>
        <div className='col-md-4 mb-2'>
          <TextField id="outlined-basic-3" label="Last Name" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
        </div>
      </div>

    <div className="row w-100">
    <div className='col-md-6 mb-2'>
          {renderDropdown('gender')}
        </div> 
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-2" label="Date of Birth" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, dateofBirth: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-1" label="SSN" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}/>
    </div>
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-2" label="NPI#" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, npi: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-1" label="Address Line 1" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}/>
    </div>
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-2" label="Address Line 2" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
      <div className='col-md-4 mb-2'>
        <TextField id="outlined-basic-1" label="City" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
      </div>
      <div className='col-md-4 mb-2'>
        <TextField id="outlined-basic-2" label="State/Provide" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, state: e.target.value })}/>
      </div>
      <div className='col-md-4 mb-2'>
        <TextField id="outlined-basic-3" label="Zip/Postal Code" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}/>
      </div>
    </div>

    <div className="row w-100 ">
    <div className='col-md-6 mb-2'>
          {renderDropdown('country')}
        </div>
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-2" label="Phone Number" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}/>
    </div>    
  </div>

  <div className="row w-100 ">
    <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-1" label="Email" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
    </div>
    <div className='col-md-6 mb-2'>
          {renderDropdown('roles')}
        </div>    
  </div>

  <div className="row w-100 ">
  <div className='col-md-6 mb-2'>
      <TextField id="outlined-basic-1" label="Start Date" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}/>
    </div>
        <div className='col-md-6 mb-2'>
          {renderDropdown('speciality')}
        </div>    
  </div>

<div className="card d-flex flex-row gap-3 mt-2">
            <Button label="Cancel"  onClick={() => { navigate(-1) }} severity="secondary" style={{color:'#000',backgroundColor:'#fff', border:'2px solid #0f3995'}}/>
            <Button label="Save" style={{ backgroundColor: '#0f3995' }} onClick={handleSaveClick} />
        </div>
        </div>
</div>
)
}

export default Staff;
