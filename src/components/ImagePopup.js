function ImagePopup(props) {

  return (
    <div className={props.card ? `popup popup_type_image popup_active` : `popup popup_type_image`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-btn link"
          onClick={props.onClose}
        />
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <h2 className="popup__desc">{props.card ? props.card.name : ''}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
