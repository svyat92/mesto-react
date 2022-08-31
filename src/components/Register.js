import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    onRegister(email, password);
  }

  return (
    <section className="start-page">
      <h2 className="start-page__title">Регистрация</h2>
      <form
        action="#"
        name="sign-in"
        className="start-page__form"
        noValidate
        onSubmit={onSubmit}
      >
        <input
          type="email"
          className="start-page__input"
          name="email"
          placeholder="E-mail"
          required
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="start-page__input"
          name="password"
          placeholder="Пароль"
          required
          autoComplete="off"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className="start-page__submit-btn link"
          type="submit"
        >Зарегистрироваться</button>
        <p className="start-page__text">
          Уже зарегистрированы?&nbsp;
          <Link className="start-page__text link" to="/sign-in">Войти</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
