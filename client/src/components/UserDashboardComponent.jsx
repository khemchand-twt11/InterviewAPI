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
      <h1 className="ml-28 text-5xl ">
        Hey, {JSON.parse(localStorage.getItem("user")).name}
      </h1>
      <div className="flex items-center justify-center h-[80vh]">
        <select
          id="select-option"
          value={selectedValue}
          onChange={handleSelectChange}
          className="mr-4 px-4 py-2 rounded border border-gray-300 focus:outline-none outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="node">Node</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="java">Java</option>
        </select>
        <button className=" px-4 py-2 bg-teal-500 hover:bg-green-700 text-white rounded">
          <Link to={`/Objective/${selectedValue}`}>Take Interview</Link>
        </button>
      </div>
    </div>
  );
}
