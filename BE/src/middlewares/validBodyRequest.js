const validBodyRequest = (schemaValid) => (req, res, next) => {
  try {
    const data = schemaValid.parse(req.body);
    next();
  } catch (error) {
    const errors = error.errors.map((item) => `${item.path}:${item.message}`);
    return res.status(400).send({ errors });
  }
};

export default validBodyRequest;
