// Import Package
require("./db/conn");

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('./config');
const Feedback=require("./models/feedback");

const port= process.env.PORT || 3000;
// Set Package
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Server Start Notification
app.listen(3000, () => console.log("Server Started on port 3000..."));

// Get Index Page Request
app.get ('/', (req, res) => {
    res.render(config.theme);
});

// Post Email Request
app.post('/send', async(req, res) => {

        const feedback = new Feedback({
                //ID: req.user._id,
                Question1:req.body.q1,
                Question2:req.body.q2,
                Question3:req.body.q3,
                Question4:req.body.q4,
                Question5:req.body.q5,
                Message:req.body.text
        })
        console.log(req.body)
        const fb = await feedback.save(
                function(err){ if(err)
                        { 
                                console.log(err); 
                                return; 
                        }  
                }
                );
        
        res.status(201).render("index")
});
        