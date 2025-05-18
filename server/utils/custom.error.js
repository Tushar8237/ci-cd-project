export const createError = (statusCode, message) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
