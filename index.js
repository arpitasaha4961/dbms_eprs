const express = require("express")
const path = require('path');
const app = express();
const {query} = require("./db");


const port =process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname)))
//setting up view engine
app.set("view engine", "ejs");

//setting middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/', (req,res)=>{
    res.render('index')
});

app.get('/getEmployeeNames', async (req, res) => {
    await getUserInfo()[0];
});

app.post('/userLogin', async(req, res) => {
    // console.log(req.body, req.query);
    const EMAIL = req.body.email;
    const PASS = req.body.pass;
    const response = await getUserInfo(EMAIL)
    if(PASS === response[0].password) {
        console.log('user login successfull');
    } else {
        console.log('user login failed');
    }
})


const getUserInfo = async(EMAIL) => {
    const sql = `SELECT * FROM employees WHERE email='${EMAIL}'`;
    console.log(sql);
    let result = await query(sql);
    console.log(result);
    return result;
}

app.listen(port, () =>console.log(`server started on port ${port}`))

