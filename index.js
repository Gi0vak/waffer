
// all const I need from the HTML
const titleWaf = document.getElementById('edit-title');
const textWaf = document.getElementById('edit-input');
const titlePopup = document.getElementById('edit-title-popup');
const textPopup = document.getElementById('edit-input-popup');
const card = document.getElementById('item-notes');
const cardContainer = document.getElementById('main-notes');
const buttonAdd = document.getElementById('btn-save-note');
const buttonWaf = document.getElementById('btn-waf');
const form = document.getElementById('note-form');
const formPopup = document.getElementById('form-popup')
const dropZone = document.querySelector(".drop-zone");
const popupConfirm = document.getElementById('popup-confirm');
const buttonPopupConfirm = document.getElementById('delete-button-popup');
const buttonPopupCancel = document.getElementById('cancel-button-popup');
const nbSuperLikes = document.getElementById("nb-super");
const btnMoreWaf = document.getElementById("btn-more-waf");
const mainMostLikeWaf = document.getElementById("main-most-like-waf");
let mostLikeWaf = document.createElement("li");
const nodesInfluencers = document.getElementsByClassName('node-influencer');
const nodesTrendings = document.getElementsByClassName('node-trendings');
const canvaComments = document.getElementById('canva-comments');
let mainComments = document.createElement('ul');
mainComments.className = "main-comments";




function newComment(title, text) {
    let itemComment = document.createElement('li');
    let titleComment = document.createElement('h2');
    let textComment = document.createElement('p');
    itemComment.className = "item-comment";
    mainComments.append(itemComment);
    itemComment.append(titleComment);
    itemComment.append(textComment);
    titleComment.textContent = title;
    textComment.textContent = text;
}

//canva content
canvaComments.append(mainComments);
// your superLikes count
let totalSuperLikes = 0;
nbSuperLikes.textContent = totalSuperLikes;

