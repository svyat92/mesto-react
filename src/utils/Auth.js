class Auth {
  _serverUrl;

  constructor({ serverUrl }) {
    this._serverUrl = serverUrl;
  }

  register(email, password) {
    return fetch(`${this._serverUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка:  ${res.status} ${res.statusText}`);
      });
  }

  authorize(email, password) {
    return fetch(`${this._serverUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка:  ${res.status} ${res.statusText}`);
      })
  }

  checkToken(token) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка:  ${res.status} ${res.statusText}`);
      })
  }
}

export const auth = new Auth({
  serverUrl: 'https://auth.nomoreparties.co'
});
