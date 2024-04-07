import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, updateDoc , doc } from "firebase/firestore";
import { db } from "../config/Firebase";
import Modal from "./Modal";
import { toast } from "react-toastify";
import * as Yup from 'Yup';


const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required")

})


const AddAndUpdateContact = ({ isOpen, onClose , isUpdate ,contact}) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose(); 
      toast .success("contact Added SuccessFully")
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact ,id ) => {
    try {
      const contactRef = doc(db, "contacts" , id);
      await updateDoc(contactRef, contact);
      onClose(); 
      toast .success("contact Update SuccessFully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik 
      validationSchema={contactSchemaValidation}
        initialValues={isUpdate? {
            name: contact.name,
            email:contact.email,
        }: 
        {
           name : "",
           email : "",
        }}
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? updateContact(values, contact.id) :
          addContact(values);
        }}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border" />
            <div className="text-xs text-red.500">
              <ErrorMessage name="name"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <Field name="email" type="email" className="h-10 border" />
            <div className="text-xs text-red.500">
              <ErrorMessage name="email"/>
            </div>
          </div>
          <button type="submit" className="self-end bg-orange px-3 py-1.5">
            {isUpdate ? "update" : "add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
