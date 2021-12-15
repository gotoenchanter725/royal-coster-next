import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import { RiArrowRightLine } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import { SnackbarProvider, useSnackbar } from "notistack";

const LOGIN_API =
  "https://costercatalog.com/api/index.php?request=loginCustomer";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = (e) => {
    e.preventDefault();
    const loginData = document.forms.loginForm;
    const formData = new FormData(loginData);
    setLoading(true);

    fetch(LOGIN_API, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const variant = "error";
        if (data.status == "error") {
          enqueueSnackbar(data.error, { variant });
        } else if (data.status == "ok") {
          const loginUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.user.user.email,
            uid: data.user.user.uid
          };
          localStorage.setItem("login_user", JSON.stringify(loginUser));
          router.push("/myaccount");
          localStorage.setItem(
            "access_token",
            data.user.user.stsTokenManager.accessToken
          );
        }
      });
  };

  return (
    <div className="login_page d-flex flex-column">
      <Head>
        <title>My Account Login | Royal Coster</title>
      </Head>
      <Header />
      <div className="main-panel d-flex align-items-center justify-content-center">
        <div className="main-box round">
          <h3 className="title text-capitalize">Welcome back</h3>
          <p className="description text-capitalize">
            Enter your email address and password to log in.
          </p>
          <form name="loginForm" onSubmit={login}>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="EMAIL"
              required
            />
            <input
              type="password"
              name="password"
              className="form-control"
              minLength="8"
              placeholder="PASSWORD"
              required
            />
            <button
              className="btn btn-login blue-btn d-flex justify-content-between align-items-center"
              disabled={loading}
            >
              LOG IN
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
          <div className="login-help-panel d-flex justify-content-between align-items-center pb-4">
            <div className="form-check d-flex align-items-center p-0">
              <input
                type="checkbox"
                className="form-check-input m-0 me-3"
                id="rememberme"
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember Me
              </label>
            </div>
            <Link href="/myaccount/resetPassword">
              <a className="btn btn-forgot-password text-decoration-underline">
                Forgot Password
              </a>
            </Link>
          </div>
          <Link href="/myaccount/register">
            <a className="btn btn-create-account d-flex justify-content-between align-items-center">
              CREATE A NEW ACCOUNT
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
