import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import InfoTooltip from './InfoTooltip';
import Loader from './Loader';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { auth } from '../utils/Auth';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [InfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [InfoTooltipParam, setInfoTooltipParam] = useState({ isError: true });
  const history = useHistory();

  useEffect(() => {
    checkToken();

    //setLoading(true);
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
    setInfoTooltipOpen(false);
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

  /**
  * Регистрация пользователя
  */
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        setInfoTooltipOpen(true);
        setInfoTooltipParam({ isError: false });
        history.push('/sign-in');
      })
      .catch(err => {
        setInfoTooltipOpen(true);
        setInfoTooltipParam({ isError: true });
        console.log(err);
      })
  }

  /**
  * Авторизация пользователя
  */
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
      .catch(err => {
        setInfoTooltipOpen(true);
        setInfoTooltipParam({ isError: true });
        console.log(err);
      })
  }

  /**
   * Проверка токена
   */
  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err))
    }
  }

  /**
  * Выход пользователя
  */
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail(null);
    history.push('/sign-in');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Loader isOpen={isLoading} />
      <Header
        email={userEmail}
        onLogout={handleLogout}
      />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

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

      <InfoTooltip
        isOpen={InfoTooltipOpen}
        isError={InfoTooltipParam.isError}
        onClose={closeAllPopups}
      />

      <Footer />

    </CurrentUserContext.Provider>
  );
}

export default App;
