import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { showErr } from "../utils/utils.js";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch(() => {
        showErr('Не удалось получить данные с сервера')
      });
  }, []);

  return (
    <main className="page__content">

      <section className="profile">
        <div className="profile__image-wrapper" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__line">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__edit-btn link" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-btn link" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards" aria-label="Интересные места">
        {cards.map((card) => (
          <div key={card._id}>
            <Card
              card={card}
              onCardClick={props.onCardClick}
            />
          </div>
        ))}
      </section>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onCloseAllPopups}
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
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onCloseAllPopups}
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
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onCloseAllPopups}
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
        onClose={props.onCloseAllPopups}
      />

      <ImagePopup
        card={props.card}
        onClose={props.onCloseAllPopups}
      />

    </main>
  );
}

export default Main;
