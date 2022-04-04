import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config('.env')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
function sendEmail(email, goal){
    const mailDetails = {
        from: 'thomasknechtel42@gmail.com',
        to: email,
        subject: 'Your goal: '+goal.name+' completion date is 1 day away!',
        text: 'Goal content: '+goal.content
    }
    transporter.sendMail(mailDetails, (error, info)=>{
        if(error) console.error(error)
    })
}
sendEmail('thomasknechtel42@gmail.com', {name:'Lose weight', content: 'lose 10 pounds by friday'})