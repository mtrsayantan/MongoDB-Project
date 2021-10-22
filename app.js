const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Task = require('./server/model/taskSchema');
//express app
const app = express();
//connect to mongodb
const dbURI = 'mongodb+srv://mtrsayantan:task1234@cluster1.w9zrw.mongodb.net/mongodb-project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

dotenv.config({path :'.env'})
const PORT = process.env.PORT ||5000
//set view engine
app.set("view engine","ejs")

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//get request handler
app.get('/',(req,res)=>{
    Task.find()
    .then((result) => {
        res.render('index',{tasks: result})
    })
    .catch((err) => {
        console.log(err);
    })
})
app.get('/newTask',(req,res) => {
    res.render('newTask')
})
app.get('/edit/:id',(req,res) => {
       const id = req.params.id;
       Task.findById(id)
        .then((result) => {
            res.render('edit',{task: result});
       })
       .catch((err) => {
           console.log(err);
       })
})
//Create
app.post('/',(req,res)=>{
    const task = new Task(req.body);
    task.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
})
//Read
app.get('/:id',(req, res) =>{
    const id = req.params.id;
    Task.findById(id)
        .then(result => {
            if(result.Completed==false){
                res.render('task',{task: result});
                console.log(result)
            }else{
                res.send("This task is already completed.");
            }    
        })
        .catch(err => {
            console.log(err);
        })
})
//update
app.put('/edit/:id',(req, res) =>{
    const id = req.params.id;
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then((result) => {
            if(!result){
                res.status(404).send({message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{ 
                res.json({redirect:'/'}); 
            }
        })
        .catch(err => {
            console.log(err);
        })
})
//delete
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(result => {
           res.send("Task deleted!") 
        })
        .catch(err => {
            console.log(err);
        })
})
