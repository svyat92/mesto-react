import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useRef } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [validErrors, setValidErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setName('');
    setLink('');
    setValidErrors({});
    setFormValid(false);
  }, [isOpen]);

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

  function handleChangeLink(e) {
    validateField(e);
    validateForm(e);
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
      isDisabled={!formValid}
    >
      <label className="form__field">
        <input
          id="card-name-input"
          type="text"
          className="form__input form__input_content_name"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={name}
          onChange={handleChangeName}
        />
        <span className={`form__input-error ${validErrors.name && 'form__input-error_active'}`}>{validErrors.name}</span>
      </label>
      <label className="form__field">
        <input
          id="card-url-input"
          type="url"
          className="form__input form__input_content_url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
          value={link}
          onChange={handleChangeLink}
        />
        <span className={`form__input-error ${validErrors.link && 'form__input-error_active'}`}>{validErrors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
