import PopupWithForm from './PopupWithForm';

function СonfirmDeletePopup({ isOpen, onClose, onDeleteCard }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    />
  )
}

export default СonfirmDeletePopup;
