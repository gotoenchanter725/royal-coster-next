import Link from "next/link";
import NumberFormat from "react-number-format";


export default function WatchItems({ watchData }) {
  return (
    <>
      {
        watchData.map((watch, index) => {
          return (
            <div className="watch_item-panel mt-5 pb-5" key={index}>
              <div className="title-panel row m-0 py-4">
                <h3 className="title col-lg-4 col-md-6 col-12 text-capitalize blue-text">{watch.itemTitle}</h3>
              </div>
              <div className="item-panel py-5 row">
                {
                  watch.items.map((item, id) => {
                    return (
                      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={id}>
                        <Link href={item.url}>
                          <a>
                            <div className="image-panel round hover-scale mb-3">
                              <img src={"/img/watch/" + item.image} className="item-image" alt="watch-image" />
                            </div>
                          </a>
                        </Link>
                        <h4 className="item-title text-capitalize mb-3">{item.title}</h4>
                        <p className="item-id text-capitalize mb-4">{item.id}</p>
                        <h3 className="item-cost text-uppercase">
                          <NumberFormat
                            value={item.cost}
                            displayType="text"
                            decimalScale={2}
                            fixedDecimalScale={true}
                            thousandSeparator={true}
                            prefix="€ "
                          />
                        </h3>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </>
  );
}
