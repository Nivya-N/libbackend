const express = require('express');
var app = new express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
const Bookdata = require('./src/models/Bookdata');
const Authordata = require('./src/models/Authordata');
const Userdata = require ('./src/models/Userdata');
username_admin = 'admin';
password_admin = '1234';
username_user = 'user';
password_user = '1234';
const path = require('path');
app.use(express.static('./dist/Frontend'));

app.get('/',function(req,res){
    console.log("welcome");
})

app.get('/api/books',function(req,res){
   //console.log("in backend book");
    Bookdata.find()
                .then(function(books){
                    //console.log(books);
                    res.send(books);
                });
});

app.get('/api/books/:id',  (req, res) => {
  
    const id = req.params.id;
    //console.log("id is",id);
      Bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })

  app.get('/api/author/:id',  (req, res) => {
  
    const id = req.params.id;
    //console.log("id is",id);
      Authordata.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  })

app.post('/api/insert',function(req,res){
   
   // console.log(" in backedn",req.body);
   
    var book = {       
        title : req.body.bookitem.title,
        author : req.body.bookitem.author,
        genre : req.body.bookitem.genre,
        image : req.body.bookitem.image,
   }       
   var book = new Bookdata(book);
   book.save();
});

app.put('/api/update',(req,res)=>
{
    console.log(" updat backend")
    console.log(req.body);
    id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    genre = req.body.genre,
    image = req.body.image;
    
    
   Bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "genre":genre,
                                "image":image,
                                }})
   .then(function(){
       res.send();
   })
 })

 app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })


app.get('/api/authors',function(req,res){
   // console.log("Author here");
    Authordata.find()
                .then(function(authors){
                    res.send(authors);
                });
});

app.post('/api/addauthor',function(req,res){
   
    // console.log(" in backedn",req.body);
    
     var author = {       
         name : req.body.authoritem.name,
        
         image : req.body.authoritem.image,
    }       
    var author = new Authordata(author);
    author.save();
 });

 app.put('/api/updateauthor',(req,res)=>
{
    console.log(" updat backend")
    console.log(req.body);
    id=req.body._id,
    name= req.body.name,
    
    image = req.body.image;
    
    
   Authordata.findByIdAndUpdate({"_id":id},
                                {$set:{"name":name,
                                
                                "image":image,
                                }})
   .then(function(){
       res.send();
   })
 })

 app.delete ('/api/removeauthor/:id',(req,res)=>{
   
    id = req.params.id;
    Authordata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

  app.post('/api/login',function(req,res){
    let userData = req.body;
    console.log(userData);
    Userdata.findOne({name:userData.uname,password:userData.pwd},function(err,user){
        console.log(user);
     if(user!==null){
        
        let payload = {subject: username_user+password_user};
        let token = jwt.sign(payload, 'userkey');
        res.status(200).send({token});
    }
    else if (userData.uname=='admin'&&userData.pwd=='1234'){
        //console.log(username,password);
        let payload = {subject: username_admin+password_admin};
        let token = jwt.sign(payload, 'adminkey');
        res.status(200).send({token});
    }
    else{
        res.status(401).send("Invalid credentials");

    }

})   
})
app.post('/api/signup',  function(req,res){
    //res.send("added");
   // console.log(req.body);
    var item = {
        name : req.body.useritem.uname,
        email : req.body.useritem.email,
        mobile : req.body.useritem.mobile,
        password : req.body.useritem.pwd
    
    }
    //console.log(item);
    
            
            
                    var user = new Userdata(item);
                    user.save();//saving to database
                
            
            
        
    
    
    // alert("User added");
   

})




app.listen(3000, function(){
    console.log('listening to port 3000');

    
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
    });