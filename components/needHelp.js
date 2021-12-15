import {
  RiPhoneLine,
  RiChatSmile2Line,
  RiStore2Line,
  RiUser3Line,
  RiMailLine,
} from "react-icons/ri";

export default function NeedHelp() {
  return (
    <div className="help-section r-container">
      <div className="pink-circle" />
      <div className="blue-circle" />
      <div className="row m-0">
        <div className="col-md-4 col-12 title-panel p-0 pe-md-5 pb-md-0 pb-5">
          <h2>Need help completing your order?</h2>
          <p>Please contact our diamond specialists:</p>
        </div>
        <div className="col-md-4 col-12 p-0 ps-md-3 help-items">
          <a href="tel:00310203055555" className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiPhoneLine className="me-4" />
            +31 (0) 203055 555
          </a>
          <button className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiChatSmile2Line className="me-4" />
            Live chat
          </button>
          <button className="btn px-5 py-4 blue-text mb-4 text-uppercase"
              data-bs-toggle="modal"
              data-bs-target="#appointment">
            <RiStore2Line className="me-4" />
            Find a showroom
          </button>
        </div>
        <div className="col-md-4 col-12 p-0 ps-md-3 help-items">
          <button className="btn px-5 py-4 blue-text mb-4 text-uppercase"
              data-bs-toggle="modal"
              data-bs-target="#appointment">
            <RiStore2Line className="me-4" />
            Online Consultation
          </button>
          <button className="btn px-5 py-4 blue-text mb-4 text-uppercase" data-bs-toggle="modal" data-bs-target="#appointment">
            <RiUser3Line className="me-4" />
            book an appointment
          </button>
          <a href="mailto:support@costerdiamonds.com" className="btn px-5 py-4 blue-text mb-4 text-uppercase">
            <RiMailLine className="me-4" />
            Send as a email
          </a>
        </div>
      </div>
    </div>
  );
}
