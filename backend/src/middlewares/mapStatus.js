const errorMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  INVALID_KEY: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

const mapStatusHTTP = (status) => errorMap[status] || 500;

module.exports = mapStatusHTTP;