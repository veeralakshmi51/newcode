// import React, { useEffect, useState} from "react";
// import { FormGroup } from "reactstrap";
// import './form.css'
// import axios from "axios";

// interface FormData {
//   organizationName: string;
//   organizationType: string;
//   mobileNumber: string;
//   email: string;
//   websiteUrl: string;
//   hippaPrivacyOfficerName: string;
  
// }
// interface OrganizationType{
//   id:string;
//   value:string;
//   type:string
// }
// const OrganizationForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);

//   const [organizationType,setOrganizationType]=useState<OrganizationType[]>([]);
//   const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     organizationName: "",
//     organizationType: "",
//     mobileNumber: '',
//     email: '',
//     websiteUrl: '',
//     hippaPrivacyOfficerName:''
//   });
//   useEffect(() => {
//     const fetchOrganizationTypes = async () => {
//       try {
//         const response = await axios.get('http://47.32.254.89:7000/api/dropdowns/getByDropdown?dropdown=Organization%20Type');
//         setOrganizationType(response.data.data[0]?.list || []); 
//         console.log('fetched data:',response.data);
//       } catch (error) {
//         console.error('Error fetching organization types:', error);
//         setError('Error fetching organization types. Please try again.');
//       }
//     };
//     fetchOrganizationTypes();
//   }, []);
  
//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://47.32.254.89:7000/api/org/register', {
//         organizationdetails: [
//           {
//             name: formData.organizationName,
//             type: formData.organizationType,
//           },
//         ],
//         // contact: [
//         //   {
//         //     addressLine1: '', 
//         //     addressLine2: '',
//         //     city: '',
//         //     state: '',
//         //     country: '',
//         //     zip: 0,
//         //   },
//         // ],
//         email: formData.email,
//         mobileNumber: formData.mobileNumber,
//         websiteUrl: formData.websiteUrl,
//         hippaprivacyofficer: [
//           {
//             name: formData.hippaPrivacyOfficerName,
//             // email: '',
//             // mobile: '',
//           },
//         ],
//       });

//       if (response.status === 200) {
//         console.log('Registration Data', response.data);
//         setRegistrationStatus(response.data.message.description);
//       } else {
//         console.error('Error registering:', response.data.message);
//         setRegistrationStatus(`Error: ${response.data.message.description}`);

//       }
//     } catch (error) {
//       console.error('Error registering:', error);
//       setRegistrationStatus("An error occurred during registration.");

//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100">
//       <div className="row">
//         <div className="container col-md-12">
//         <h1 className="mt-1">Details</h1>
//         <hr></hr>
//         <FormGroup>
//         <form onSubmit={handleSubmit}>
//           <div className="mt-2">
//             <label htmlFor="organizationName" className="label">Organization Name</label>
//             <input
//               type="text"
//               id="organizationName"
//               name="organizationName"
//               value={formData.organizationName}
//               onChange={(e)=>handleInputChange('organizationName',e.target.value)}
//               placeholder="OrganizationName"
//             />
//           </div>

//           <div className="mt-2">
//   <label htmlFor="organizationType" className="label">Organization Type</label>
//   <select
//     id="organizationType"
//     name="organizationType"
//     value={formData.organizationType}
//     onChange={(e) => handleInputChange('organizationType', e.target.value)}
//     className="form-control"
//   >
//     <option value="" disabled>Select Organization Type</option>
//     {organizationType.length > 0 && organizationType.map((type) => (
//       <option key={type.id} value={type.value}>
//         {type.value}
//       </option>
//     ))}
//   </select>
// </div>

//           <div className="mt-2">
//             <label htmlFor="email" className="label">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={(e)=>handleInputChange('email',e.target.value)}
//               placeholder="Email"
//             />
//           </div>
//           <div className="mt-2">
//             <label htmlFor="email" className="label">Mobile Number</label>
//             <input
//               type="text"
//               id="mobileNumber"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={(e)=>handleInputChange('mobileNumber',e.target.value)}
//               placeholder="Mobile Number"
//             />
//           </div>
//           <div className="mt-2">
//             <label htmlFor="websiteUrl" className="label">Website URL</label>
//             <input
//               type="text"
//               id="websiteUrl"
//               name="websiteUrl"
//               value={formData.websiteUrl}
//               onChange={(e)=>handleInputChange('websiteUrl',e.target.value)}
//               placeholder="Website URL"
//             />
//           </div>
         
