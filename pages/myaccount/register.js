import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import { RiArrowRightLine } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import { SnackbarProvider, useSnackbar } from "notistack";

const REGISTER_API =
  "https://costercatalog.com/api/index.php?request=registerNewCustomer";

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createNewAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    const registerData = document.forms.registerForm;
    let formData = new FormData(registerData);
    formData.append(
      "displayName",
      registerData.firstName.value + " " + registerData.lastName.value
    );
    fetch(REGISTER_API, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false);
        let variant = "error";
        if (data.status == "error") {
          enqueueSnackbar(data.error, { variant });
        } else if (data.status == "ok") {
          variant = "success"
          enqueueSnackbar("Verification email sent.", { variant });
          router.push("/myaccount/login");
        }
      });
  };

  return (
    <div className="login_page d-flex flex-column">
      <Head>
        <title>My Account Register | Royal Coster</title>
      </Head>
      <Header />
      <div className="main-panel d-flex align-items-center justify-content-center">
        <div className="main-box round">
          <h3 className="title text-capitalize mb-0">Register</h3>
          <p className="description text-capitalize">
            {/* Enter your email address and password to log in. */}
          </p>
          <form name="registerForm" onSubmit={createNewAccount}>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="FirstName"
                  required
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="LastName"
                  required
                />
              </div>
            </div>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="EMAIL"
              required
            />
            {/* <input
              type="password"
              name="password"
              className="form-control"
              placeholder="PASSWORD"
              minLength="8"
              required
            /> */}
            <button
              className="btn btn-login blue-btn d-flex justify-content-between align-items-center"
              disabled={loading}
            >
              CREATE A NEW ACCOUNT
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
          </form>
          <div className="login-help-panel d-flex justify-content-between align-items-center pb-4"></div>
          <Link href="/myaccount/login">
            <a className="btn btn-create-account d-flex justify-content-between align-items-center">
              LOG IN
              <RiArrowRightLine />
            </a>
          </Link>
        </div>
        <div className="blur-blue-panel" />
        <div className="blur-pink-panel" />
      </div>
    </div>
  );
}
