import { useEffect, useState } from "react";
import renderHTML from "react-render-html";

export default function ProductDetail({
  informations,
  productID,
  productDescription,
}) {
  const [infoData, setInfoData] = useState([]);
  useEffect(() => {
    console.log(informations)
    informations &&
      informations.map((information, index) => {
        let middleArr = [];
        for (const key in information) {
          if (Object.hasOwnProperty.call(information, key)) {
            const element = information[key];
            middleArr.push({ title: key, value: element });
          }
        }
        infoData.push(middleArr);
        setInfoData([...infoData]);
      });
  }, []);

  return (
    <div className="detail-section r-container pb-5 mb-5">
      <h3 className="pb-5 blue-text title">Diamond Details</h3>
      <div className="pt-5 pb-md-5 text-panel">
        <h3 className="blue-text">SKU {productID}</h3>
        <p className="m-0 pb-5 full-description">
          {productDescription && renderHTML(productDescription)}
        </p>
        <nav className="info-panel">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active text-uppercase px-0 me-5"
              id="nav-information-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-information"
              type="button"
              role="tab"
              aria-controls="nav-information"
              aria-selected="true"
            >
              Information
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-information"
            role="tabpanel"
            aria-labelledby="nav-information-tab"
          >
            <h3 className="title-panel py-5 text-uppercase m-0">
              Product information
            </h3>
            <div className="informations row m-0">
              {infoData.length > 0 &&
                infoData.map((information, index) => {
                  return (
                    <div
                      className={
                        "p-0 px-2 pt-3 " +
                        (infoData.length == 1
                          ? "col-md-6"
                          : infoData.length == 2
                          ? "col-md-6"
                          : "col-lg-4 col-md-6")
                      }
                      key={index}
                    >
                      {information.length > 0 &&
                        information.map((info, id) => {
                          return (
                            <div
                              key={id}
                              className={
                                "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel " +
                                (id % 2 == 0 && "grey-mode")
                              }
                            >
                              <p className="text-uppercase information-name m-0">
                                {info.title}
                              </p>
                              <p className="text-uppercase m-0">{info.value}</p>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              {/* {informations.map((item, index) => {
                return (
                  <div
                    className={
                      index % 2 == 1
                        ? "col-md-6 col-12 p-0 ps-md-3"
                        : "col-md-6 col-12 p-0 pe-md-3 pe-0"
                    }
                    key={index}
                  >
                    <div
                      className={
                        (Math.floor(index / 2) % 2 == 0) & (index % 2 == 0)
                          ? "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel grey-mode md-grey-mode"
                          : (Math.floor(index / 2) % 2 == 0) & (index % 2 == 1)
                          ? "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel grey-mode"
                          : index % 2 == 0
                          ? "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel md-grey-mode"
                          : "d-flex align-items-center px-4 py-3 justify-content-between info-title-panel"
                      }
                    >
                      <p className="text-uppercase information-name m-0">
                        {item.name}
                      </p>
                      <p className="text-uppercase m-0">{item.value}</p>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
