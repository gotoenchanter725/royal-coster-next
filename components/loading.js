import { useEffect, useState } from "react";
import { ClipLoader, PuffLoader } from "react-spinners";

export default function Loading({ loading }) {
  // const [disabled, setDisabled] = useState(loading);
  
  // useEffect(() => {
  //   if (loading) document.body.style.overflow = "hidden";
  //   else document.body.style.overflow = "visible";
  // });

  // useEffect(() => {
  //   if (!loading) document.body.style.overflow = "visible";
  //   else document.body.style.overflow = "hidden";
  // }, [disabled]);

  return (
    <div
      id="loading"
      className={
        "d-flex justify-content-center align-items-center " +
        (loading ? "" : "d-none")
      }
    >
      <ClipLoader color={"#021f3c"} loading={loading} size={45} />
    </div>
  );
}
