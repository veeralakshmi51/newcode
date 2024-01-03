import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPatient } from '../../slices/thunk';
import { FaPlus } from 'react-icons/fa';
import { Pagination } from 'react-bootstrap';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData{
 
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
  

const Patient:React.FC = () => {

  const dispatch = useDispatch<any>();
  const [editModal, setEditModal] = useState(false);
    const { patientData } = useSelector(
      (state: any) => state.Patient
    );
    const navigate = useNavigate();
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [formData,setFormData]=useState<FormData>({
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
    })
    useEffect(() => {
      getAllPatient(dispatch);
    }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatientData = patientData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(patientData.length / itemsPerPage);

    const pageNumbersToShow = Math.min(5, totalPages);

    let startPage:any;
    let endPage:any;

    if (totalPages <= pageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.ceil(pageNumbersToShow / 2);

      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = pageNumbersToShow;
      } else if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - pageNumbersToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }
    }

    
    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
      <Pagination.Item
        key={startPage + index}
        active={startPage + index === currentPage}
        onClick={() => paginate(startPage + index)}
      >
        {startPage + index}
      </Pagination.Item>
    ));
  };
  const handleSaveChange=()=>{

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="main">
    <div className="table-container">
       <div className="heading1">
         <h4>All patient List</h4>
         <div className="mx-2">
           <FaPlus
            data-bs-target="#exampleModal"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/patient-register')}
          />
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">patient Name</th>
            {/* <th scope="col">patient Name</th> */}
            <th scope="col">Date of Birth</th>
            <th scope="col">SSN</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Beacon Device</th>
          </tr>
        </thead>
        <tbody>
          {currentPatientData.map((patient: any) => (
            <tr key={patient.id}>
              <td>{patient.basicDetails[0].name[0].given} {patient.basicDetails[0].name[0].family}</td>
              <td>{patient.basicDetails[0].birthDate}</td>
              <td>{patient.basicDetails[0].ssn}</td>
              <td>{patient.email}</td>
              <td>{patient.basicDetails[0].gender}</td>
              <td>{patient.beaconDevice}</td>
              {/* <td>{patient.id}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
            <ModalHeader toggle={() => setEditModal(false)}>
              Patient Details
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="form-control">
                  <label htmlFor="firstName" className="floating-label" style={{fontWeight:'bold'}}>
                    FirstName
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor="middleName" className="floating-label" style={{fontWeight:'bold'}}>
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    placeholder="Enter Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                  <label htmlFor="lastName" className="floating-label" style={{fontWeight:'bold'}}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor="floating-input" className="floating-label" style={{fontWeight:'bold'}}>
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="gender" className="floating-label" style={{fontWeight:'bold'}}>
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    placeholder="Enter Gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                  <label htmlFor="floating-input" className="floating-label" style={{fontWeight:'bold'}}>
                    Website URL
                  </label>
                  <input
                    type="text"
                    id="websiteUrl"
                    name="websiteUrl"
                    placeholder="Enter Website URL"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="floating-input"
                    className="floating-label" style={{fontWeight:'bold'}}
                  >
                    Hippa Privacy Officer Name
                  </label>
                  <input
                    type="text"
                    id="hippaPrivacyOfficer"
                    name="hippaPrivacyOfficer"
                    placeholder="Enter Privacy Officer Name"
                    value={formData.hippaPrivacyOfficer}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="info" onClick={handleSaveChanges}>
                Save Changes
              </Button>{" "}
              <Button color="danger" onClick={() => setEditModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
      <Pagination>
         <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {renderPageNumbers()}

        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(patientData.length / itemsPerPage)}
        />
      </Pagination>
    </div>
    </div>
  )
}

export default Patient
