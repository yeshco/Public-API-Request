///1,a)This creates de AJAX object
let xhr1 = new XMLHttpRequest();
///1,b)This function is called when the the information is returned it does this:
///////a)Checks if the response is ok
///////b)Converts the JSON into a javascript object
///////c)Creates the searchbox and inserts it into the page
///////d)Takes from the JS object the information from each user and calls a function to insert them on a HTML template
///////e)Inserts all the HTML templates into the page
///////f)Calls two Functions
xhr1.onreadystatechange = function () {
  if (xhr1.readyState === 4 && xhr1.status === 200) {
    const allUsers = JSON.parse(xhr1.responseText);
    let searchBox = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit"> </form>`
    searchContainer.innerHTML = searchBox;
    let theCards = ``;
    for (i=0; i<12; i++) {
      let theUser = allUsers.results[i];
      theCards = fillTheGallery(theUser, theCards);
    }
    theGallery.innerHTML = theCards;
    aRetardation(allUsers);
    aRetardationSearch(allUsers);
  }
};

///2)This Function does the following:
///////a)It takes the information from one user and inserts it into a HTML template
function fillTheGallery(theUser, theCards) {
  theCards += `<div class="card" id="${i}">
      <div class="card-img-container">
          <img class="card-img" src="${theUser.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${theUser.name.first} ${theUser.name.last}</h3>
          <p class="card-text">${theUser.email}</p>
          <p class="card-text cap">${theUser.location.city}, ${theUser.location.street}</p>
      </div>
  </div>`;
  return theCards;
}

///3)This Function does the following:
///////a)It gets each user's <div> element if that element is in the page and puts an eventListener on the whole element
///////b)The eventListener Function assigns the id of that element to a variable and calls another Function
function aRetardation(allUsers) {
  for (b=0; b<12; b++) {
    if (theGalleryCards = document.getElementById(`${b}`)){
      let theGalleryCards = document.getElementById(`${b}`);
      theGalleryCards.addEventListener('click', () => {
        let number = theGalleryCards.id;
        showModal(number, allUsers);
      });
    }
  }
}

///4)This Function does the following:
///////a)Takes the id of that users element that was clicked and looks on the JS object with all the users for that user
///////b)Now it creates the Modal with that users information and adds the previous and next buttons
///////c)It calls a Function for the previous and Next buttons
///////d)It adds an eventListener to the close button to close the Modal
function showModal(number, allUsers) { //?
  let theUser = allUsers.results[number];
  let theModal = `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${theUser.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${theUser.name.first} ${theUser.name.last}</h3>
              <p class="modal-text">${theUser.email}</p>
              <p class="modal-text cap">${theUser.location.city}</p>
              <hr>
              <p class="modal-text">${theUser.phone}</p>
              <p class="modal-text">${theUser.location.street}, ${theUser.location.state}, ${theUser.location.postcode}</p>
              <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>`;
      theGallery.innerHTML += theModal;
      let theWindow = document.querySelector('.modal-container');
      nextAndPrevious(number, allUsers, theWindow);
      let buttonClose = document.getElementById('modal-close-btn');
      buttonClose.addEventListener('click', () => {
          theWindow.remove();
          aRetardation(allUsers);
      })
}

///5)This Function does the following:
///////a)Adds an event listener to the previous button to remove one to the users element id
///////b)It does the opposite for the next button
///////c)If the limit is reached on the list it starts again from the end or the beggining
function nextAndPrevious(number, allUsers, theWindow) {
  let prevModal = document.getElementById('modal-prev');
  let nextModal = document.getElementById('modal-next');
  prevModal.addEventListener('click', () => {
    if (number>0) {
       number --;
       theWindow.remove();
       showModal(number, allUsers);
    } else {
      number = 11;
      theWindow.remove();
      showModal(number, allUsers);
    }
  })
  nextModal.addEventListener('click', () => {
    if (number<11) {
      number ++;
      theWindow.remove();
      showModal(number, allUsers);
    } else {
      number = 0;
      theWindow.remove();
      showModal(number, allUsers);
    }
  })
}

///6)This Function does the following:
///////a)It selects the search button and input
///////b)It adds and eventlistener to the button to reset the gallery of users
///////c)It searches for matching letters in the first and last name
///////d)If successfull it adds those users to the gallery
function aRetardationSearch(allUsers) {
  searchButton = document.getElementById('serach-submit');
  searchInput = document.getElementById('search-input');
  searchButton.addEventListener('click', () => {
    let theCards = ``;
    theGallery.innerHTML = ``;
    for (i=0; i<12; i++) {
      if (allUsers.results[i].name.first.indexOf(searchInput.value) > -1) {
        theCards = fillTheGallery(allUsers.results[i], theCards);
        theGallery.innerHTML = theCards;
        aRetardation(allUsers);
      } else if (allUsers.results[i].name.last.indexOf(searchInput.value) > -1) {
        theCards = fillTheGallery(allUsers.results[i], theCards);
        theGallery.innerHTML = theCards;
        aRetardation(allUsers);
      }
    }
});
}

///7)Here we open the AJAX request and we send it
xhr1.open('GET', 'https://randomuser.me/api/?results=12&noinfo&nat=gb');
xhr1.send();

///8)This just selects the two containers that appear in the HTML
let theGallery = document.getElementById('gallery');
let searchContainer = document.querySelector('.search-container');
