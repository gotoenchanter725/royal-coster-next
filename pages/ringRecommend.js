import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import CraftingIdea from "../components/craftingIdea";
import Instagram from "../components/instagram";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import StepIcon from '@mui/material/StepIcon';
import { RiCustomerService2Fill, RiChat1Line, RiArrowLeftSLine } from "react-icons/ri";
import Typography from '@mui/material/Typography';

const pointRang = ["€3000 - €6000", "€6000 - €9000", "€12000 - €15000"];
const shapeType = [
  "round",
  "princess",
  "cushion",
  "EMERALD",
  "OVAL",
  "RADIANT",
  "ASSCHER",
  "MARQUISE",
  "HEART",
  "PEAR"
];
const lookingFor = ["Fair", "GOOD", "VERY GOOD", "EXCELLET"];
const ringStyle = [
  "SOLITAIRE",
  "PAVE",
  "CHANNEL SET",
  "SIDE-STONE",
  "THREE-STONE",
  "TENSION",
  "HALO",
  "VINTAGE"
];

const steps = ['Price Point', 'Diamond Shape', 'Looking for', 'Ring style'];

export default function RingRecommend() {
  const [direction, setDirection] = useState();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDirection("horizontal")
    } else {
      setDirection('vertical')
    }
  }, [])

  const [activeStep,
    setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
  }

  return (
    <div className="ringRecommend_page">
      <Head>
        <title>Rign Recommend | Royal Coster</title>
      </Head>
      <Header page="homepage" /> {/* Start hero section */}
      <div className="hero-section d-md-block d-flex flex-column justify-content-end">
        <div className="r-container">
          <h1 className="title text-white text-capitalize">
            Ring
            <br />
            Recommender
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section py-md-5">
        <div className="row r-container py-5">
          <div className="col-lg-3 col-md-4 col-12 p-0 pe-md-5 pe-5 py-5">
            <h3 className="title text-capitalize">We’ll find for you</h3>
          </div>
          <div className="col-lg-9 col-md-8 col-12 p-0 ps-md-5 ps-0 pt-md-5 pb-5">
            <p className="guide-text">
              We’ll find the perfect diamond and setting within your budget. Just answer a few
              simple questions and we’ll put together a beautiful engagement ring. We promise
              it won’t be as complicated as filling out your tax returns.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start pick choice section */}
      <div className="pick-choice-section r-container py-md-5">
        <div className="title-panel my-5 pt-md-5">
          <h3 className="title blue-text text-capitalize py-4 m-0">
            Pick your choice
          </h3>
        </div>
        <div className="row pick-panel m-0 pt-md-5">
          <div className="stepper-panel row mb-5">
            {
              direction &&
              <Stepper className="col-md-4" activeStep={activeStep} orientation={direction}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={index} {...stepProps} completed={false} active={index <= activeStep ? true : false}>
                      <StepLabel {...labelProps} >{direction == "vertical" && label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            }
            <div className="content-panel col-md-8 mt-md-0 mt-5">
              <div className={"price-point-panel mb-5 d-none" + (activeStep == 0 ? "1 d-block" : "")}>
                <label htmlFor="pricePoint" className="pb-3">
                  My Price point is...
                </label>
                <select
                  className="form-select price-point round-form px-4 py-3 text-capitalize"
                  id="pricePoint"
                  aria-label="Default select example"
                  placeholder="Price Point">
                  {pointRang.map((item, index) => {
                    return (
                      <option key={index} value={index} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={"diamon-shape-panel mb-5 d-none" + (activeStep == 1 ? "1 d-block" : "")}>
                <label htmlFor="diamondShape" className="pb-3">
                  My Diamonds is...
                </label>
                <select
                  className="form-select diamond-shape round-form px-4 py-3 text-capitalize"
                  id="diamondShape"
                  aria-label="Default select example"
                  placeholder="Pick a diamond shape">
                  {shapeType.map((item, index) => {
                    return (
                      <option key={index} value={index} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={"looking-for-panel mb-5 d-none" + (activeStep == 2 ? "1 d-block" : "")}>
                <label htmlFor="lookingFor" className="pb-3">
                  My Looking for is...
                </label>
                <select
                  className="form-select looking-for round-form px-4 py-3 text-capitalize"
                  id="lookingFor"
                  aria-label="Default select example"
                  placeholder="Looking for...">
                  {lookingFor.map((item, index) => {
                    return (
                      <option key={index} value={index} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={"ring-style-panel mb-5 d-none" + (activeStep == 3 ? "1 d-block" : "")}>
                <label htmlFor="ringStyle" className="pb-3">
                  My Setting is... *Optional
                </label>
                <select
                  className="form-select price-point round-form px-4 py-3 text-capitalize"
                  id="ringStyle"
                  aria-label="Default select example"
                  placeholder="Pick a ring Style">
                  {ringStyle.map((item, index) => {
                    return (
                      <option key={index} value={index} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="btn-panel d-flex justify-content-between">
                <button
                  className="btn btn-back p-3 round-form blue-text"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  <RiArrowLeftSLine />
                </button>
                <button onClick={activeStep === steps.length - 1 ? handleComplete : handleNext} className="btn blue-btn round-form px-5 py-3 btn-next text-uppercase">
                  {activeStep === steps.length - 1 ? 'FIND MY RING' : 'Next'}
                </button>
              </div>
            </div>
          </div>
          <div className="round need-help-panel px-5 mb-4">
            <div
              className="title-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-sm-5 py-4">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-sm-5 mb-3">Need Help?</h3>
              <div className="link-panel d-flex">
                <Link passHref={true} href="/contact">
                  <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                    <RiCustomerService2Fill className="me-2" />
                    contact
                  </a>
                </Link>

                <Link passHref={true} href="#">
                  <a className="text-uppercase d-flex align-items-center blue-text">
                    <RiChat1Line className="me-2" />
                    chat
                  </a>
                </Link>
              </div>
            </div>
            <div
              className="purchase-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-sm-5 py-4">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-sm-5 mb-3">
                Not ready to purchase online?
              </h3>
              <button
                className="btn btn-schedule text-uppercase blue-text px-5 py-3"
                data-bs-toggle="modal"
                data-bs-target="#appointment">
                Schedule an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End pick choice section */}

      {/* Start Help section */}
      <CraftingIdea /> {/* End Help section */}

      {/* Start Instagram section */}
      <Instagram /> {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule /> {/* End Schedule section */}
      {/* Start Footer */}
      <Footer /> {/* End Footer */}
    </div>
  );
}
