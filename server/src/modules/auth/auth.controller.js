const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, age, password, cpassword } = req.body;

  if (!name || !email || !age || !password || !cpassword) {
    return next(createCustomError("Fields cannot be empty", 404));
  }
  if (password !== cpassword) {
    return next(createCustomError("Password do not match", 404));
  }

  const register = await UserModel.create({ name, email, age, password });

  if (!register) {
    return next(createCustomError("Registration failed", 400));
  }

  res.status(201).json({ message: "User created", success: true });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createCustomError(`${!email ? "Email" : "Password"} cannot be empty`, 404)
    );
  }
  const login = await UserModel.findOne({ email });
  if (!login) {
    return next(createCustomError(`User with ${email} doesn't exist`, 404));
  }
  if (login.password !== password) {
    return next(createCustomError(`Incorrect Password`, 400));
  }
  res
    .status(200)
    .json({ message: `${login.name} successfully logged in`, success: true });
});
