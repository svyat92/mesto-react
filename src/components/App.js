import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { showErr } from '../utils/utils.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import СonfirmDeletePopup from './СonfirmDeletePopup';
import Loader from './Loader';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards);
      })
      .catch(() => {
        showErr('Не удалось получить данные с сервера')
      })
      .finally(() => {
        setLoading(false);
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

  /**
   * Открыть попап редактирования аватара
   */
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  /**
  * Открыть попап редактирования профиля
  */
  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  /**
  * Открыть попап добавления новой карточки
  */
  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  /**
  * Открыть попап с картинкой из выбранной
  */
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  /**
  * Отрыть попап с подтверждением удаления выбранной карточки
  */
  function handleCardDelete(card) {
    setSelectedDeleteCard(card);
  }

  /**
  * Закрыть все попапы
  */
  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard(null);
    setSelectedDeleteCard(null);
  }

  /**
  * Обновить профиль пользователя
  */
  function handleUpdateUser(user) {
    setLoading(true);
    api.patchUserInfo(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => showErr(err))
      .finally(() => {
        setLoading(false)
      });
  }

  /**
  * Обновить аватар пользователя
  */
  function handleUpdateAvatar(user) {
    setLoading(true);
    api.patchUserAvatar(user)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => showErr(err))
      .finally(() => {
        setLoading(false);
      });
  }

  /**
  * Поставить\снять лайк
  */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => showErr(err));
  }

  /**
  * Добавить новую карточку
  */
  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api.postNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => showErr(err))
      .finally(() => {
        setLoading(false);
      });
  }

  /**
  * Удалить выбранную карточку
  */
  function handleConfirmDeleteSubmit() {
    setLoading(true);
    api.deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedDeleteCard._id));
        closeAllPopups();
      })
      .catch((err) => showErr(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Loader isOpen={isLoading} />
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

      <СonfirmDeletePopup
        isOpen={selectedDeleteCard}
        onClose={closeAllPopups}
        onDeleteCard={handleConfirmDeleteSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
