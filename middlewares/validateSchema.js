function validateSchema(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      });
      return res.status(400).json({
        message: "Erros de validação.",
        errors,
      });
    }

    next();
  };
}

export default validateSchema;
