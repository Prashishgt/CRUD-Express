class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
// method
const createCustomError = (mes, statusCode) => {
  return new CustomApiError(mes, statusCode);
};

export { CustomApiError, createCustomError };
