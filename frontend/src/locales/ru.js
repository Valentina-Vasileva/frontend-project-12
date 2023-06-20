export default {
  translation: {
    login: {
      title: 'Войти',
      has_no_account_question: 'Нет аккаунта?',
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
    },
    registration: {
      title: 'Регистрация',
      inputs: {
        nickname: {
          label: 'Имя пользователя',
          placeholder: 'Имя пользователя',
          errors: {
            required: 'Обязательное поле',
            min: 'От 3 до 20 символов',
            max: 'От 3 до 20 символов',
          },
        },
        password: {
          label: 'Пароль',
          placeholder: 'Пароль',
          errors: {
            required: 'Обязательное поле',
            min: 'Не менее 6 символов',
          },
        },
        password_confirm: {
          label: 'Подтвердите пароль',
          placeholder: 'Подтвердите пароль',
          errors: {
            match: 'Пароли должны совпадать',
          },
        },
      },
      buttons: {
        register: 'Зарегистрироваться',
      },
      errors: {
        unauthorized: 'Неверные имя пользователя или пароль',
        network: 'Ошибка соединения',
        default: 'Неизвестная ошибка',
      },
    },
    channels: {
      title: 'Каналы',
      create: {
        success: 'Канал создан',
      },
      remove: {
        title: 'Удалить',
        success: 'Канал удален',
      },
      rename: {
        title: 'Переименовать',
        success: 'Канал переименован',
      },
    },
    messages: {
      list: {
        messages_one: '{{count}} сообщение',
        messages_few: '{{count}} сообщения',
        messages_many: '{{count}} сообщений',
      },
      input: {
        errors: {
          required: 'Необходимо ввести сообщение',
        },
        placeholder: 'Введите сообщение...',
      },
    },
    modals: {
      create_channel: {
        title: 'Добавить канал',
        cancel: 'Отменить',
        submit: 'Отправить',
        input: {
          errors: {
            required: 'Обязательное поле',
            one_of: 'Должно быть уникальным',
          },
        },
      },
      remove_channel: {
        title: 'Удалить канал',
        cancel: 'Отменить',
        remove: 'Удалить',
        sure: 'Уверены?',
      },
      rename_channel: {
        title: 'Переименовать канал',
        cancel: 'Отменить',
        submit: 'Отправить',
        input: {
          errors: {
            required: 'Обязательное поле',
            one_of: 'Должно быть уникальным',
          },
        },
      },
    },
  },
};
