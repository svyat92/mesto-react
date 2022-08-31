function InfoTooltip({ isOpen, isError, onClose }) {

  const popupClassName = (
    `popup popup_type_tooltip ${isOpen && 'popup_active'}`
  );

  const imageClassName = (
    `popup__icon ${isError ? 'popup__icon_type_error' : 'popup__icon_type_success'}`
  );

  const messageText = (
    `${isError ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}`
  );

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn link"
          onClick={onClose}
        ></button>
        <div className={imageClassName} />
        <h2 className="popup__title popup__title_layout_bottom">{messageText}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
