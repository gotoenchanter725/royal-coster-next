import React, { useState, useRef, useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import Link from "next/link"
import { Spinner } from "react-bootstrap";
import { SnackbarProvider, useSnackbar } from "notistack";

const setUserURL =
  "https://costercatalog.com/api/index.php?request=setCustomerData";
const getUserURL =
  "https://costercatalog.com/api/index.php?request=getCustomerData";

export default function Detail({ data }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [uid, setUid] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.login_user);
    // let formData = new FormData();
    // formData.append("uid", JSON.parse(localStorage.login_user).uid);
    // fetch(getUserURL, {
    //   method: "post",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {

    //   });
    setFirstName(loginUser.firstName);
    setLastName(loginUser.lastName);
    setEmail(loginUser.email);
    setUid(loginUser.uid);
  }, []);

  const setUserInfo = (e) => {
    e.preventDefault();
    const loginUser = JSON.parse(localStorage.login_user);
    const setUserForm = document.forms.setUserForm;
    let formData = new FormData();
    if (setUserForm.email.value == email) {
      setLoading(true);
      formData.append("firstName", setUserForm.firstName.value);
      formData.append("lastName", setUserForm.lastName.value);
      formData.append("email", setUserForm.email.value);
      formData.append("uid", uid);
      fetch(setUserURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          let variant = "success";
          if (data.status == "ok") {
            loginUser.firstName = setUserForm.firstName.value
            loginUser.lastName = setUserForm.lastName.value
            loginUser.email = setUserForm.email.value
            localStorage.setItem('login_user', JSON.stringify(loginUser))
            enqueueSnackbar("success", { variant });
          }
        });
      setErrorEmail();
    } else {
      setErrorEmail("Email is not matched");
    }
  };

  return (
    <div className="details_panel">
      <h3 className="title">My Details</h3>
      <form onSubmit={setUserInfo} name="setUserForm">
        <div className="edit-panel row mt-4">
          <div className="edit-info-panel col-md-6">
            <h3 className="sub-title mb-3 text-capitalize">
              Change name/email
            </h3>
            <input
              type="text"
              value={firstName}
              name="firstName"
              className="form-control"
              placeholder="FIRST NAME"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              className="form-control"
              placeholder="LAST NAME"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              value={email}
              className="form-control"
              placeholder="EMAIL ADDRESS"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="CONFRIM EMAIL ADDRESS"
            />
            {errorEmail && <p className="error">{errorEmail}</p>}
            <p></p>
          </div>
          <div className="edit-password-panel col-md-6">
            <h3 className="sub-title mb-3 text-capitalize">
              Change password
            </h3>
            <Link href="/myaccount/resetPassword">
              <a className="btn blue-btn btn-reset-password text-uppercase">
                Reset Password
              </a>
            </Link>
           {/* <input
              type="password"
              className="form-control"
              placeholder="NEW PASSWORD"
            />
            <input
              type="password"
              className="form-control"
              placeholder="CONFRIM NEW PASSWORD"
            />*/}
          </div>
        </div>
        <div className="confirm-panel">
         {/* <input
            type="text"
            className="form-control"
            placeholder="CURRENT PASSWORD"
          />*/}
          <button
            className="btn blue-btn btn-apply d-flex justify-content-between align-items-center"
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
      </form>
    </div>
  );
}