// A waf is a tweet, function addNote create the Waf with the data from api in parameters
function addNote(title, text, date, id, likes, commentsCount) {

    let newCard = document.createElement("li");
    newCard.className = "item-notes";
    newCard.draggable = "true";

    let inputCard = document.createElement("div");
    inputCard.className = "card-inputs";

    let inputCardName = document.createElement("textarea");
    inputCardName.className = "card-input-name";
    inputCardName.style.resize = "none";
    inputCardName.type = "text";
    inputCardName.maxLength = "100";

    let inputCardText = document.createElement("textarea");
    inputCardText.className = "card-input-text";
    inputCardText.style.resize = "none";
    inputCardText.type = "text";
    inputCardText.maxLength = "100";

    let divCard = document.createElement("div");
    divCard.className = "note-add active";

    let titleCard = document.createElement("h2");
    titleCard.className = "h2";

    let textCard = document.createElement("p");
    textCard.className = "text-note";

    let dateText = document.createElement("p");
    dateText.className = "text-date";

    let likeAndButtons = document.createElement("div");
    likeAndButtons.className = "waflike-btn-card";

    let icones = document.createElement("div");
    icones.className = "icones";

    let divMsg = document.createElement("div");
    divMsg.className = "div-msg";

    let msg = document.createElement("div");
    msg.className = "img-msg";

    let nbMsg = document.createElement("div");
    nbMsg.className = "nb-msg";

    let spanMsg = document.createElement("span");
    spanMsg.className = "span-msg";

    let divLike = document.createElement("div");
    divLike.className = "div-like";

    let like = document.createElement("div");
    like.className = "img-like";

    let nbLike = document.createElement("div");
    nbLike.className = "nb-likes";

    let spanLike = document.createElement("span");
    spanLike.className = "span-like";

    let imgvWafLike = document.createElement("div");
    imgvWafLike.className = "img-waf-like";

    let divButtons = document.createElement("div");
    divButtons.className = "btn-group"

    let buttonChange = document.createElement('button');
    buttonChange.className = "btn btn-secondary change";
    buttonChange.textContent = "Edit";

    let buttonComment = document.createElement('button');
    buttonComment.className = "btn btn-secondary comment";
    buttonComment.textContent = "Comment";

    // Card content
    if (title === titleWaf.value && text === textWaf.value || title === titlePopup.value && text === textPopup.value) {
        cardContainer.prepend(newCard);
    } else {
        cardContainer.append(newCard);
    }

    newCard.append(inputCard);
    inputCard.append(inputCardName);
    inputCard.append(inputCardText);

    newCard.append(divCard);
    divCard.append(titleCard);
    divCard.append(textCard);
    newCard.append(dateText);
    newCard.append(likeAndButtons);
    likeAndButtons.append(icones);
    icones.append(imgvWafLike);
    icones.append(divLike);
    divLike.append(like);
    divLike.append(nbLike);
    nbLike.append(spanLike);
    icones.append(divMsg);
    divMsg.append(msg);
    divMsg.append(nbMsg);
    nbMsg.append(spanMsg);
    // If this is a text from the form inputs the div come as a first-child instead of a last
    if ((title === titleWaf.value && text === textWaf.value) || (title === titlePopup.value && text === textPopup.value)) {
        likeAndButtons.append(divButtons);
        divButtons.append(buttonChange);
        divButtons.append(buttonComment);
    } else {
        likeAndButtons.append(divButtons);
        divButtons.append(buttonComment);
    }

    //text and buttons import from API
    titleCard.textContent = title;
    textCard.textContent = text;
    spanMsg.textContent = commentsCount;
    if (commentsCount >= 0) {
        spanMsg.textContent = commentsCount;
    } else {
        spanMsg.textContent = 0;
    }
    if (likes >= 0) {
        spanLike.textContent = likes;
    } else {
        spanLike.textContent = 0;
    }

    /// functions of the card

    //function to add a 0
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    // function to define the date in case of timeStamp or new waf with a new date
    function defineDate(dateWaf) {
        if (dateWaf != undefined) {
            newDate = new Date(dateWaf);
            let datevalues = [
                newDate.getDate(),
                newDate.getMonth() + 1,
                newDate.getFullYear(),
                newDate.getHours(),
                newDate.getMinutes(),
                newDate.getSeconds(),
            ];
            // format of the date
            let wafDate = datevalues[0] + " / " + pad(datevalues[1]) + " / " + pad(datevalues[2]) + " at " + pad(datevalues[3]) + "h : " + pad(datevalues[4]) + "m : " + pad(datevalues[5]) + "s";
            dateText.textContent = wafDate;
        }
        if (dateWaf == undefined) {
            newDate = new Date();
            let datevalues = [
                newDate.getDate(),
                newDate.getMonth() + 1,
                newDate.getFullYear(),
                newDate.getHours(),
                newDate.getMinutes(),
                newDate.getSeconds(),
            ];
            // format of the date
            let wafDate = datevalues[0] + " / " + pad(datevalues[1]) + " / " + pad(datevalues[2]) + " at " + pad(datevalues[3]) + "h : " + pad(datevalues[4]) + "m : " + pad(datevalues[5]) + "s";
            dateText.textContent = wafDate;
        }
    }

    // function which can change the text inside the card
    function modifyNote() {
        newCard.draggable = "false";
        // listen click of button change
        buttonChange.addEventListener('click', (e) => {
            // add class active (display:block)
            inputCardText.classList.toggle("active");
            inputCardText.placeholder = "edit your waf here";
            // remove class hover de la card
            divCard.classList.toggle('active');
            inputCardText.focus()

            inputCardText.addEventListener('keypress', (e) => {
                // if there is a keypress
                if (e.key === 'Enter') {
                    // if empty "" cancel
                    if (inputCardText.value != "") {
                        textCard.textContent = inputCardText.value;
                        inputCard.classList.remove("active");
                        divCard.classList.add('active');
                    }
                }
            })
        })
    }
    // function which can comment the card with the same input
    function commentWaf() {
        newCard.draggable = "false";
        // in case of a click outside inputs it shows the card
        document.addEventListener('mouseup', (e) => {
            // add class active (display:block)
            if (!inputCard.contains(e.target)) {
                inputCard.classList.remove("active");
                inputCardText.classList.remove("active");
                inputCardName.classList.remove("active");
                newCard.style.marginTop = "0px";
                // disable active class
                divCard.classList.add('active');
            }
        })
        buttonComment.addEventListener('click', (e) => {
            // listen click of button comment
            newCard.style.marginTop = "100px";
            inputCardName.focus()
            inputCardName.scrollIntoView()
            newCard.draggable = "false";
            // add class active (display:block)
            inputCardName.classList.toggle("active");
            inputCardText.classList.toggle("active");
            inputCardName.placeholder = "your name here";
            inputCardText.placeholder = "comment here";
            // remove class hover de la card
            divCard.classList.toggle('active');


            inputCardName.addEventListener('keypress', (e) => {
                // if there is a keypress
                if (e.key === 'Enter') {
                    inputCardText.focus();
                    // if empty "" cancel
                }
            })

            inputCardText.addEventListener('keypress', (e) => {
                if (inputCardName.value != "") {
                    console.log(e.target);
                    // if there is a keypress
                    if (e.key === 'Enter') {
                        // if empty "" cancel
                        console.log("j' envois")
                        sendComment(id, inputCardName.value, inputCardText.value)
                        inputCard.classList.remove("active");
                        inputCardText.classList.remove("active");
                        inputCardName.classList.remove("active");
                        divCard.classList.add('active');
                    }
                } else {
                    alert('you must have a name to comment')
                }
            })
        })
    }


    ///Listeners of the card

    //onclick you can superLike a card and count how many cards you superLike on the left div aside
    imgvWafLike.addEventListener('click', (e) => {
        imgvWafLike.classList.toggle("img-waf-like-color");
        console.log(imgvWafLike);
        if (imgvWafLike.classList[1] == "img-waf-like-color") {
            totalSuperLikes++;
            nbSuperLikes.textContent = totalSuperLikes;
        } else {
            totalSuperLikes--;
            nbSuperLikes.textContent = totalSuperLikes;
        }
    })

    like.addEventListener('click', (e) => {
        like.classList.toggle("img-like-color");
    })

    // drag and drop to delete any card on the container you don't want so see
    newCard.addEventListener("dragstart", (e) => {
        newCard.id = "drag-item";
        dropZone.classList.add("drop-zone-active")
        form.scrollIntoView();
    })

    // in case of an action when dragover
    dropZone.addEventListener("dragover", e => {
        // console.log("dcode");
        e.preventDefault();
    })

    //listen when is dropping    
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove("drop-zone-active")
        if (newCard.id == "drag-item") {
            deleteNote(newCard)
        }
    })
    // if thers color on thumb, a like is sended to the API
    divLike.addEventListener('click', () => {
        console.log(like.classList[1]);
        if (like.classList[1] == "img-like-color") {
            sendLike(id)
        } else {
            removeLike(id)
        }
    })
    divMsg.addEventListener('click', (e) => {
        console.log(e.target);
        canvaComments.classList.add("active-canva");
        getComments(id)
    })
    document.addEventListener('mouseup', (e) => {
        if (!canvaComments.contains(e.target)) {
            canvaComments.classList.remove("active-canva")
            // remove all children of canva
            while (mainComments.firstChild) {
                mainComments.removeChild(mainComments.lastChild);
            }
        }
    })

    // functions importants call on the card
    defineDate(date);
    commentWaf()
    modifyNote()
    sendWaf(title, text)
}

