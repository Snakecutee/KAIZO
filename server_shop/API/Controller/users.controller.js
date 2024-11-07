
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
module.exports.updateUserStatus = async (req, res) => {
    const { userId } = req.params;  // Get userId from URL parameter
    const { isActive } = req.body;  // Get the status from request body
  
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: "isActive must be a boolean value" });
    }
  
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }  // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser); // Return the updated user data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
