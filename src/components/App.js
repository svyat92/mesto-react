import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { showErr } from '../utils/utils.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards);
      })
      .catch(() => {
        showErr('Не удалось получить данные с сервера')
      });

    // Закрываем попап по Esc
    const closePopup = (e) => {
      if (e.keyCode === 27) {
        closeAllPopups();
      }
    }
    window.addEventListener('keydown', closePopup);
    return () => window.removeEventListener('keydown', closePopup);
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api.patchUserInfo(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => showErr(err));
  }

  function handleUpdateAvatar(user) {
    api.patchUserAvatar(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => showErr(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => showErr(err));
  }

  function handleAddPlaceSubmit(card) {
    api.postNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => showErr(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={false}
        onClose={closeAllPopups}
        buttonText="Да"
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
