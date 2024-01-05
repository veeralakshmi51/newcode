import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "react-bootstrap";
import "./staff.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff, deleteStaffDetails } from "../../slices/thunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// interface FormData {
//   firstName: string;
//   middleName: string ;
//   lastName:  string;
//   birthofBirth: string;
//   ssn: string;
//   npi:string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   mrNumber: string;
//   email: string;
//   deviceId: string;
//   gender: string;
//   country: string;
//   role:string;
//   speciality:string;
//   startDate:string;
// }

const Staff: React.FC = () => {
  //const [selectsStaffId,setSelectStaffId]=useState<string|null>(null)
  const dispatch = useDispatch<any>();
  const { staffData } = useSelector((state: any) => state.Staff);
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllStaff(dispatch);
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaffData = staffData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(staffData.length / itemsPerPage);

    // Define the number of page numbers to show
    const pageNumbersToShow = Math.min(5, totalPages);

    let startPage: any;
    let endPage: any;

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

  const handleDelete = async (username: string) => {
    const confirmDelete = window.confirm("Are You Sure Do You Want To Delete?");
    if (confirmDelete) {
      try {
        await dispatch(deleteStaffDetails(username));
        toast.success("Staff Details deleted successfully");
      } catch (error) {
        toast.error("Failed to delete organization");
      }
    }
  };
  return (
    <div className="main">
      <div className="table-container">
        <div className="heading1">
          <h4>All Staff List</h4>
          <div className="mx-2">
            <FaPlus
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/staff-register")}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              {/* <th scope="col">Staff ID</th> */}
              <th scope="col">Staff Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">SSN</th>
              <th scope="col">Job Title</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
              {/* <th scope="col">Start Date</th> */}
            </tr>
          </thead>
          <tbody>
            {currentStaffData.map((staff: any) => (
              <tr key={staff.id}>
                {/* <td>{staff.id}</td> */}
                <td>
                  {staff.name[0].given} {staff.name[0].family}
                </td>
                <td>{staff.dateofBirth}</td>
                <td>{staff.ssn}</td>
                <td>{staff.userType}</td>
                <td>{staff.role}</td>

                <td className="text-center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={() => handleDelete(staff.username)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {renderPageNumbers()}

          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(staffData.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Staff;
