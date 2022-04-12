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
        subject: 'Your goal: '+goal.name+' completion date is today!',
        text: 'Goal content: '+goal.content
    }
    transporter.sendMail(mailDetails, (error, info)=>{
        if(error) console.error(error)
    })
}
export { sendEmail}