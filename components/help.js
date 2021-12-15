import Link from "next/link";

export default function Help() {
  return (
    <div className="help">
      <div className="r-container">
        <div className="row mx-0 justify-content-end">
          {/* <div className="col-6 px-0 img-panel"></div> */}
          <div className="col-lg-6 col-md-8 col-sm-10 col-12 px-0">
            <div className="text-panel">
              <h2 className="title text-capitalize">
                Let us <span>help you!</span>
              </h2>
              <p>Help you to get started.</p>
            </div>
            <div className="service_panel round p-5">
              <h3 className="title mb-4">Ring Recommender</h3>
              <p className="mb-5 pb-4">
                Tell us your budget and preferences and we’ll find you the right
                diamond and setting.
              </p>
              <Link  passHref={true} href="/custom-jewelry">
                <a className="design-service pink-btn round-form text-uppercase py-4 px-5">
                  Custom Design Services
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
