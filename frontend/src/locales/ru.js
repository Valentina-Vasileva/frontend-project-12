export default {
  translation: {
    login: {
      title: 'Войти',
      has_no_account_question: 'Нет аккаунта?',
      registration: 'Регистрация',
      inputs: {
        nickname: {
          label: 'Ваш ник',
          placeholder: 'Ваш ник',
          errors: {
            required: 'Обязательное поле',
          },
        },
        password: {
          label: 'Пароль',
          placeholder: 'Пароль',
          errors: {
            required: 'Обязательное поле',
          },
        },
      },
      buttons: {
        enter: 'Войти',
        logout: 'Выйти',
      },
      errors: {
        unauthorized: 'Неверные имя пользователя или пароль',
        network: 'Ошибка соединения',
        default: 'Неизвестная ошибка',
      },
    },
    channels: {
      title: 'Каналы',
    },
  },
};
