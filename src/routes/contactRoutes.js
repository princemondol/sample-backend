import {addNewContact, 
        getAllContacts,
        getOneContact,
        updateOneContact, 
        deleteContact } from "../controller/contactController";
import { loginRequired } from "../controller/userController";

      


const routes = (app) => {
    app.route('/contacts')
        .get(loginRequired,getAllContacts)
        .post(addNewContact);

    app.route('/contacts/:contactID')
        .get(getOneContact)
        .put(updateOneContact)
        .delete(deleteContact)

    
    
}

export default routes;