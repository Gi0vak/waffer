const urlApi = "https://touiteur.cefim-formation.org/";
let n = 10;

//get a name value for the title input
function getName() {
    fetch('https://randomuser.me/api/?inc=name')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
            }
        })
        .then(function (data) {
            titleWaf.value = data['results'][0].name.first;
        })
        .catch(function (error) {
            console.log(error);
        })
}

//get a joke value for the main text input
function getJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.status)
            }
        })
        .then(function (data) {
            textWaf.value = data.value;
        })
        .catch(function (error) {
            console.log(error);
        })
}


// get all the data I need : author, message, date, nbcomments
function getData(data) {
    {
        console.log(data['messages'])
        let author = data['messages'][0].name;
        console.log(author)
        let message = data['messages'][0].message;
        console.log(message);
        let date = data['messages'][0].ts;
        let nbComments = data['messages'][0].comments_count;
        // call the function addNote with this parameters
        addNote(author, message, date, nbComments);
    }
}

// fetch and get the entire card with the getData function
function getWaf(n) {
    fetch(urlApi + "list")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log(response.status);
            }
        })
        .then(function (data) {
            data.messages.forEach(element => {
                if (element.id == "3212") {
                    addNote(element.name, element.message, element.ts, element.id, element.likes, element.comments_count)
                }
            }
            );
            data.messages.reverse().splice(0, n).forEach(element =>
                addNote(element.name, element.message, element.ts, element.id, element.likes, element.comments_count))
            // getData(data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
// get the most popular Waf
function getMostLikeWaf(n) {
    fetch(urlApi + "likes/top?count=" + n)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log(response.status);
            }
        })
        .then(function (data) {
            data.top.splice(0, n).forEach((element) => {
                console.log(element.name + " " + element.message + " " + element.likes)
                mainMostLikeWaf.appendChild(mostLikeWaf)
            }
            )
        })
        .catch(function (error) {
            console.log(error);
        })
}

//get comments on each card
function getComments(id) {
    fetch(urlApi + "comments/list?message_id=" + (id))
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log(response.status);
            }
        })
        .then(function (data) {
            data.comments.forEach(element => {
                newComment(element.name, element.comment)
            }
            );
        })
        .catch(function (error) {
            console.log(error);
        })
}
// fetch and get an influencer
function getInfluencers() {
    fetch(urlApi + "influencers")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log(response.status);
            }
        })
        .then(function (data) {
            addInfluencers(Object.keys(data.influencers)[0])
            // getData(data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

// fetch and get trends
function getTrending() {
    fetch(urlApi + "trending")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log(response.status);
            }
        })
        .then(function (data) {
            // sort array of datas, reverse and slice
            const myArrayTrend = Object.entries(data).sort((a, b) => (a[1] > b[1] ? 1 : -1)).reverse().slice(0, 10);
            addTrendings(myArrayTrend)
        })
        .catch(function (error) {
            console.log(error);
        })
}

// post a waf into api's data
function sendWaf(name, message) {
    fetch(urlApi + "send", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=" + encodeURIComponent(name) + "&message=" + encodeURIComponent(message)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

//send a like on a card into api's data
function sendLike(id) {
    fetch(urlApi + "likes/send", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message_id=" + encodeURIComponent(id)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

//delete the like on the api
function removeLike(id) {
    fetch(urlApi + "/likes/remove", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message_id=" + encodeURIComponent(id)
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log("it's deleted");
        }
        )
        .catch(error => console.log(error))
}

// post a comment into api's data
function sendComment(id, name, comment) {
    fetch(urlApi + "comments/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message_id=" + encodeURIComponent(id) + "&name=" + encodeURIComponent(name) + "&comment=" + encodeURIComponent(comment)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

// get a random name each 20s
setInterval(getName, 20000)
// get a random joke each 20s
setInterval(getJoke, 20000)
// get n new cards waf 
setInterval(getWaf(n), 10000);
// get the trending waf words from the api to my right aside list
getTrending()
// Get influencers' name
getInfluencers();
getMostLikeWaf(5)






