const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoclient = require('mongodb').MongoClient;
const modemailer = require('nodemailer');
const { 
    v4: uuidv4
  } = require('uuid');

const { ObjectId } = require('mongodb');

require('dotenv').config();

const corsoptions = {
    origin: 'http://localhost:3000',
    credentials:true
};

const app = express();
const port = 5000;
app.use(cors(corsoptions));
app.use(express.json());

let mdb;
mongoclient.connect(process.env.mongodb_conn, (err, cl) => {
    mdb= cl.db();
    app.listen(port);
    console.log('connected to mongodb');
});

app.post ('/gunkan/api/userlogin', async(req , res) => {
    const { uemail,upass} = req.body;

    const user = await mdb.collection('users').findOne({email: uemail});
    if(!user) {
        res.statusMessage=`user with email ${uemail} does not exist. retry`;
        return res.status(409).json();
    }
    else {
        if ( !user.isemailerified ) {
            res.statusMessage='please check your registered email verify it by click on the link in the mail.'+
                               'After verification you can login';
            return res.status(409).json();
        }
        else {
            
            const { _id,passwordhash } = user;
            const isCorrect=await bcrypt.compare(upass,passwordhash);
            if ( isCorrect ) 
            {
                jwt.sign(
                    {
                        _id: user._id,
                        email:uemail,
                        name:user.name,
                        bio: user.bio
                    } 
                    ,process.env.gunkan_jwt_secret 
                    ,{expiresIn: '30m'}
                    ,async (err, token) => { 
                        if (err) {  
                            res.statusMessage='token could not be generated . retry';
                            return res.status(500).json();
                        }
                        else {
                            return res.status(200).json({gunkanaccesstoken: token}) ;
                        }
                    }
                )
            }
            else {
                res.statusMessage=`credentials not correct. retry`;
                return res.status(409).json();
            }
      
        }
    }
})

app.post('/gunkan/api/usersignup', async (req,res)=>{
    const { uname,ubio,uemail,upass} = req.body;

    const user = await mdb.collection('users').findOne({email: uemail});
    if(user) {
        res.statusMessage=`user with email ${uemail} already exists. retry`;
        return res.status(409).json();
    }

    const hash = await bcrypt.hash(upass, 10);
    const verificationstr = await uuidv4();
    const result =await mdb.collection('users').insertOne({
        email:uemail,
        passwordhash: hash,
        name: uname,
        bio: ubio,
        isemailerified: false,
        verificationstring: verificationstr
    });

    
    const {insertedId, acknowledged}= result;
    if( acknowledged){
        jwt.sign(
            {
                _id: insertedId,
                email:uemail,
                name:uname,
                bio: ubio
            } 
            ,process.env.gunkan_jwt_secret 
            ,{expiresIn: '30m'}
            ,async (err, token) => {
                if(err) {
                    res.statusMessage='token could not be generated . retry';
                    return res.status(500).json();
                }
                else{
                    try {
                        // go to https://ethereal.email/
                        // create user to get the user and pass values.
                        const transporter =modemailer.createTransport({
                            host:'smtp.ethereal.email',
                            port: 587,
                            auth: 
                            {
                                user: 'caleigh.stroman96@ethereal.email'
                                ,pass: 'bHJdWsNtteG6nRde21'
                            }
                        });

                        const result_mail = await transporter.sendMail({
                            from:'from_address@gunkan_mail.com',
                            to: uemail,  
                            subject: 'please vertify the registerd email',
                            html: `<h5>gunkan email verification</h5> 
                                <p>you will need to click on the button below to verify the email address ${uemail} .</p>
                                <div> 
                                    <a style="display:block;width:30px;  margin-top: 15px; padding: 7px; border-radius: 3px; color: white; background-color: #4caf50; text-decoration: none" 
                                        href='http://localhost:3000/gunkan/verify-email-route/${verificationstr}' 
                                        target='_blank' >
                                        verify
                                    </a>
                                </div>
                                `                
                        });
                    }
                    catch(er) {
                        res.statusMessage =`verification email could not be sent. retry.`;
                        return res.status(500).json() ;
                    }

                    res.statusMessage=`user created successfully . verification mail has been sent to ${uemail}`;
                    return res.status(200).json({gunkanaccesstoken: token}) ;
                }
            }
        )
    }
    else 
    {
        res.statusMessage='user could not be created . retry';
        return res.status(500).json();
    }

});

