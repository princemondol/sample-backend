import mongoose from 'mongoose';
import { ContactSchema } from '../model/contactModel';

const Contact = mongoose.model("Contact", ContactSchema);


export const addNewContact = (req, res) => {
    let  newContact = new Contact(req.body);
    newContact.save((err, newContact) => {
        if (err) {
            res.send(err);
        }
        res.json(newContact);
    });
}

export const getAllContacts = (req, res) => {

    Contact.find({},(err, contacts) => {
        if (err)
            res.send(err)
        
        res.json(contacts)
    })

} 

export const getOneContact = (req, res) => {
    // param name should be same in routes like /path/:contactID
    Contact.findById(req.params.contactID,(err, contact) => {
        if (err)
            res.send(err)
        
        res.json(contact)
    })

}

export const updateOneContact = (req, res) => {
    // param name should be same in routes like /path/:contactID
    // new:true means will return updated object
    // useFindAndModify : false to remove deprecation warnings
    Contact.findOneAndUpdate({ _id: req.params.contactID}, req.body, {new : true, useFindAndModify: false} ,(err, contact) => {
        if (err)
            res.send(err)
        
        res.json(contact)
    })

}

export const deleteContact = (req, res) => {
    // param name should be same in routes like /path/:contactID
     Contact.remove({ _id: req.params.contactID}, (err, contact) => {
        if (err)
            res.send(err)
        
        res.json({ message: "Contact deleted successfully"})
    })

}