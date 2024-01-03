import React, { useState, useEffect } from "react";
import axios from "axios";
import "./beacon.css";
import CustomModal from "../../components/customModal";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllBeacon } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import QrReader from "react-qr-scanner";

const Index: React.FC = () => {
  const dispatch = useDispatch<any>();
  const beaconDevicesState = useSelector((state: any) => state.Beacon.beaconData);
  const [tableData, setTableData] = useState<any>(beaconDevicesState)
  // const beaconDevices = beaconDevicesState.beaconDevices || [];
  const [showModal, setShowModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("")
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    getAllBeacon(dispatch);
    console.log(beaconDevicesState)
  }, [dispatch]);

  useEffect(() => {
    setTableData(beaconDevicesState)
  }, [beaconDevicesState])
  const handlePost = async () => {
    try {
      const response = await axios.post("http://47.32.254.89:7000/api/add", {
        deviceName,
        deviceId: qrCode || deviceId,
      });
      alert(response.data.message);
      setShowModal(false);
      setDeviceName("");
      setDeviceId("");
      setQrCode("");
      // You may want to update the table data here by calling getAllBeacon API again.
    //   getAllBeacon(dispatch);
    } catch (error) {
      console.error("Error in POST request:", error);
      alert("Failed");
      setShowModal(false);
      setDeviceName("");
      setDeviceId("");
      setQrCode("");
    }
  };
  

  const handleModalSave = () => {
    handlePost();
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setDeviceName("");
    setDeviceId("");
    setQrCode("");
  };

  const handleQrCodeScan = (data: string | null) => {
    if (data) {
      setQrCode(data);
    }
  };
  
  const handleTdClick = () => {
 
    setShowModal(true);
  };  

  return (
    <div className="main">
      <div className="table-container">
        <div className="heading1">
          <h3>Beacon Device Control</h3>
          <div className="mx-2">
            <FaPlus
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer" }}
              onClick={handleTdClick}
            />
          </div>
        </div>
        <table className="table table-bordered w-50">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">DeviceName</th>
              <th scope="col">DeviceId</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.deviceName}</td>
                <td>{item.deviceId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} toggle={handleModalCancel} centered>
        <ModalHeader toggle={() => setShowModal(false)}>
          Beacon Device
        </ModalHeader>
        <ModalBody>
  <div className="mb-3">
    <label htmlFor="deviceName" className="form-label">
      Device Name
    </label>
    <input
      type="text"
      className="form-control"
      id="deviceName"
      value={deviceName}
      onChange={(e) => setDeviceName(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="deviceId" className="form-label">
      Device ID
    </label>
    <input
      type="text"
      className="form-control"
      id="deviceId"
      value={deviceId}
      onChange={(e) => setDeviceId(e.target.value)}
    />
  </div>
</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePost}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={handleModalCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Index;
