import express, { response } from 'express';
import { connectToMongoDB } from './src/config';
import contactRoutes from './src/routes/contactRoutes';
// import userRoutes from './src/routes/userRoutes';
import {sendmail} from './src/mailer';
import { userRoutes } from './src/routes/userRoutes';


const app = express();
const PORT  = 4000;

connectToMongoDB();

const loggerMiddleware = (req, res, next) => {
    console.log(req.method);
    console.log(req.body);
    next();
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(loggerMiddleware);

contactRoutes(app)
userRoutes(app);

app.get('/', (req,res) => {
    res.send(`Node and express server running on port ${PORT}`)
});




const firstMiddleware = (err, req, res, next) => {
    console.log("I'm First Middleware");
    
}

const secondMiddlware = (requestObject, responseObject, nextMiddleWare) => {
    responseObject.send("<h1>Second Middleware</>");
    // nextMiddleWare();
}

// app.get('/friendlist', isLoggedIn , getMyFriends );

app.get('/sendmail', (req,res) => {
    sendmail("princem.vips@gmail.com", "Uri Uri Baba");
    res.status(200).send("done")
})

const middleware1 = (req, res, next) => {
    console.log("I'm middleware 1");
    next()
}

const middleware2 = (req, res) => {
    res.send("I'm middleware 2");
}

app.get('/test', middleware2, middleware1);

app.post("/testmail", (req, res) => {
    sendmail(req.body.email, req.body.html);
    res.send("Mail sent");
})

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
})



