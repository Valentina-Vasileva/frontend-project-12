const getErrorType = (message) => {
  switch (message) {
    case 'Request failed with status code 401':
      return 'unauthorized';
    case 'Network Error':
      return 'network';
    default:
      return 'default';
  }
};

export default getErrorType;
