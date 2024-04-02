import { Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";
import DetailsPopup from "./components/DetailsPopup";
import { DialogForm } from "./components/DialogForm";
import AlertPopup from "./components/AlertPopup";

function App() {
  
  return (
    <>
    <DetailsPopup/>
    <DialogForm/>
    <AlertPopup/>
    <div className="w-screen h-max px-4 sm:px-10 box-border h-screen">
      <Routes>
        <Route path="/" element={<Users/>}/>
      </Routes>
    </div>

    </>
  );
}

export default App;
