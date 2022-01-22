const { User } = require("../models/user.model");

const getUserData = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId);
        const user = await User.findById(userId);

        const { firstName } = user;
        const username = `${firstName}`

        res.json({ 
            success: true,
            username
        })

    } catch(error) {
        console.log(error);
        res.status(404).json({
            success: "failed",
            error: "Cannot find user",
            errorMessage: error.message
        })
    }
};

module.exports = {
    getUserData
}