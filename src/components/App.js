import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { showErr } from '../utils/utils.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(() => showErr('Не удалось получить данные с сервера'));
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api.patchUserInfo(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => showErr(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCloseAllPopups={closeAllPopups}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field">
            <input id="avatar-input" type="url" className="form__input form__input_content_title" name="avatar"
              placeholder="Ссылка на картинку" required autoComplete="off" />
            <span className="form__input-error avatar-input-error"></span>
          </label>
        </PopupWithForm>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
        >
          <label className="form__field">
            <input id="card-name-input" type="text" className="form__input form__input_content_name" name="name"
              placeholder="Название" required minLength="2" maxLength="30" autoComplete="off" />
            <span className="form__input-error card-name-input-error"></span>
          </label>
          <label className="form__field">
            <input id="card-url-input" type="url" className="form__input form__input_content_url" name="link"
              placeholder="Ссылка на картинку" required autoComplete="off" />
            <span className="form__input-error card-url-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          buttonText="Да"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
