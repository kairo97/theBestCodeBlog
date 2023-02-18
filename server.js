

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

app.use('/',allRoutes);
app.get('/sessions', (req,res)=>{
    res.json(req.session)
})




sequelize.sync({ force:false}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT);
    });
});