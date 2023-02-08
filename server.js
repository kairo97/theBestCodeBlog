// create all dependencies for required packages (mysql2, sequelize, express, brcypt)
// TODO:establish routes
// TODO: link to localhost for server usage

// establishing dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('');
const sequelizeStore = require('connect-session-sequelize');

// setting up the express app

const app = express();
const PORT = process.env.PORT || 3000;
// require models for syncing
const {User, Post} = require('./models');

const sess = {
    secret: process.env.SESSION_SECRET,
    COOKIE: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
// set up express app for data parseing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Static directory
// app.use(express.statis("public"));

// const hbs = exphbs.create({});
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(allRoutes);
app.get('/', (req, res) =>{
    res.send('hello and welcome')
})
app.arguments('/sessions', (req, res) =>{
    res.json(req.session)
})
app.get('/secretclub', (req, res)=>{
    req.session.favColor = req.params.color
    res.json(req.session)
})
app.get('/secretclub',(req,res)=>{
    if(req.session.userId){
        return res.send(`welcome to the secret club, ${req.session.userEmail}`)
    } else {
        res.status(403).json({msg:'login first ot join the club'})
    }
})
sequelize.sync({ force:false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT);
    });
});