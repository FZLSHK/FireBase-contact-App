
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/Firebase";
import { deleteDoc, doc } from "firebase/firestore"; // Importing deleteDoc and doc from Firebase
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {isOpen ,onClose, onOpen} =useDisclouse();



  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div key={contact.id} className="flex items-center justify-around rounded-lg bg-yellow p-2">
          <div className="flex gap-1">
            <HiOutlineUserCircle className="text-4xl text-orange" />
            <div className="">
              <h2 className="font-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
          </div>
          <div className="flex text-3xl">
            <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
            <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" />
          </div>
        </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate  onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default ContactCard;
