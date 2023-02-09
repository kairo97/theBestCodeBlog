

// establishing dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
// set up express app for data parseing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(allRoutes);
app.get('/', (req, res) =>{
    res.send('hello and welcome')
})
app.get('/favecolor/:color',(req,res)=>{
    req.session.favColor = req.params.color
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