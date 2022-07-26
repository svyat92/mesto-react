import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(0);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(0);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(0);
  const [selectedCard, setselectedCard] = React.useState();

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }
  
  function handleCardClick (card) {
    setselectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setselectedCard();
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        onCloseAllPopups={closeAllPopups}
        onCardClick={handleCardClick}
        card={selectedCard}
      />
      <Footer />
    </>
  );
}

export default App;
