import EnquiryModal from "./enquiryModal";

export default function CraftingIdea() {
  return (
    <div className="crafting-idea-section">
      <div className="bg-panel d-sm-none d-block">
        <div className="pink-box" />
        <div className="blue-box" />
      </div>
      <div className="r-container">
        <div className="row crafting_main-panel mx-0 justify-content-end">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12 text-sm-start py-sm-0 py-5 px-0">
            <h2 className="title text-capitalize blue-text m-0 mb-5">
              Crafting <span>Ideas</span> into Existence
            </h2>
            <p className="pb-sm-5 pb-4 m-0 description">
              Whether a celebration of success, a symbol of love or a promise of
              a new chapter, fine jewellery holds all the significance of your
              individual story.
            </p>
            <p className="pb-sm-5 description">
              With decades of shared experience in the art of jewellery making,
              our award-winning team of designers and expert craftsmen are
              committed to creating the perfect jewel to suit your moment.
            </p>
            <div className="btn-panel mt-5 d-sm-block d-flex flex-column align-items-center">
              <button className="btn blue-btn px-5 py-3 text-uppercase round-form me-sm-4 me-0 mb-sm-0 mb-4" data-bs-toggle="modal"
                data-bs-target="#enquiryModal"
              >
                Send an enquiry
              </button>
              <button className="btn pink-btn px-5 py-3 text-uppercase round-form" data-bs-toggle="modal"
                data-bs-target="#appointment">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <EnquiryModal />
    </div>
  );
}
