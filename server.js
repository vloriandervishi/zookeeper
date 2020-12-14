const {animals}=require('./data/animals.json');
const express= require('express');
const app = express();


//The first is that the get() method requires two arguments. 
//The first is a string that describes the route the client will have to fetch from. 
//The second is a callback function that will execute every time that route is accessed with a GET request.
app.get('/api/animals',(req,res)=>{
    let results= animals;
    console.log(req.query);
    // The second takeaway is that we are using the send() method 
    // from the res parameter (short for response) to send the string Hello! to our client.
     res.json('animals');
 });
app.listen(3001,()=>{
    console.log(`API server now on port 3001!`);
});
