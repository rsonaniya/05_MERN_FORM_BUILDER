import { useState } from "react";
import HomePage from "./components/HomePage";
import CreateForm from "./components/CreateForm";

export default function App() {
  const [activePage, setActivePage] = useState("");

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  return (
    <div className="w-full md:w-[700px] mx-auto mt-5">
      {(activePage === "" || activePage === "home") && (
        <HomePage onPageChange={handlePageChange} />
      )}
      {activePage === "createForm" && (
        <CreateForm onPageChange={handlePageChange} />
      )}
    </div>
  );
}
