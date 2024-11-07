import { useState } from "react";

export default function HomePage({ onPageChange }) {
  const [allForms, setAllForms] = useState([]);
  return (
    <div>
      <div className="text-center">
        <p className="text-[40px]">Welcome to Form.com</p>
        <p>This is a simple form builder</p>
        <button
          className="bg-green-700 text-white text-sm mt-3 py-1 px-2 rounded shadow-lg"
          onClick={() => onPageChange("createForm")}
        >
          Create New Form
        </button>
        <div className="border-b-[1px] mt-3"></div>
        <p className="text-[40px] text-left">Forms</p>
      </div>
      {allForms.length < 1 ? (
        <p>You have no forms created yet</p>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}
