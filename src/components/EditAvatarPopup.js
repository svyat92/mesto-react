import PopupWithForm from './PopupWithForm';
import { useRef, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef();

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser) {
      avatarRef.current.value = currentUser.avatar;
    }
  }, [currentUser, isOpen]);

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
        />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
