const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

var app = express();

// /home/hp/NodeJs_Project/node_web_server 
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs');

// in middleware hast vaghti site offline bashe faghat in kar mikkone
app.use((req,res,next) =>{
    res.render('offline.hbs')
})

// in middleware hast ke che baray request ya response aval ina ejra maishavand bad baghie
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.writeFileSync('server.log',log +'\n')
    next();

})
// GET PUT POST PATCH DELETE ------------------> Http Request 
// http://www.roxo.ir/vuejs ----> GET Request 
//localhost:3000
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('currentYear',() =>{
    return new Date().getFullYear()
})

hbs.registerHelper('upperCase',(text) =>{
    return text.toUpperCase();
})
app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle:'صفحه اصلی سایت',
        WelcomeMessage:'به سایت ما rocky خوش امدید'

        
    })
})

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle:'درباره ما',
    })

})
app.listen(3000,() => {
    console.log('server run on port 3000')
});