// make custom message according to your need or static page for not found

const notFound = (req, res) => {
  res.status(404).send(`<h1>Route doesn't exist</h1>`);
};

export default notFound;
