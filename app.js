const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const User=require('./models/user');
const bodyParser = require('body-parser');


// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })


mongoose.connect('mongodb+srv://Edmilson:1234@cluster0.yomux.mongodb.net/nodeAngular?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected'))
.catch((err)=> console.log(err));


app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
  

app.listen(3001, () => {
    console.log('App running at 3001')
})

app.post('/authenticate', jsonParser,(req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    User.findOne({username:username,password:password}).exec((err,user)=>{
        if(err)
            console.log(err);
        if(!user)
            res.status(400).json({status : false ,error : "Username or passsword is incorrect"});
        else 
            res.send({
                id: req.body.id,
                username: username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                token: 'fake-jwt-token'
            });
    });
});

app.post('/register',jsonParser, (req, res) => {
    console.log('here');
    const username=req.body.username;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const age=req.body.age;
    const height=req.body.height;
    const weight=req.body.weight;
    const breakfast=req.body.breakfast;
    const lunch=req.body.lunch;
    const dinner=req.body.dinner;
    const randomId=Math.random()*16;
    
    User.findOne({username:username}).exec((err,user)=>{
        if(err)
            console.log(err);
        if(!user){
            const newUser = new User({
                id : randomId,
                username : username,
                password : password,
                firstName : firstName,
                lastName:lastName,
                age:age,
                height:height,
                weight:weight,
                breakfast:breakfast,
                lunch:lunch,
                dinner:dinner
            }); 
            newUser.save()
            .then((result)=>{
                console.log("novooooooooooo "+newUser);
                res.send(result);
            })
            .catch((err)=>{
                console.log(err);
            })
            console.log('added');
            
        }
        else{
            res.status(400).json({"statusCode" : 400 ,"message" : 'Username "' + user.username + '" is already taken'});
        }
     });
     
});


app.post('/update',jsonParser, (req, res) => {
    console.log('here');
    const username=req.body.username;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const age=req.body.age;
    const height=req.body.height;
    const weight=req.body.weight;
    const breakfast=req.body.breakfast;
    const lunch=req.body.lunch;
    const dinner=req.body.dinner;
    const id=req.body.id;
    const newUser = new User({
        id : id,
        username : username,
        password : password,
        firstName : firstName,
        lastName:lastName,
        age:age,
        height:height,
        weight:weight,
        breakfast:breakfast,
        lunch:lunch,
        dinner:dinner
    }); 
    
    User.findOneAndUpdate({id: id}, 
        {
            id : id,
            username : username,
            password : password,
            firstName : firstName,
            lastName:lastName,
            age:age,
            height:height,
            weight:weight,
            breakfast:breakfast,
            lunch:lunch,
            dinner:dinner
        }
        
        
        , function(err, user) {
        if(err)
            console.log(err)
        else{
            console.log(req.params.username);
            console.log(user);
            console.log('estou aqui');
        }            
    });

     
});



app.delete('/delete/:id',urlencodedParser ,(req, res) => {
    const idToRemove=req.params.id;
    let i=0;
    User.findOneAndDelete({id: idToRemove}, function (err, docs) {
        if (err){
            res.status(400).json({"statusCode" : 400 ,"message" : err});
        }
        else{
            console.log("Deleted User : ", docs);
            i=1;
            
        }
    });
    if(i==1)
       res.send("User deleted");

});
app.get('/user/:id',urlencodedParser ,(req, res) => {
   
    const idToGet=req.params.id;
    console.log("Dentro get user username")
    let i=0;
    User.findOne({username: idToGet}, function (err, x) {
        if (err){
            res.status(400).json({"statusCode" : 400 ,"message" : err});
        }
        else{
          
            
            res.send({
                id : x.id,
                username : x.username,
                password : x.password,
                firstName : x.firstName,
                lastName:x.lastName,
                age:x.age,
                height:x.height,
                weight:x.weight,
                breakfast:x.breakfast,
                lunch:x.lunch,
                dinner:x.dinner}
            );
        }
    });
   
});


app.get('/users',(req, res) => {
    User.find({}).exec((err,user)=>{
        if(err){
            console.log(err);
            res.status(400).json({"statusCode" : 400 ,"message" : err});
        }
        else{
            let arr=[];
            for(let i=0;i<user.length;i++){
                arr.push({
                    id:user[i].id,
                    username:user[i].username,
                    password:user[i].password,
                    firstName:user[i].firstName,
                    lastName:user[i].lastName,
                    age:user[i].age,
                    height:user[i].height,
                    weight:user[i].weight,
                    breakfast:user[i].breakfast,
                    lunch:user[i].lunch,
                    dinner:user[i].dinner
                });    
            }
            
            res.send(arr);
        }    
    }); 
});






