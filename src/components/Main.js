import { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="page__content">

      <section className="profile">
        <div className="profile__image-wrapper" onClick={onEditAvatar}>
          <img src={currentUser ? currentUser.avatar : ''} alt="Аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__line">
            <h1 className="profile__title">{currentUser ? currentUser.name : ''}</h1>
            <button type="button" className="profile__edit-btn link" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser ? currentUser.about : ''}</p>
        </div>
        <button type="button" className="profile__add-btn link" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="Интересные места">
        {cards.map((card) => (
          <div key={card._id}>
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
