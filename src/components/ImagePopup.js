function ImagePopup({card, onClose}) {

  return (
    <div className={card ? `popup popup_type_image popup_active` : `popup popup_type_image`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-btn link"
          onClick={onClose}
        />
        <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
        <h2 className="popup__desc">{card ? card.name : ''}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
