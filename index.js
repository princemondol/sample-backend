import express from 'express';
import { connectToMongoDB } from './src/config';
import routes from './src/routes/contactRoutes';

const app = express();
const PORT  = 4000;

connectToMongoDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

routes(app);

app.get('/', (req,res) => {
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
})

