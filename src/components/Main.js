import React from "react";

import { api } from "../utils/Api";
import { showErr } from "../utils/utils.js";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
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
    </main>
  );
}

export default Main;
