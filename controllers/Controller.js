const  nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.API_SENDGRID,
        },
    })
);


const sendEmailController = (req,res) =>{
    try{
        const {name, email, msg} = req.body;

        //validation
        if(!name || !email || !msg){
            return res.status(500).send({
                success: false, message: 'Please Provide All Fields'
            });
        }

        //email matter
        transporter.sendMail({
            to: 'akshaysharmad123@gmail.com',
            from: 'akshaysharmad123@gmail.com',
            subject: 'regarding mern-portfolio app',
            html: `
                <h5>Detail Information</h5>    
                <ul> 
                    <li><p>Name: ${name} </p></li>
                    <li><p>Email: ${email} </p></li>
                    <li><p>Message: ${msg} </p></li>
                </ul>        
            `
        })

        return res.status(200).send({
            success: true,
            message: "Your message sent successfully",
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'send email api error',
            error,
        });
    }
};

module.exports = {sendEmailController};