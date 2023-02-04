//CR: Change file name

import React, { useRef, useState } from "react";
import winePic from "../image/top21.jpg";
import SearchPage from "./SearchPage"

/*Searchbar and photo for default landing page*/
function WineList() {
  const [formValue, setFormValue] = useState("");
  return (
    <>
      <img className="img" src={winePic} alt="tempoary" />

      <SearchPage/>
    </>
  );
}

const sendQuery = async (e) => {
  //send a query to database
};

export default WineList;