//           <div className="mt-2">
//             <label htmlFor="websiteURL" className="label">HIPPA Privacy Officer Name</label>
//             <input
//               type="text"
//               id="privacyOfficerName"
//               name="privacyOfficerName"
//               value={formData.hippaPrivacyOfficerName}
//               onChange={(e)=>handleInputChange('hippaPrivacyOfficerName',e.target.value)}
//               placeholder="HIPPA Privacy Officer Name"
//             />
//           </div>
//           <div className="mt-2">
//             <button className="btn btn-success" >Submit</button>
//           </div>
//           {registrationStatus && <p style={{ color:'green' }}>{registrationStatus}</p>}
//           {error && <p style={{ color: 'red' }}>{error}</p>}

//         </form>
        
        
//         </FormGroup>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizationForm;


import React, { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import "./form.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  organizationName: string;
  organizationType: string;
  organizationId: string;
  mobileNumber: string;
  email: string;
  websiteUrl: string;
  hippaPrivacyOfficerName: string;
}
interface OrganizationType {
  id: string;
  value: string;
  type: string;
}
const OrganizationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const [organizationType, setOrganizationType] = useState<OrganizationType[]>(
    []
  );
 
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    organizationType: "",
    organizationId:'',
    mobileNumber: "",
    email: "",
    websiteUrl: "",
    hippaPrivacyOfficerName: "",
  });
  useEffect(() => {
    const fetchOrganizationTypes = async () => {
      try {
        const response = await axios.get(
          "http://47.32.254.89:7000/api/dropdowns/getByDropdown?dropdown=Organization%20Type"
        );
        setOrganizationType(response.data.data[0]?.list || []);
        console.log("fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching organization types:", error);
        setError("Error fetching organization types. Please try again.");
      }
    };
    fetchOrganizationTypes();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://47.32.254.89:7000/api/org/register",
        {
          organizationdetails: [
            {
              id:formData.organizationId,
              name: formData.organizationName,
              type: formData.organizationType,
            },
          ],
          // contact: [
          //   {
          //     addressLine1: '',
          //     addressLine2: '',
          //     city: '',
          //     state: '',
          //     country: '',
          //     zip: 0,
          //   },
          // ],
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          websiteUrl: formData.websiteUrl,
          hippaprivacyofficer: [
            {
              name: formData.hippaPrivacyOfficerName,
              // email: '',
              // mobile: '',
            },
          ],
        }
      );

      if (response.status === 200) {
        console.log("Registration Data", response.data);
        toast.success(response.data.message.description);
      } else {
        console.error("Error registering:", response.data.message);
        toast.warning(`Error: ${response.data.message.description}`);
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.warning("An error occurred during registration.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="container col-md-12">
          <h1 className="mt-1">Details</h1>
          <hr></hr>
          <FormGroup>
            <form onSubmit={handleSubmit}>
              <div className="mt-2">
                <label htmlFor="organizationName" className="label">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  placeholder="OrganizationName"
                />
              </div>

              <div className="mt-2">
                <label htmlFor="organizationType" className="label">
                  Organization Type
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={(e) =>
                    handleInputChange("organizationType", e.target.value)
                  }
                  className="form-control"
                >
                  <option value="" disabled>
                    Select Organization Type
                  </option>
                  {organizationType.length > 0 &&
                    organizationType.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.value}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-2">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="email" className="label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  placeholder="Mobile Number"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="websiteUrl" className="label">
                  Website URL
                </label>
                <input
                  type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    handleInputChange("websiteUrl", e.target.value)
                  }
                  placeholder="Website URL"
                />
              </div>

              <div className="mt-2">
                <label htmlFor="websiteURL" className="label">
                  HIPPA Privacy Officer Name
                </label>
                <input
                  type="text"
                  id="hippaPrivacyOfficerName"
                  name="hippaPrivacyOfficerName"
                  value={formData.hippaPrivacyOfficerName}
                  onChange={(e) =>
                    handleInputChange("hippaPrivacyOfficerName", e.target.value)
                  }
                  placeholder="HIPPA Privacy Officer Name"
                />
              </div><br></br>
              <div className="mt-2">
                <button className="btn btn-success">Submit</button>
              </div>
              <br></br>
             
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </FormGroup>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;