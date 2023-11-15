const router = require('express').Router();

const {
  getAllUser,
  createUser,
  getUser,
  loginUser,

} = require('../controller/User.controller');

router.route('/user').get(getAllUser).post(createUser);

router.route('/login').post(loginUser);

router.route('/user/:id').get(getUser);

module.exports = router;
