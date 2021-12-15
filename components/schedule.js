import React, { useState, useRef, useEffect } from "react";
import MailList from "./mailList";
import Visit from "./visit";

export default function Schedule() {
  return (
    <div className="schedule ">
      <Visit />
      <MailList />
    </div>
  );
}
