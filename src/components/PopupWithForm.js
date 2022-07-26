function PopupWithForm(props) {
  
  return (
    <div className={props.isOpen ? `popup popup_type_${props.name} popup_active` : `popup popup_type_${props.name}`}>
      <div className="popup__form-container">
        <button type="button" className="popup__close-btn link" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form action="#" name={props.name} className="form" noValidate>
          {props.children}
          <button type="submit" className="form__submit-btn link" disabled>Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
