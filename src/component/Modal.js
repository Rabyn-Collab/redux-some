import { useSelector } from "react-redux";
import CrudForm from "./CrudForm"


const Modal = () => {


  return (
    <div>
      <div className="fixed inset-0  bg-black bg-opacity-30 flex justify-center items-center ">

        <CrudForm />


      </div>
    </div>
  )
}

export default Modal
