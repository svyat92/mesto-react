import {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard();
  }

  return (
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
        <>
          <label className="form__field">
            <input id="avatar-input" type="url" className="form__input form__input_content_title" name="avatar"
              placeholder="Ссылка на картинку" required autoComplete="off" />
            <span className="form__input-error avatar-input-error"></span>
          </label>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <label className="form__field">
            <input id="profie-name-input" type="text" className="form__input form__input_content_title" name="userName"
              placeholder="Имя" required minLength="2" maxLength="40" autoComplete="off" />
            <span className="form__input-error profie-name-input-error"></span>
          </label>
          <label className="form__field">
            <input id="profile-about-input" type="text" className="form__input form__input_content_subtitle" name="userDesc"
              placeholder="О себе" required minLength="2" maxLength="200" autoComplete="off" />
            <span className="form__input-error profile-about-input-error"></span>
          </label>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
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
        </>
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={false}
        onClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </>
  );
}

export default App;
