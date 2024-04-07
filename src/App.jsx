import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/Firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";
  

const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen ,onClose, onOpen} =useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
      
        onSnapshot (contactsRef ,(snapshot) =>{
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
        })
        setContacts(contactLists);
        return contactLists;
      
        });
     
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
    
   const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
      
    onSnapshot (contactsRef ,(snapshot) =>{
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
    })

    const filteredContact = contactLists.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase()))

    setContacts(filteredContact);
    return filteredContact;
  
    });
   }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input onChange={filterContacts}
              type="text"
              className="flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-9"
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl cursor-pointer text-white"
            />
          </div>
        </div>
        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? (
          <NotFoundContact/>
          ) : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center"
      />
    </>
  );
};

export default App;
