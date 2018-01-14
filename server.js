const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 4000;

var app=express();
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamit',(text)=>{
  return text.toUpperCase();
});



app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to find server.log');
    }
  })
  next();
});

// app.use((req,res,next)=>{
//   res.render('main.hbs');
// });

app.use(express.static(__dirname+'/public'));

// app.get('/',(req,res)=>{
//   // res.send('<h3>Hello Express!!</h3>');
//   res.send({
//     name:'Harshit',
//     likes:[
//      'ListeningMusic',
//      'Playing'
//     ]
//   })
// })

app.get('/',(req,res)=>{
  // res.send('<h3>Hello Express!!</h3>');
  res.render('home.hbs',{
    title:'Home Page',
    welcomeMessage:'Welcome to NodeJS',
    // currentYear:new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    title:'About Page',
    // currentYear:new Date().getFullYear()
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    errorMessage:'Bad Request',
    message:'Hello',
    message1:'hello1'
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}.`);
});
