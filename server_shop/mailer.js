
const nodeMailer = require('nodemailer')

const adminEmail = 'vandai00112@gmail.com' // Email

const adminPassword = 'vandai1@' // Password

//  host của google - gmail
const mailHost = 'smtp.gmail.com'

// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    // Khởi tạo một transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, // nếu các bạn dùng port 465 (smtps) thì để true
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })

    const options = {
        from: adminEmail, // địa chỉ admin emaildùng để gửi
        to: to, // địa chỉ gửi đến
        subject: subject, // Tiêu đề của mail
        html: htmlContent 
    }
    
    // hàm transporter.sendMail() này sẽ trả về một Promise
    return transporter.sendMail(options)
    
}

module.exports = {
    sendMail: sendMail
}
