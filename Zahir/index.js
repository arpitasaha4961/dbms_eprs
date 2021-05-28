const express = require("express")
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const {query} = require("./db");


const port =process.env.PORT || 5000;
let user;
// app.use(express.static(path.join(__dirname)))
//setting up view engine
app.set("view engine", "ejs");

//setting middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.render('index')
});

app.get('/getEmployeeNames', async (req, res) => {
    await getUserInfo()[0];
});

app.get('/addTask', (req, res) =>{
    res.render('addtask');
});

app.post('/createTask',async (req, res) => {
    console.log(req.body);
    const sql = `INSERT INTO daily_work (title, description, time, deadline, project_point, employeesid) VALUES ('${req.body.title}','${req.body.description}',NOW(),'${req.body.deadline}',${req.body.point},${req.body.eid})`;
    await query(sql);
    console.log(sql);
    console.log(req.cookies['loggedin_id']);
    const id = await getUserInfo('id', parseInt(req.cookies.loogedin_id));
    res.render('account', {type: id[0].type});
})

app.post('/userLogin', async(req, res) => {
    // console.log(req.body, req.query);
    const EMAIL = req.body.email;
    const PASS = req.body.pass;
    const response = await getUserInfo('email',`'${EMAIL}'`)
    if(PASS === response[0].password) {
        console.log('user login successfull');
        user = response[0];
        res.cookie("loogedin_id", response[0].id);
        res.render('account', {
            type: response[0].type
        });
    } else {
        console.log('user login failed');
        res.render('index');

    }
})


const getUserInfo = async(feild, val) => {
    const sql = `SELECT * FROM employees WHERE ${feild}=${val}`;
    console.log(sql);
    let result = await query(sql);
    console.log(result);
    return result;
}

app.listen(port, () =>console.log(`server started on port ${port}`))