// Global functions on page

function addInfluencers(influencers) {
    // add one influencer existing on all my html list
    for (let a = 0; a < Object.entries(nodesInfluencers).length; a++) {
        Object.entries(nodesInfluencers)[a][1].textContent = influencers;
    }
}
function addTrendings(trending) {
    //add trending on the html list
    for (let i = 0; i < nodesTrendings.length; i++) {
        nodesTrendings[i].textContent = trending[i][0];
    }
}
function active(element) {
    //display block or not
    if (element.className == "active") {
        return true
    } else {
        element.setAttribute("class", 'active');
    }
}
function deleteNote(card) {
    //delete the waf for the button delete
    if (card.parentNode != null) {
        card.parentNode.removeChild(card);
    }
}


///LISTENERS

// submit of the main waf form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    addNote(titleWaf.value, textWaf.value)
})

// submit of the popup waf form
formPopup.addEventListener('submit', (e) => {
    e.preventDefault()
    addNote(titlePopup.value, textPopup.value)
    popupConfirm.classList.remove('popup-active');
})

//click to display none the popup
buttonPopupCancel.addEventListener('click', (e) => {
    e.preventDefault()
    popupConfirm.classList.remove('popup-active');
})

//click to access waf popup 
buttonWaf.addEventListener('click', (e) => {
    e.preventDefault()
    popupConfirm.classList.add('popup-active');
})

//click to see more waf at the bottom
btnMoreWaf.addEventListener('click', function (e) {
    console.log(e.target)
    n += 10;
    getWaf(n)
})











//Correction greg

// const allNotes = document.querySelector('.all-notes');
// const form = document.getElementById('form');
// const note = document.getElementById('note');


// function addNote() {
//     const newNote = document.createElement('div');
//     newNote.innerText = note.value;
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "\u2A09";

//     deleteButton.addEventListener("click", function () {
//         // donc si on a accès à text on aussi accès à noteText.textContent donc à noteText et donc à note ?
//         allNotes.removeChild(newNote);
//     });
//     note.value = '';
//     newNote.appendChild(deleteButton);
//     allNotes.appendChild(newNote);
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addNote();
// })

// const taksContainer = document.querySelector('.task-container');

// Création d'une fonction qui va récupérer les données
// function getTasks() {
//     fetch("https://jsonplaceholder.typicode.com/todos")
//         .then(response => response.json())
//         .then(tasks => {

//             // Boucles sur les données
//             tasks.forEach(task => {
//                 let todo = document.createElement('div') // Création d'un élément HTML "div"
//                 const p = document.createElement('p'); // Création d'un élément HTML "p"
//                 p.textContent = task.title; // Ajout du titre dans la "p"
//                 const checkbox = document.createElement('input'); // Création d'un élément HTML "input"
//                 checkbox.type = 'checkbox'; // Ajout d'un type "checkbox" à l'élément "input"
//                 checkbox.checked = task.completed; // Ajout d'un état "checked" à l'élément "input"
//                 todo.append(p, checkbox); // Ajout de la "p" et de l'élément "input" dans la "div"
//                 taksContainer.append(todo); // Ajoute la liste dans le body du document
//             });
//         })
//         .catch(error => alert("Erreur : " + error));
// }
// getTasks();