require("dotenv").load();
const uuid = require("short-uuid")();
const jwt = require("jsonwebtoken");
const mailService = require("./mail");
const config = require("./../config");
const { User } = require("../models/users");


const confirm = async (email, id, token) => {
  if (id === extractIdFromToken(token)) {
    await User.update({_id: id},{ emailConfirmed: true });
    return { success: true };
  } else return {error: "Id provided does not match authentication token"};
};

const register = async (email, firstName, type) => {
  try {
    const id = uuid.new();
    const token = createToken(email, id);
    mailService.sendConfirmationToken(email, id, token);
    const user = await new User({
      _id: id,
      firstName: firstName,
      type: type,
      email: email,
      emailConfirmed: false,
      onboarded: false
    }).save();
    return { user, id, token };
  } catch (e) {
    return {
      error: "User with that email exists already"
    }
  }

};

const validateToken = (id, token) => {
  return extractIdFromToken(token) === id;
};

const extractIdFromToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET).id;
  } catch (e) {
    return null;
  }
};

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) res.sendStatus(403);
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else return res.sendStatus(409);

};

const generateLoginToken = async (email) => {
  const user = await User.findOne({email: email}).exec();
  if (user) {
    const token = createToken(email, user._id);
    mailService.sendAuthToken(email, token);
    return { success: true };
  } else return { success: false, error: "Email address does not exist" };
};

const createToken = (email, id) => {
  return jwt.sign({ email: email, id: id }, config.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = { register, confirm, checkToken, createToken, generateLoginToken, validateToken };