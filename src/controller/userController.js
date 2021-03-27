import mongoose from 'mongoose';
import { sendmail } from '../mailer';
import { UserSchema } from '../model/userModel';
import bcrypt from 'bcrypt';
import { v4 as uuidHash } from 'uuid';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const User = mongoose.model("user", UserSchema);

export const addNewUser = async (req, res) => {
    console.log(req.body.password);
    req.body.password = await hashPass(req.body.password);
    
    let newUser = new User(req.body);

    newUser.save((err, newUser) => {
        if (err) {
            res.status(500).send(err)
        }
        // sendmail(req.body.email,`Welcome to my app, <a href="http://localhost:4000/users/confirm/${newUser.confirm}">Please click here to confirm your email</a> `)
        res.status(201).json(newUser);
    })
}

export const confirmUser = (req, res) => {

    User.findOneAndUpdate({ confirm: req.params.confirmationHash }, { confirm: "1"}, {new:true, useFindAndModify: false}, (err, updatedUser) =>{
        if (err)
            res.status(500).send(err);

       res.status(200).json({message: `User ${updatedUser._id} was confirmed successfully.`}) 
    })

}

export const getOneUser = (req, res) => {

    User.findById(req.params.userID, (err, user) => {
        if (err)
            res.status(500).send(err)

        res.json(user);
    })

}

const hashPass = async (pass) => {
  
        const salt = await bcrypt.genSalt();
        // console.log(`Salt : ${salt}`);
        const hashedPassword = await bcrypt.hash(pass, salt);
        // console.log(`Hashed ${hashedPassword}`);
        return hashedPassword;

    
}

export const updateOneUser = async (req, res) => {
    
    if (req.body.password) {
        req.body.password = await hashPass(req.body.password);
    }

    if(req.email.password) {
        req.body.confirm = uuidHash();
    }
    

    User.findOneAndUpdate({ _id: req.params.userID}, req.body, {new:true, useFindAndModify: false}, (err, updatedUser) =>{
        if (err)
            res.status(500).send(err);

        if(req.email.password) {
            sendmail(req.body.email,`Welcome to my app, <a href="http://localhost:4000/users/confirm/${req.body.confirm}">Please click here to confirm your email</a> `)
        }
       res.status(200).json(updatedUser); 

    } )

}

export const authenticate = (req, res) => {

    User.findOne({email : req.body.email} , async (err, user) => {
        if (user === null) {
            res.send("Erorr : Invalid email, user does not exist");
        } else {
            let passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
                if(user.confirm === "1") {
                    // Generate jwt 
                    let token = jwt.sign({ userid: user._id }, process.env.MY_PRIVATE_KEY);
                    res.status(200).json({ access_token : token });
                }else {
                    res.status(401).json({message : "Unauthorized, please confirm your email"});
                }
                

            } else {
                res.send("Login error: please check your password")
            }
        }
    })

}

export const loginRequired = (req, res, next) => {

    if(req.authUser) {
        next();
    } else {
        res.status(401).json({message : "Unauthorized user, please login to see this data"});
    }

}