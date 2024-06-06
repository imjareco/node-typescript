const validator = (property, schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (!error) {
      next();
    } else {
      const { details } = error;

      // Single error message
      const message = details
        .map(({ message }) => message.replace(/"/g, ''))
        .join(', ');

      // Multiple errors message
      const messages = details.reduce((obj, { context: { key }, message }) => {
        return { ...obj, [key]: message.replace(/"/g, '') };
      }, {});

      console.log('error', message);
      console.log('errors', messages);

      res.status(422).json({
        errors: messages,
      });
    }
  };
};

module.exports = validator;
