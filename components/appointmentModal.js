import { useDebugValue, useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { RiAddLine } from "react-icons/ri";
import router, { useRouter } from "next/router";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RiArrowRightSLine } from "react-icons/ri";
import en from "react-phone-number-input/locale/en.json";
var dateFormat = require("dateformat");

const options = [
  "I’m interested in purchasing a diamond jewel. ",
  "I’d like to know more about engagement rings",
  "I’m interested in a diamond tour ",
  "I’d like to have my diamond jewelry examined/ cleaned.",
  "Something else.",
];

const times = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
];

const languages = [{ language: "English" }, { language: "Dutch" }];

const contactMethods = [
  { title: "Google Meet" },
  { title: "Zoom" },
  { title: "Skype" },
  { title: "Phonecall " },
];

const toggleDatePicker = (e) => {
  console.log("toggle!");
  e.target.closest("#timeDate").classList.toggle("visible");
};

export default function AppointmentModal() {
  const [contactMethod, setContactMethod] = useState(0);
  const [language, setLanguage] = useState();
  const [safeMode, setSafeMode] = useState();
  const [country, setCountry] = useState("NP");
  const [visit, setVisit] = useState(false);
  const [errorPhone, setErrorPhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [countryNumberPrefix, setCountryNumberPrefix] = useState();
  const [preDate, setPreDate] = useState(new Date());
  const [disDate, setDisDate] = useState();
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);
  const [step4, setStep4] = useState(true);
  const [location, setLocation] = useState();
  const [service, setService] = useState([]);
  const [time, setTime] = useState();
  const [contactInfo, setContactInfo] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mounted, setMounted] = useState(false);
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

  const CountrySelect = ({ value, onChange, ...rest }) => (
    <div className="phoneNumber-prefix p-0 pe-2">
      <select
        {...rest}
        value={value}
        onChange={(event) => {
          console.log(event.target);
          setCountryNumberPrefix(
            getCountryCallingCode(event.target.value || undefined)
          );
          onChange(event.target.value || undefined);
        }}
      >
        {filteredCountries &&
          filteredCountries.map((country) => (
            <option key={country} value={country}>
              {getCountryCallingCode(country)}
            </option>
          ))}
      </select>
      <RiAddLine className="symbol" />
    </div>
  );

  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  useEffect(() => {
    if (preDate) {
      console.log(preDate);
      setDisDate(dateFormat(preDate, "dddd  d,  mmmm  yyyy"));
      if (mounted) {
        document.querySelector("#timeDate").classList.remove("visible");
      }
      setMounted(true);
    }
  }, [preDate]);

  const handleTime = (e) => {
    setTime(e.target.innerText);
    document.querySelectorAll(".time-item").forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active");
    });
    if (!e.target.closest(".time-item").classList.contains("active"))
      e.target.closest(".time-item").classList.add("active");
    if (step4) setStep4(false);
    document.querySelector("#timeDate").classList.remove("show", "active");
    document.querySelector("#contactDetails").classList.add("show", "active");
    document.querySelector("#timeDate-tab").classList.remove("active");
    document.querySelector("#contactDetails-tab").classList.add("active");
  };

  const checkingLocation = (e) => {
    e.preventDefault();
    setStep2(false);
    setLocation(e.target.innerText);
    document.querySelector("#location-tab").classList.remove("active");
    document.querySelector("#service-tab").classList.add("active");
    document.querySelector("#location").classList.remove("show", "active");
    document.querySelector("#service").classList.add("show", "active");
  };

  const checkingService = (e) => {
    const value = e.target.innerText;
    document.querySelectorAll(".option-item").forEach((item) => {
      if (item.classList.contains("active")) item.classList.remove("active");
    });
    if (!e.target.closest(".option-item").classList.contains("active"))
      e.target.closest(".option-item").classList.toggle("active");
    if (step3) setStep3(false);
    if (!service.find((item) => item == value)) {
      setService([...service, value]);
    } else {
      service.splice(service.indexOf(value), 1);
      setService([...service]);
    }
    document.querySelector("#service").classList.remove("show", "active");
    document.querySelector("#timeDate").classList.add("show", "active");
    document.querySelector("#service-tab").classList.remove("active");
    document.querySelector("#timeDate-tab").classList.add("active");
  };

  const sendRequest = (e) => {
    e.preventDefault();
      router.push("/thank-you-contact");      
  };

  useEffect(() => {
    setContactInfo(contactMethods[contactMethod]);
  }, [contactMethod]);

  return (
    <div
      className="modal fade"
      id="appointment"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable r-container"
        id="appointmentModal"
      >
        <div className="modal-content px-3 py-4 round">
          <div className="modal-header  py-3">
            <h3 className="modal-title">Request an Appointment</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 py-5">
            <div className="row m-0 align-items-start">
              <div
                className="nav flex-column nav-pills col-sm-3 col-12"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active mb-4 text-uppercase"
                  id="location-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#location"
                  type="button"
                  role="tab"
                  aria-controls="location"
                  aria-selected="true"
                  disabled={step1}
                >
                  Location
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="service-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#service"
                  type="button"
                  role="tab"
                  aria-controls="service"
                  aria-selected="false"
                  disabled={step2}
                >
                  Service
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="timeDate-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#timeDate"
                  type="button"
                  role="tab"
                  aria-controls="timeDate"
                  aria-selected="false"
                  disabled={step3}
                >
                  time & date
                </button>
                <button
                  className="nav-link mb-4 text-uppercase"
                  id="contactDetails-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#contactDetails"
                  type="button"
                  role="tab"
                  aria-controls="contactDetails"
                  aria-selected="false"
                  disabled={step4}
                >
                  contact Details
                </button>
              </div>
              <div
                className="tab-content col-sm-9  col-12 p-0 ps-sm-5"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane text-sm-start text-center fade show active"
                  id="location"
                  role="tabpanel"
                  aria-labelledby="location-tab"
                >
                  <h3 className="title m-0 mb-4 mt-sm-0 mt-5">
                    Select Showroom
                  </h3>
                  <p className="description">
                    Would you like to visit our monumental villas in Amsterdam
                    or schedule an online appointment?
                  </p>
                  <button
                    className="btn btn-unavailable pink-btn text-start px-5 mt-5 py-3 text-sm-start text-center round-form"
                    onClick={(e) => {
                      checkingLocation(e);
                      setVisit(true);
                    }}
                  >
                    Visit us in Amsterdam
                  </button>
                  <button
                    className="btn btn-consultation d-flex py-3 blue-btn round-form px-5 mt-4 justify-content-between align-items-center"
                    onClick={(e) => {
                      checkingLocation(e);
                      setVisit(false);
                    }}
                  >
                    <span>Schedule an online diamond consult</span>
                    <RiArrowRightLine />
                  </button>
                </div>
                <div
                  className="tab-pane text-sm-start text-center fade"
                  id="service"
                  role="tabpanel"
                  aria-labelledby="service-tab"
                >
                  <h3 className="title m-0 mb-4 mt-sm-0 mt-5">
                    Which service do you require?
                  </h3>
                  <div className="row options-panel m-0">
                    {options.map((item, index) => {
                      return (
                        <div
                          className={"p-0 " + (index % 2 ? "" : "pe-sm-3")}
                          key={index}
                        >
                          <nav
                            className="option-item  px-5 py-3 mt-4 round-form "
                            onClick={checkingService}
                          >
                            {item}
                          </nav>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="tab-pane text-sm-start text-center fade visible"
                  id="timeDate"
                  role="tabpanel"
                  aria-labelledby="timeDate-tab"
                >
                  <div className="date-panel active">
                    <h3 className="title mb-5 mt-sm-0 mt-5">
                      Select a Preferred Date
                    </h3>
                    <div className="calendar-panel round">
                      <div
                        className="date-title-panel p-4 d-flex align-items-center justify-content-between"
                        onClick={toggleDatePicker}
                      >
                        <span className="text-uppercase">{disDate}</span>
                        <RiArrowRightSLine />
                      </div>
                      <Calendar
                        onChange={(val) => {
                          setPreDate(val);
                        }}
                        minDate={new Date()}
                        value={preDate}
                      />
                    </div>
                  </div>
                  <div className="time-panel mt-5">
                    <h3 className="title mb-5">Select a Preferred time</h3>
                    <div className="row">
                      {times.map((item, index) => {
                        return (
                          <div
                            className="col-md-2 col-sm-3 col-4 mb-4"
                            key={index}
                          >
                            <nav
                              className="py-3 time-item text-center round-form"
                              onClick={handleTime}
                            >
                              {item}
                            </nav>
                          </div>
                        );
                      })}
                    </div>
                    <p className="bottom-text">Local time in (GMT)</p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="contactDetails"
                  role="tabpanel"
                  aria-labelledby="contactDetails-tab"
                >
                  <h3 className="title m-0 mb-4 text-sm-start text-center mt-sm-0 mt-5">
                    Your Contact Details
                  </h3>
                  <form className="form-panel row" onSubmit={sendRequest}>
                    {!visit && (
                      <label htmlFor="contactMethod" className="col-sm-6 mt-5">
                        Method of Contact*
                        <select
                          className="form-select blue-text ps-4 mt-3 round-form py-3"
                          aria-label="Default select example"
                          id="contactMethod"
                          value={contactMethod}
                          onChange={(event) =>
                            setContactMethod(event.target.value)
                          }
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
                    )}
                    <label
                      htmlFor="preferredLanguage"
                      className="col-sm-6 mt-5"
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
                    <label htmlFor="firstName" className="col-sm-6 mt-5">
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
                    <label htmlFor="lastName" className="col-sm-6 mt-5">
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
                    <label htmlFor="email" className="col-sm-6 mt-5">
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
                    <label htmlFor="phoneNumber" className="col-sm-6 mt-5">
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
                    <label htmlFor="moreInformation" className="mt-5">
                      More Information*
                      <textarea
                        id="moreInformation"
                        rows="4"
                        className="form-control px-4 py-3 mt-3 round-form"
                        placeholder="More information"
                        style={{ resize: "none" }}
                      />
                    </label>
                    <div className="col-12 py-5 safe-panel form-check">
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
                          By ticking this box you accept to receive newsletters and marketing emails from Royal Coster Diamonds. For further information please read our privacy policy and terms and conditions.
                        </label>
                      </div>
                    </div>
                    <div className="btn-panel">
                      <button className="btn col-12 pink-btn py-3 btn-request round-form">
                        SEND APPOINTMENT REQUEST
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
