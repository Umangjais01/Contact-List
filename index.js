const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact =  require('./models/contact');

//const doc = await Model.create('./models/contact'); 


const app= express();

app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views')); 
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name: "Alice",
        phone: "100"
    },
    {
        name: " Bob",
        phone: "101"
    },
    {
        name: "John",
        phone: "102"
    }
]

app.get('/', async function(req, res) {
    try {
      const contacts = await Contact.find({});
      return res.render('home', { 
        title: 'My Contact List',
        contact_list: contacts
      });
    } catch (error) {
      console.log('Error in fetching contacts from db', error);
      return;
    }
  });
  
// app.get('/practice',function(req,res){
//     return res.render('practice',{
//         title: "Lets play"
//     });
// });


app.post('/create-contact', async function(req, res) {
  try {
    await Contact.create({
      name: req.body.name,
      phone: req.body.phone
    });
    console.log('Contact created successfully!');
    return res.redirect('back');
  } catch (err) {
    console.log('Error in creating a contact:', err);
    return res.status(500).send('Error in creating a contact');
  }
});

// for deleting contact
app.get('/delete-contact', async function(req, res) {
    try {
        // get the id from query in the url
        let id = req.query.id;

        // find the contact in the database using id and delete
        await Contact.findByIdAndDelete(id);

        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting an object from database', err);
        return res.status(500).send('Internal Server Error');
    }
});



app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('My express server is running on port:',port);
    
});

