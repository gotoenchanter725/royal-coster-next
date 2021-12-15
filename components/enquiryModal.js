import { useDebugValue, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Link from "next/link"
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import "react-calendar/dist/Calendar.css";

const contactMethods = [
  { title: "Google Meet" },
  { title: "Zoom" },
  { title: "Skype" },
  { title: "Phonecall " },
];

export default function EnquiryModal() {
  const [contactMethod, setContactMethod] = useState(0);
  const [language, setLanguage] = useState();
  const [safeMode, setSafeMode] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [contactInfo, setContactInfo] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    getCountries().forEach((country) => {
      if (
        !filteredCountries.some(
          (item) =>
            getCountryCallingCode(item) === getCountryCallingCode(country)
        )
      ) {
        filteredCountries.push(country);
        setFilteredCountries(filteredCountries);
      }
    });
  }, []);

  const sendRequest = () => {
    router.push("/thank-you-contact");
  };

  useEffect(() => {
    setContactInfo(contactMethods[contactMethod]);
  }, [contactMethod]);

  return (
    <div
      className="modal fade"
      id="enquiryModal"
      tabIndex="-1"
      s
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="enquiryModalDialog"
      >
        <div className="modal-content px-3 py-4 round">
          <div className="modal-header  py-3">
            <h3 className="modal-title">I am looking for bespoke jewelry</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 py-5">
            <div className="row m-0 align-items-start">
              <h3 className="title m-0 mb-4 text-sm-start text-center mt-sm-0 mt-5">
                Your Contact Details
              </h3>
              <form className="form-panel row m-0">
                <label
                  htmlFor="contactMethod"
                  className="col-sm-6 p-0 pe-sm-3 mt-5"
                >
                  Method of Contact*
                  <select
                    className="form-select blue-text ps-4 mt-3 round-form py-3"
                    aria-label="Default select example"
                    id="contactMethod"
                    value={contactMethod}
                    onChange={(event) => setContactMethod(event.target.value)}
                  >
                    {contactMethods.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label
                  htmlFor="preferredLanguage"
                  className="col-sm-6 p-0 ps-sm-3 mt-5"
                >
                  Preferred Language*
                  <input
                    type="text"
                    id="preferredLanguage"
                    className="form-control px-4 mt-3 py-3 round-form"
                    placeholder="Preferred Language"
                    value={language}
                    required
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </label>
                <label
                  htmlFor="firstName"
                  className="col-sm-6 p-0 pe-sm-3 mt-5"
                >
                  First Name*
                  <input
                    type="text"
                    id="firstName"
                    className="form-control px-4 mt-3 py-3 round-form"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="lastName" className="col-sm-6 p-0 ps-sm-3 mt-5">
                  Last Name*
                  <input
                    type="text"
                    id="lastName"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                <label htmlFor="email" className="col-sm-6 p-0 pe-sm-3 mt-5">
                  Email*
                  <input
                    type="email"
                    id="email"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label
                  htmlFor="phoneNumber"
                  className="col-sm-6 p-0 ps-sm-3 mt-5"
                >
                  Telephone*
                  <div className="d-flex m-0 mt-3 telephone-form">
                    {/* <CountrySelect
                          className="form-select ps-5 py-3 round-form"
                          value={country}
                          onChange={setCountry}
                        /> */}
                    <input
                      className="form-control px-4 py-3 me-2 round-form phone-form"
                      placeholder="Phone number"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">{errorPhone}</div>
                  </div>
                </label>
                <label htmlFor="moreInformation" className="p-0 mt-5">
                  More Information*
                  <textarea
                    id="moreInformation"
                    rows="4"
                    className="form-control px-4 py-3 mt-3 round-form"
                    placeholder="More information"
                    style={{ resize: "none" }}
                  />
                </label>
                <div className="col-12 p-0 py-5 safe-panel form-check">
                  <h3 className="m-0 mb-3">Safeguarding Your Privacy</h3>
                  <div className="d-flex">
                    <input
                      className="form-check-input me-3 m-0"
                      type="checkbox"
                      value={safeMode}
                      onChange={(e) => setSafeMode(e.target.checked)}
                      id="safeMode"
                    />
                    <label className="form-check-label" htmlFor="safeMode">
                      By ticking this box, you accept to receive newsletters and
                      marketing emails from Royal Coster Diamonds. For further
                      information, please read our privacy policyand terms and
                      conditions.
                    </label>
                  </div>
                </div>
                <Link href="mailto:support@costerdiamonds.com?subject=I'd like to know more about custom jewelry&body=Please enter as much details about your wishes as possible.">
                  <a
                    className="btn col-12 pink-btn py-3 btn-request round-form"
                  >
                    SEND REQUEST
                  </a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
