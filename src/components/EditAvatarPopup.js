import PopupWithForm from './PopupWithForm';
import { useRef, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const currentUser = useContext(CurrentUserContext);
  const [validErrors, setValidErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser) {
      avatarRef.current.value = currentUser.avatar;
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

  function handleChangeAvatar(e) {
    validateField(e);
    validateForm(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!formValid}
    >
      <label className="form__field">
        <input
          ref={avatarRef}
          id="avatar-input"
          type="url"
          className="form__input form__input_content_title"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          onChange={handleChangeAvatar}
        />
        <span className={`form__input-error ${validErrors.avatar && 'form__input-error_active'}`}>{validErrors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
