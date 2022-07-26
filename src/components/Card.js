function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
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
        <button type="button" className="element__delete-btn link"></button>
      </div>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-wrapper">
          <button type="button" className="element__like-btn link"></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
