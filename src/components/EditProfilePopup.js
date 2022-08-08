import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const [validErrors, setValidErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setValidErrors({});
      setFormValid(true);
    }
  }, [currentUser, isOpen]);
  
  function validateField(e) {
    const inputName = e.target.name;
    const validity = e.target.validity;
    if (!validity.valid) {
      setValidErrors({ ...validErrors, [inputName]: e.target.validationMessage });
    } else {
      setValidErrors({ ...validErrors, [inputName]: null });
    }
  }

  function validateForm(e) {
    setFormValid(e.target.closest('form').checkValidity());
  }

  function handleChangeName(e) {
    validateField(e);
    validateForm(e);
    setName(e.target.value);
  }

  function handleChangeDesc(e) {
    validateField(e);
    validateForm(e);
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisable={!formValid}
    >
      <label className="form__field">
        <input
          id="profie-name-input"
          type="text"
          className="form__input form__input_content_title"
          name="userName"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
          value={name}
          onChange={handleChangeName}
        />
        <span className={`form__input-error ${validErrors.userName && 'form__input-error_active'}`}>{validErrors.userName}</span>
      </label>
      <label className="form__field">
        <input
          id="profile-about-input"
          type="text"
          className="form__input form__input_content_subtitle"
          name="userDesc"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          value={description}
          onChange={handleChangeDesc}
        />
        <span className={`form__input-error ${validErrors.userDesc && 'form__input-error_active'}`}>{validErrors.userDesc}</span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
