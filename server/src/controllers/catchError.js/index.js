function catchErrors(controllerFn) {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        error: { message: error.message },
      });
    }
  };
}

module.exports = {
  catchErrors,
};
