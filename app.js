const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Creating environment variables 
const PORT = process.env.PORT || 3000;

// We have total 4 Methods in RESTful API using Express 
// also known as CRUD operations 
// 1. GET    (Create)
// 2. POST   (Read)
// 3. PUT    (Update)
// 4. Delete (Delete) 

const items = [];

// Process application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//                      1. GET (Create)
//  (i) Get homepage 
app.get('/', (req, res, next) => {
    res.write('<h1 align="center">Hi enter an input for POST request</h1>');
    res.write('<form align="center" action="/" method="POST"><input type="text" name="message"></input><br><button type="submit">Sybmit</button></form>');
});
//  (ii) Get page to show items
app.get('/api/items', (req, res, next) => {
    res.send(items);
});
//  (iii) Get parameters
app.get('/api/items/:id', (req, res, next) => {
    let id = (req.params.id);
    id = parseInt(id[1]);

    //  Check if that items is valid or not 

    if ((id < items.length) && (id >= 0))
        res.send(items[id]);

    else
        res.send('<h1>Item not found</h1>');
});
//  (iv) Get query 
app.get('/api/items/?sortBy=name', (req, res, next) => {
    // Will send what query in page
    res.send(req.query);
});


//                      2. POST   (Read)
app.post('/', (req, res, next) => {

    //  We should never trust client and always validate input 
    // Input can be validate best using Joi(npm package)
    const item = {
        id: items.length + 1,
        item: req.body.message
    }
    items.push(item);
    // items.push(req.body.message);
    // console.log(items);
});


//                      3. PUT    (Update)
app.put('/api/items/:id', (req, res, next) => {
    //  Check if it Exist 

    //  i   If not exixst - 404 

    //  ii  Then validate new input 

    //  iii Update and return 
    item.item = req.body.message;
    res.send(items);
});


//                      4. Delete (Delete) 
app.delete('/', (req, res, next) => {
    //  Check if it Exist 

    //  i   If not exixst - 404 

    //  ii  Delete and return 
    let id = (req.params.id);
    id = parseInt(id[1]);
    items.splice(id, 1);
});

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
    res.end();
    // res.redirect('/');
    // app.next;
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
