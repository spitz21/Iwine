import {React, useState} from "react";
import "../App.css";

function SearchPage() {
    const [formValue, setFormValue] = useState("");
    return(
        <>
        <form onSubmit={sendQuery}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter Wine Name Here"
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>

      <ol>
        <li>1. Enclosed above, beneath, before, behind</li>
        <li>2. In green uncertainty, from which a shark</li>
        <li>3. At any time may dash</li>
        <li>4. And doom you like some huge demonic fate...</li>
        <li>......</li>
      </ol>
      </>
    )
}

const sendQuery = async (e) => {
    //send a query to database
  };
export default SearchPage;