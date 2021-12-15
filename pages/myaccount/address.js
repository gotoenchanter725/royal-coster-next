import React, { useState, useRef, useEffect } from "react";
import { RiArrowRightLine, RiCloseFill } from "react-icons/ri";
import _ from "lodash";
import { Spinner } from "react-bootstrap";
import { SnackbarProvider, useSnackbar } from "notistack";

let basicAddress = {
  addressName: "",
  firstName: "",
  lastNaem: "",
  company: "",
  street: "",
  additionalInformation: "",
  land: "",
  zipCode: "",
  houseNumber: "",
  addition: "",
  phoneNumeber: "",
  town: "",
};

const setUserURL =
  "https://costercatalog.com/api/index.php?request=setCustomerData";
const getUserURL =
  "https://costercatalog.com/api/index.php?request=getCustomerData";

export default function Address() {
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(localStorage.login_user).uid);
    fetch(getUserURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.address) {
          const address = JSON.parse(data.address);
          setAddressData([...address]);
        } else {
          setAddressData([{ ...basicAddress }]);
        }
      });
    setUid(JSON.parse(localStorage.login_user).uid);
  }, []);

  const removeItem = (index) => {
    _.remove(addressData, (item, id) => id == index);
    setAddressData([...addressData]);
  };

  const setUserAddress = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("uid", uid);
    formData.append("address", JSON.stringify(addressData));
    fetch(setUserURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        let variant = "success";
        if (data.status == "ok") {
          enqueueSnackbar("success", { variant });
        }
      });
  };

  return (
    <div className="address_panel">
      <div className="title-panel d-flex justify-content-between">
        <h3 className="m-0">My Address</h3>
        <button
          className="btn btn-creat"
          onClick={() => setAddressData([...addressData, { ...basicAddress }])}
        >
          CREATE NEW ADDRESS
        </button>
      </div>
      {addressData.length > 0 &&
        addressData.map((address, index) => (
          <div className="address-panel row" key={index}>
            {index > 0 && (
              <div className="btn-panel text-end mb-3">
                <button
                  className="btn btn-remove p-0"
                  onClick={() => removeItem(index)}
                >
                  <RiCloseFill />
                </button>
              </div>
            )}
            <div className="col-md-6">
              <input
                type="text"
                value={address.addressName}
                className="form-control"
                placeholder="ADDRESS NAME *"
                onChange={(e) => {
                  addressData[index].addressName = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.firstName}
                className="form-control"
                placeholder="FIRST NAME *"
                onChange={(e) => {
                  addressData[index].firstName = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.lastName}
                className="form-control"
                placeholder="LAST NAME *"
                onChange={(e) => {
                  addressData[index].lastName = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.company}
                className="form-control"
                placeholder="COMPANY(OPTIONAL)"
                onChange={(e) => {
                  addressData[index].company = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.street}
                className="form-control"
                placeholder="STREET *"
                onChange={(e) => {
                  addressData[index].street = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.additionalInformation}
                className="form-control"
                placeholder="ADDITIONAL INFORMATION(OPTIONAL)"
                onChange={(e) => {
                  addressData[index].additionalInformation = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={address.land}
                className="form-control"
                placeholder="LAND *"
                onChange={(e) => {
                  addressData[index].land = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.zipCode}
                className="form-control"
                placeholder="ZIP CODE *"
                onChange={(e) => {
                  addressData[index].zipCode = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.houseNumber}
                className="form-control"
                placeholder="HOUSE NUMBER *"
                onChange={(e) => {
                  addressData[index].houseNumber = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.addition}
                className="form-control"
                placeholder="ADDITION(OPTIONAL)"
                onChange={(e) => {
                  addressData[index].addition = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.town}
                className="form-control"
                placeholder="TOWN *"
                onChange={(e) => {
                  addressData[index].town = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
              <input
                type="text"
                value={address.phoneNumeber}
                className="form-control"
                placeholder="TELEPHONE NUMBER *"
                onChange={(e) => {
                  addressData[index].phoneNumeber = e.target.value;
                  setAddressData([...addressData]);
                }}
              />
            </div>
          </div>
        ))}
      <button
        className="btn blue-btn btn-apply d-flex justify-content-between align-items-center"
        onClick={setUserAddress}
        disabled={loading}
      >
        APPLY
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <RiArrowRightLine />
        )}
      </button>
    </div>
  );
}
