import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-btn link ${!isOwn && 'element__delete-btn_hide'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn link ${isLiked && 'element__like-btn_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <div className="element__image-wrapper">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <button 
          type="button" 
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          ></button>
      </div>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
