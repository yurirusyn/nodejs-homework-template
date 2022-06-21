const getCurrentUser = async (req, res) => {
  const { email, password } = req.user;
  console.log(email);
  res.json({ email, password });
};

module.exports = getCurrentUser;
