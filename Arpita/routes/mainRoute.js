const router = require('express').Router();
const mysql = require('mysql');


// Database Code.
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'project1'
});

db.connect(err => {
   if(err) {
      console.log('Cannot connect to database');
   }
   else {
      console.log('connected to database');
   }
});


// Route.
router.get('/', (req, res) => {
   res.send('This is the main page.');
})
router.get('/post', (req, res) => {
   res.render('post');
})
router.get('/showpost', (req, res) => {
   const sql = `SELECT * FROM post`;
   db.query(sql, (err, result) => {
      res.render('showpost', {posts: result});
   });
})
router.post('/post', (req, res) => {
   const sql = `INSERT INTO post(title, category, content, time, employeesid)
                           VALUES(${db.escape(req.body.title)}, ${db.escape(req.body.category)}, ${db.escape(req.body.content)}, now(), 1)`;
   db.query(sql);
   res.redirect('/');
})

module.exports = router;
