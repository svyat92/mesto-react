function PopupWithForm({ isOpen, name, onClose, title, children, buttonText, onSubmit }) {

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget ) {
      onClose();
    }
  }

  const popupClassName = (
    `popup popup_type_${name} ${isOpen && 'popup_active'}`
  );

  return (
    <div 
      className={popupClassName}
      onMouseDown={handleOverlayClick}
      >
      <div className="popup__form-container">
        <button
          type="button"
          className="popup__close-btn link"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          name={name}
          className="form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="form__submit-btn link"
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
