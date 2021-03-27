import {addNewContact, 
        getAllContacts,
        getOneContact,
        updateOneContact, 
        deleteContact } from "../controller/contactController";

      


const routes = (app) => {
    app.route('/contacts')
        .get(getAllContacts)
        .post(addNewContact);

    app.route('/contacts/:contactID')
        .get(getOneContact)
        .put(updateOneContact)
        .delete(deleteContact)

    
    
}

export default routes;