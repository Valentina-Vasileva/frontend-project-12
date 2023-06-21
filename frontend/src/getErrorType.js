const getErrorType = (message) => {
  switch (message) {
    case 'Request failed with status code 401':
      return 'unauthorized';
    case 'Network Error':
      return 'network';
    case 'Request failed with status code 409':
      return 'conflict';
    default:
      return 'default';
  }
};

export default getErrorType;
