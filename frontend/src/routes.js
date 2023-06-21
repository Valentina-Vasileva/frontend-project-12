const routes = {
  frontend: {
    main: () => '/',
    login: () => '/login',
    signup: () => '/signup',
  },
  backend: {
    login: () => '/api/v1/login',
    signup: () => '/api/v1/signup',
    getData: () => '/api/v1/data',
  },
};

export default routes;
