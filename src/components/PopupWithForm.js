function PopupWithForm({ isOpen, name, onClose, title, children, buttonText, onSubmit }) {

  return (
    <div className={isOpen ? `popup popup_type_${name} popup_active` : `popup popup_type_${name}`}>
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
