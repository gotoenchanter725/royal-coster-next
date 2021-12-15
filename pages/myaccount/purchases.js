import React, { useState, useRef, useEffect } from "react";
import OrderDetail from "./orderDetail";
import { Skeleton } from "@material-ui/lab";
var dateFormat = require("dateformat");

const orderURL =
  "https://costercatalog.com/api/index.php?request=getCustomerOrders";
const productApi = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;

export default function Purchases() {
  const [orderData, setOrderData] = useState();
  const [lineItemData, setLineItemData] = useState();
  const [totalData, setTotalData] = useState();
  const [detailOrder, setDetailOrder] = useState();
  const [noResult, setNotResult] = useState(false);

  useEffect(() => {
    const emial = JSON.parse(localStorage.login_user).email;
    const formData = new FormData();
    formData.append("email", emial);
    fetch(orderURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.orders.length) {
        setOrderData(data.orders);
        // } else {
        //   setNotResult(true);
        // }
      });
  }, []);

  useEffect(() => {
    if (orderData) {
      let lineItems = [];
      orderData.map((order, index) => {
        let middleArr = [];
        order.line_items.map((lineItem) => {
          let formData = new FormData();
          formData.append("shopifyid", lineItem.product_id);
          fetch(productApi, {
            method: "post",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              middleArr.push(data);
              if (middleArr.length == order.line_items.length) {
                lineItems.push({ id: index, data: middleArr });
                if (lineItems.length == orderData.length) {
                  lineItems.sort((item1, item2) => item1.id - item2.id);
                  setLineItemData(lineItems);
                }
              }
            });
        });
      });
    }
  }, [orderData]);

  useEffect(() => {
    if (lineItemData) {
      let middleArr = [];
      orderData.map((order, index) => {
        middleArr.push({ ...order, lineItems: lineItemData[index].data });
        if (middleArr.length == orderData.length) {
          setTotalData(middleArr);
        }
      });
    }
  }, [lineItemData]);

  return (
    <div className="purchases_panel">
      {!noResult ? (
        totalData ? (
          detailOrder ? (
            <OrderDetail data={detailOrder} setData={setDetailOrder} />
          ) : (
            <>
              <h3 className={"title " + (detailOrder ? "d-none" : "d-block")}>
                My Purchases <span>({totalData.length})</span>
              </h3>
              {totalData.map((item, index) => (
                <div className="list-panel" key={index}>
                  <div className="item-panel row m-0 mb-3">
                    <div className="title-panel d-md-block d-sm-flex  d-block col-md-3 p-0">
                      <div className="order-status-panel mb-md-3 mb-0 me-md-0 me-3">
                        <h3>Order Status</h3>
                        <p>Sent</p>
                      </div>
                      <div className="order-number-panel mb-md-3 mb-0 me-md-0 me-3">
                        <h3>Order Number</h3>
                        <p>{item.order_number}</p>
                      </div>
                      <div className="order-number-panel mb-md-3 mb-0">
                        <h3>Order Date</h3>
                        <p>{dateFormat(item.created_at, "d/m/yyyy")}</p>
                      </div>
                    </div>
                    <div className="order-panel col-md-9 p-0">
                      <div className="product-panel d-flex flex-wrap">
                        {item.lineItems.map(
                          (lineItem, id) =>
                            lineItem.image && (
                              <div
                                className="image-panel hover-scale me-3 mb-3"
                                key={id}
                              >
                                <img
                                  src={lineItem.image.src.replace(
                                    ".jpg",
                                    "_100x.jpg"
                                  )}
                                  alt="product-img"
                                />
                              </div>
                            )
                        )}
                      </div>
                      <div className="btn-panel d-sm-flex d-block align-items-center">
                        <button
                          className="btn btn-order-detail mb-sm-0 mb-4 blue-btn round-form text-uppercase me-2"
                          onClick={() => setDetailOrder(totalData[index])}
                        >
                          order details
                        </button>
                        {/*<button className="btn btn-reorder round-form text-uppercase">
                          reorder
                        </button>*/}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )
        ) : (
          <div className="list-panel row">
            <div className="item-panel row m-0 mb-3">
              <div className="title-panel loading d-md-block d-sm-flex  d-block col-md-3 p-0">
                <Skeleton variant="rect" width="100%" height="100%" />
              </div>
              <div className="order-panel col-md-9 p-0">
                <div className="product-panel d-flex flex-wrap">
                  <div className="image-panel hover-scale me-3 mb-3">
                    <Skeleton variant="rect" width="100%" height="100%" />
                  </div>
                  <div className="image-panel hover-scale me-3 mb-3">
                    <Skeleton variant="rect" width="100%" height="100%" />
                  </div>
                  <div className="image-panel hover-scale me-3 mb-3">
                    <Skeleton variant="rect" width="100%" height="100%" />
                  </div>
                </div>
                <div className="btn-panel d-sm-flex d-block align-items-center">
                  <Skeleton
                    variant="rect"
                    width={300}
                    height={35}
                    className="me-4"
                  />
                  <Skeleton variant="rect" width={300} height={35} />
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <h3 className="no-result text-center">No Result</h3>
      )}
    </div>
  );
}
