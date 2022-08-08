import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
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
        <span className="form__input-error card-name-input-error"></span>
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
        <span className="form__input-error card-url-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
