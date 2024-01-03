import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrganizationDetails, updateOrganizationDetails,deleteOrganizationDetails } from "../../slices/organizationDetails/thunk";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  organizationName: string;
  email: string;
  mobileNumber: string;
  websiteUrl: string;
  hippaPrivacyOfficer: string;
  id: string;
  organizationType:string;
}

const Organization: React.FC = () => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);

  const dispatch = useDispatch<any>();
  const { organizationDetails } = useSelector((state: any) => state.Organization);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(organizationDetails.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const records = organizationDetails.slice(firstIndex, lastIndex);
  const numbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    email: '',
    mobileNumber: '',
    websiteUrl: "",
    hippaPrivacyOfficer: "",
    id: "",
    organizationType:'',
  });

  useEffect(() => {
    dispatch(getAllOrganizationDetails());
  }, [dispatch]);

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changecurrentpage(page: number) {
    setCurrentPage(page);
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleSaveChanges = () => {
    console.log("Form data:", formData);

    if (!selectedOrganizationId) {
      console.error("Selected organization ID not found");
      return;
    }
    const updatedFields = {
      organizationdetails: [
        {
          name: formData.organizationName,
          type: formData.organizationType
        }
      ],
      email: formData.email,
      websiteUrl: formData.websiteUrl,
      hippaprivacyofficer: [
        {
         name: formData.hippaPrivacyOfficer
        }
        ],
      mobileNumber:formData.mobileNumber,
    };
    console.log("BeforeUpdate:",organizationDetails)
    dispatch(updateOrganizationDetails(selectedOrganizationId, updatedFields));
    console.log("After Upadate",updatedFields)
    setEditModal(false);
  };

  const handleClick = (organization: any) => {
    console.log("Clicked Organization:", organization);
    const organizationDetails = organization.organizationdetails && organization.organizationdetails[0];
    // console.log("Organization Details:", organizationDetails);
  
    if (organization) {
      const organizationId = organization.id || "";
      setSelectedOrganizationId(organizationId);
      console.log('organization',organizationId)
      setFormData({
        organizationName: organizationDetails.name || "",
        email: organization.email || "",
        mobileNumber: organization.mobileNumber || "",
        websiteUrl: organization.websiteUrl || "",
        hippaPrivacyOfficer: organization.hippaprivacyofficer.length > 0 ? organization.hippaprivacyofficer[0]?.name || "" : null,
        id: organizationId || "",
        organizationType:organizationDetails.type || '',

      });
      setEditModal(true);
    } else {
      console.error("Organization details or ID not found:", organization);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleDelete = async (organizationId: string) => {
  const confirmDelete = window.confirm("Are You sure Do You want To Delete?");
  if (confirmDelete) {
      try {
          await dispatch(deleteOrganizationDetails(organizationId));
          toast.success("Organization Details deleted successfully");
      } catch (error) {
          toast.error("Failed to delete organization");
      }
  }
};


  return (
    <div className="container mt-5">
      <ToastContainer/>
      <div className="row">
        <div className="mt-3 col-md-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Organization Details</h2>
            <Link to="/organization-form">
              <button className="btn btn-info">+ </button>
            </Link>
          </div>
          <hr />
          <br />
          <nav className="d-flex justify-content-end">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prevPage}>
                  Prev
                </a>
              </li>
              {numbers.map((num, index) => (
                <li key={index} className="page-item">
                  <a
                    href="#"
                    className={`page-link ${currentPage === num ? "active" : ""}`}
                    onClick={() => changecurrentpage(num)}
                  >
                    {num}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-center">Field</th>
                <th scope="col" className="text-center">Organization Name</th>
                <th scope="col" className="text-center">Organization Type</th>
                <th scope="col" className="text-center">Organization ID</th>
                <th scope="col" className="text-center">Email</th>
                <th scope="col" className="text-center">Mobile Number</th>
                <th scope="col" className="text-center">Website URL</th>
                <th scope="col" className="text-center">Hippa Privacy Officer Name</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((organization: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(organization)}
                    
                  >
                    {organization.organizationdetails?.[0]?.name || ""}
                  </td>
                  <td >
                    {organization.organizationdetails?.[0]?.type || ""}
                  </td>
                  <td >{organization.id || ""}</td>
                  <td >{organization.email || ""}</td>
                  <td >{organization.mobileNumber || ""}</td>
                  <td >{organization.websiteUrl || ""}</td>
                  <td >
                    {organization.hippaprivacyofficer?.length > 0
                      ? organization.hippaprivacyofficer[0]?.name || ""
                      : ""}
                  </td>

                  <td className="text-center">
            <FontAwesomeIcon
                icon={faTrash}
                className="text-danger"
                onClick={() => handleDelete(organization.id)}
                style={{ cursor: "pointer" }}
            />
        </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal isOpen={editModal} toggle={() => setEditModal(false)} centered>
            <ModalHeader toggle={() => setEditModal(false)}>
              Organization Details
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="form-control">
                  <label htmlFor="organizationName" className="floating-label" style={{fontWeight:'bold'}}>
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    placeholder="Enter Organization Name"
                    value={formData.organizationName}
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
                  <label htmlFor="floating-input" className="floating-label" style={{fontWeight:'bold'}}>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
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
        </div>
      </div>
    </div>
  );
};

export default Organization;
