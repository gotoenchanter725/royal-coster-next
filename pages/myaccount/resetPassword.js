import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import { RiArrowRightLine } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import { SnackbarProvider, useSnackbar } from "notistack";

const resetPasswordURL =
  "https://costercatalog.com/api/index.php?request=resetPasswordRoyalcoster";

export default function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const resetPasswordData = document.forms.resetPasswordForm;
    let formData = new FormData(resetPasswordData);

    fetch(resetPasswordURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const variant = "success";
        if (data && data.status == "ok") {
          enqueueSnackbar("Reset email sent.", { variant });
        } else if (data && data.status == "error") {
          const variant = "error";
          console.log(data);
          enqueueSnackbar(data.message.message, { variant });
        }
      });
  };

  return (
    <div className="login_page d-flex flex-column">
      <Head>
        <title>My Account Reset Password | Royal Coster</title>
      </Head>
      <Header />
      <div className="main-panel d-flex align-items-center justify-content-center">
        <div className="main-box round">
          <h3 className="title text-capitalize mb-0">Reset Password</h3>
          <p className="description text-capitalize">
            {/* Enter your email address and password to log in. */}
          </p>
          <form name="resetPasswordForm" onSubmit={resetPassword}>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="EMAIL"
              required
            />
            <button
              className="btn btn-login blue-btn d-flex justify-content-between align-items-center"
              disabled={loading}
            >
              SUBMIT
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
