import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserDashboardComponent() {
  const [selectedValue, setSelectedValue] = useState("javascript");

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <select
        id="select-option"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
        <option value="node">Node</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="java">Java</option>
      </select>
      <button>
        <Link to={`/Objective/${selectedValue}`}>Take Interveiw</Link>
        {/* <Link to={`/interview/${selectedValue}`}>Take Interveiw</Link> */}
      </button>
    </div>
  );
}
