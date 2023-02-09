function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        error: { message: error.details[0].message },
      });
    }
    return next();
  };
}

module.exports = {
  validate,
};