app.get('/gunkan/api/forgotpwd/:email', async(req, res) => {
    const {email}= req.params;
    const verificationstr = await uuidv4();


    const result= await mdb.collection('users').updateOne({email: email} , {
        $set: { pwdresettoken: verificationstr}
    });

    if(result.modifiedCount > 0) {
        try{
            const transporter =modemailer.createTransport({
                host:'smtp.ethereal.email',
                port: 587,
                auth: 
                {
                    user: 'caleigh.stroman96@ethereal.email'
                    ,pass: 'bHJdWsNtteG6nRde21'
                }
            });

             const result_mail = await transporter.sendMail({
                            from:'from_address@gunkan_mail.com',
                            to: email,  
                            subject: 'reset password mail',
                            html: `
                                <p>you will need to click on the button below to reset your password  .</p>
                                <div> 
                                    <a style="display:block;width:30px;  margin-top: 15px; padding: 7px; border-radius: 3px; color: white; background-color: #4caf50; text-decoration: none" 
                                        href='http://localhost:3000/gunkan/resetpwdlanding/${verificationstr}' 
                                        target='_blank' >
                                        verify
                                    </a>
                                </div>
                                `                
                        });
        }
        catch(err) {
            console.log(err);
            

            res.statusMessage='password reset mail could not be sent . retry';
            return res.status(500).json();
        

        }
    }

    return res.status(200).json();
});

app.post('/gunkan/api/verifyresetpwd', async (req, res) => {
    const {verificationstr,newPassword} = req.body;


    
    const user = await mdb.collection('users').findOne({pwdresettoken: verificationstr});
    
    if(!user) {
        res.statusMessage = 'user with the passed token not found. retry';
        return res.status(401).json();
    }   
    else 
    {   
        const {email} = user;
        const hash = await bcrypt.hash(newPassword, 10);
        const result= await mdb.collection('users').updateOne({email} , {
            $set: { passwordhash: hash},
            $unset: {pwdresettoken:'' }
        });

        
        return res.status(200).json();   

    }
});


app.post('/gunkan/api/verifyemailr', async(req, res)=>{
    const {verificationstr} = req.body;
     
    const user = await mdb.collection('users').findOne({verificationstring: verificationstr});

    if(!user) {
        res.statusMessage = 'email verification code was not correct';
        return res.status(401).json();
    }
    else {
        const { _id : userid, email, name, bio, isemailerified} = user;

        if ( isemailerified == true) {
            res.statusMessage='email is already verified . please login.';
            return res.status(401).json();
        }
        else{
            await mdb.collection('users').updateOne({_id: ObjectId(userid)}, {
                $set : {isemailerified  : true}
            });

            jwt.sign({userid, email, isemailerified : true, name, bio }, 
                process.env.gunkan_jwt_secret, 
                {expiresIn: '30m'},
                async (err, token) => {
                    if(err) {
                        res.statusMessage='token could not be generated . retry';
                        return res.status(500).json();
                    }
                    else {
                        res.statusMessage='email is verified ';
                        return res.status(200).json({gunkanaccesstoken: token});
                    }
                }
            )
        }
    }
});
//------------------------------------------------------------------------------------------------------------------


app.post('/gunkan/api/addpost', async (req, res) => { 
    const {authorization} = req.headers;
    if( !authorization) {
        res.statusMessage = 'no auth header is there in the req.';
        return res.status(401).json();
    }
    else {
        
        const token = authorization.split(' ')[1];
        
        jwt.verify(token, process.env.gunkan_jwt_secret, async(err, decoded) => {
            if(err) {
                res.statusMessage= 'token could not be verified. cannot authenticate';
                return res.status(401).json();
            }
            else {
                const {email}  = JSON.parse ( token.split('.')[1] , 'base64');

                const {txtPost}  = req.body();
                const user =await  mdb.collection('users').findOne({email: email});
                if(user) {
                    const result = await mdb.collection('posts').insertOne({user_email: email, post_txt: txtPost });
                    
                }

            }
        })
    }
} );