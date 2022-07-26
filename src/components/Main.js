import {useEffect, useState} from 'react';
import { api } from "../utils/Api";
import { showErr } from "../utils/utils.js";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
        <div className="profile__image-wrapper" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__line">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="profile__edit-btn link" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-btn link" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="Интересные места">
        {cards.map((card) => (
          <div key={card._id}>
            <Card
              card={card}
              onCardClick={onCardClick}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
