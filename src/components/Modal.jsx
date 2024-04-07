
import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"


const Modal = ({onClose , isOpen, children}) => {
  return createPortal(
     <>
     {isOpen && (
       <div  className="absolute top-0 z-40 w-screen h-screen backdrop-blur">
     <div className=" grid place-items-center relative z-50 m-auto min-h-[200px] max-w-[80%] bg-white p-4">
      <div className="flex justify-end">
        <AiOutlineClose 
        onClick={onClose} 
        className="self-end text-2xl"/>
      </div>
      {children}
     </div>
     <div onClick={onClose} 
     className=" absolute top-0 z-40 w-screen h-screen backdrop-blur  "/>
     </div>
     )}
     </>
  ,document.getElementById("Modal-root"))
};

export default Modal

