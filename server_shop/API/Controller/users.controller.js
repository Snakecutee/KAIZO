
const Users = require('../../Model/users.model')

module.exports.index = async (req, res) => {

    const users = await Users.find()

    res.json(users)

}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const users = await Users.findOne({ _id: id})

    res.json(users)

}

module.exports.signup = async (req, res) => {

    const fullname = req.query.fullname

    const email = req.query.email

    const password = req.query.password

    const phone = req.query.phone

    const data = {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
    }

    Users.insertMany(data)

    res.send("Thanh Cong")

}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const users = await Users.findOne({email, password});

    if (users) {
        res.json(users);
    } else {
        res.json("false");
    }
}
module.exports.deleteUser = async (req, res) => {
    const { userId } = req.params; // Lấy userId từ params
    try {
        const result = await Users.deleteOne({ _id: userId }); // Xóa người dùng
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'User not found' }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete user', error });
    }
};