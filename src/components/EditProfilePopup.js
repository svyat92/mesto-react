import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesc(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

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
        <span className="form__input-error profie-name-input-error"></span>
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
        <span className="form__input-error profile-about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
