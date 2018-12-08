const userService = require("../service/users");

const profile =  async (req,res) => {
    const {id} = req.decoded;
    const result = await userService.getProfile(id);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {profile};