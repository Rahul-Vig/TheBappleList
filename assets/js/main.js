$(".results").hide();
$("#category-text").hide();
$(".btn-c").hide();
$(".dd").hide();
AOS.init();

var element;

let city = "New York";

let APIkeyNews = "rVruAxBlYzZYu9EleoRs0Vbwvuo0NZ6c";
let queryURLNews =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:Culture&Arts&Museums&glocations:NEW+YORK+CITY&sort=newest&api-key=" +
  APIkeyNews;

let APIkeyWeather = "70c19500496f9aecbd97ff861d3072ee";
let queryURLWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&units=imperial&appid=" +
  APIkeyWeather;

//NEWS Display API

$.ajax({
  url: queryURLNews,
  method: "GET"
}).then(function(news) {
  console.log(queryURLNews);

  console.log(news);
  let response = news.response;
  for (let i = 0; i < response.docs.length; i++) {
    let cardDivNews = $("<div>").attr("class", "card");
    let imgNews = $("<img>")
      .attr(
        "src",
        "https://static01.nyt.com/" + response.docs[i].multimedia[0].url
      )
      .attr("class", "img-fluid");
    let cardBodyDivNews = $("<div>").attr("class", "card-body");
    let cardTitleNews = $("<h5>")
      .text(response.docs[i].headline.main)
      .attr("class", "card-title");
    let cardTextNews = $("<p>")
      .text(response.docs[i].snippet)
      .attr("class", "card-text");

    let linkNews = $("<a>")
      .attr("href", response.docs[i].web_url)
      .attr("class", "btn btn-dark btn-news")
      .text("Read Article");
    cardBodyDivNews.append(cardTitleNews, cardTextNews, linkNews);
    cardDivNews.append(imgNews, cardBodyDivNews);
    $("#displayNews").append(cardDivNews);
  }
});

// Weather display API

$.ajax({
  url: queryURLWeather,
  method: "GET"
}).then(function(response) {
  let temperatureAndCity = $("<p style='text-align:center;'>").text(
    response.name.toUpperCase() + ": " + response.main.temp + "° F "
  );
  temperatureAndCity.attr("class", "displayTemp");
  let arr = [];
  for (let i = 0; i < response.weather.length; i++) {
    arr.push(response.weather[i].icon);
  }
  for (let i = 0; i < 1; i++) {
    let imgWeather = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + arr[i] + ".png"
    );
    imgWeather.css("filter", "grayscale(100%)");
    $("#weather").append(imgWeather);
  }
  $("#weather").append(temperatureAndCity);
});

var loc;

$("#uptown").on("click", function() {
  $(".btn-c").show();
  $(".dd").show();
  $("#location").text("Uptown");
  $("#category-text").show();
  $("#uptown").hide();
  $("#downtown").show();
  $("#midtown").show();
  $(".results").empty();
  loc = "uptown";
});

$("#midtown").on("click", function() {
  $(".btn-c").show();
  $(".dd").show();
  $("#location").text("Midtown");
  $("#category-text").show();
  $("#uptown").show();
  $("#downtown").show();
  $("#midtown").hide();
  $(".results").empty();
  loc = "midtown";
});

$("#downtown").on("click", function() {
  $(".btn-c").show();
  $(".dd").show();
  $("#location").text("Downtown");
  $("#category-text").show();
  $("#uptown").show();
  $("#downtown").hide();
  $("#midtown").show();
  $(".results").empty();
  loc = "downtown";
});

$(".btn-c").on("click", function() {
  console.log($(this).text());
  $(".results").show();
  var myurl =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
    $(this).text() +
    "&location=" +
    loc +
    "-nyc";

  $.ajax({
    url: myurl,
    headers: {
      Authorization:
        "Bearer RNPYUywdhji7tjfiGm8Nnm1WTnygxsgP-gwpmQhU8z0ljE3VJ7U0FBQr9Xc9aXSiEGEv4GGfgztkei29cQqxZZ92ToYR6PTCUhRRCh9ZsT0vt-Vf93qIwNpUXft-XHYx"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data.businesses);
      $(".results").empty();
      for (var i = 0; i < 12; i++) {
        var imgDiv = $("<div>");
        imgDiv.addClass("images");
        var img = $("<img>");
        img.attr("src", data.businesses[i].image_url);
        img.attr("alt", "food places");
        img.css("width", "250px");
        img.css("height", "250px");
        img.css("padding", "10px");
        imgDiv.append(img);
        imgDiv.append("<br>");
        imgDiv.append(data.businesses[i].name);
        imgDiv.append(
          "<br>" + data.businesses[i].location.display_address[0] + "<br>"
        );
        imgDiv.append(data.businesses[i].location.display_address[1]);
        imgDiv.append("<br>Call: " + data.businesses[i].phone);
        imgDiv.append("<br>Rating: " + data.businesses[i].rating + "/5");
        imgDiv.append(
          "<br><button class='btn-sm btn-dark bucketBtn'> Add to List </button>"
        );
        $(".results").append(imgDiv);
      }
    }
  });
});

$(".dropdown-item").on("click", function() {
  console.log($(this).text());
  $(".results").show();
  var myurl =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
    $(this).text() +
    "&location=" +
    loc +
    "-nyc";

  $.ajax({
    url: myurl,
    headers: {
      Authorization:
        "Bearer RNPYUywdhji7tjfiGm8Nnm1WTnygxsgP-gwpmQhU8z0ljE3VJ7U0FBQr9Xc9aXSiEGEv4GGfgztkei29cQqxZZ92ToYR6PTCUhRRCh9ZsT0vt-Vf93qIwNpUXft-XHYx"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data.businesses);
      $(".results").empty();
      for (var i = 0; i < 12; i++) {
        var imgDiv = $("<div>");
        imgDiv.addClass("images");
        var img = $("<img>");
        img.attr("src", data.businesses[i].image_url);
        img.attr("alt", "food places");
        img.css("width", "250px");
        img.css("height", "250px");
        img.css("padding", "10px");
        imgDiv.append(img);
        imgDiv.append("<br>");
        imgDiv.append(data.businesses[i].name);
        imgDiv.append(
          "<br>" + data.businesses[i].location.display_address[0] + "<br>"
        );
        imgDiv.append(data.businesses[i].location.display_address[1]);
        imgDiv.append("<br>Call: " + data.businesses[i].phone);
        imgDiv.append("<br>Rating: " + data.businesses[i].rating + "/5");
        imgDiv.append(
          "<br><button class='btn-sm btn-dark bucketBtn'> Add to List </button>"
        );
        $(".results").append(imgDiv);
      }
    }
  });
});

var config = {
  apiKey: "AIzaSyCt0RVdwv3EYrk6siOMoFZMTRCcZA5sEgo",
  authDomain: "explore-nyc-49c6b.firebaseapp.com",
  databaseURL: "https://explore-nyc-49c6b.firebaseio.com",
  projectId: "explore-nyc-49c6b",
  storageBucket: "explore-nyc-49c6b.appspot.com",
  messagingSenderId: "991663963314"
};

firebase.initializeApp(config);

var database = firebase.database();
var userRef;

var currentUser;
var email;
var setPass;
var checkPass;

function signUpNewUser() {
  currentUser = $("#nameC").val();
  email = $("#emailC").val();
  setPass = $("#passC").val();
  checkPass = $("#re-entered-pass").val();
}

$("#create").on("click", function() {
  signUpNewUser();
  if (
    currentUser === "" ||
    email === "" ||
    setPass === "" ||
    checkPass === ""
  ) {
    swal("All Fields Must Be Filled");
    return false;
  }
  if (setPass != checkPass) {
    swal("Passwords do not match");
    setPass = "";
    checkPass = "";
    $("#passC").val(setPass);
    $("#re-entered-pass").val(checkPass);
    return false;
  } else {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email, setPass)
          .then(function(response) {
            console.log(response);
            database.ref("/users").push({
              name: currentUser,
              email: email
            });

            window.location.href = "about.html";
          })
          .catch(function(error) {
            // Handle Errors here.
            console.log("Error");
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Account created");
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    database
      .ref("/users/" + firebase.auth().currentUser.uid + "/bucketList")
      .on("child_added", function(snapshot) {
        console.log("ID: " + snapshot.key);

        console.log("here in update:");
        console.log(snapshot.val().place);
        var div = $("<div class='col-lg-3 bucketItem' </div>");
        div.attr("id", snapshot.key);
        div.append(snapshot.val().place);
        div.append(
          "<button class='btn-sm btn-dark'> Remove from List </button>"
        );
        $("#placesList").append(div);
        $("#placesList")
          .find(".bucketBtn")
          .remove();
      });
  } else {
  }
});

$(document).on("click", ".bucketBtn", function(event) {
  element = $(event.target).parent()[0].innerHTML;
  console.log($(event.target).parent()[0].innerHTML);
  swal("Added to your Bapple List!");
  database
    .ref("/users/" + firebase.auth().currentUser.uid + "/bucketList")
    .push({
      place: element
    });
});

$(document).on("click", ".bucketItem", function(event) {
  // var element = $(event.target).parent()[0].innerHTML;
  // database
  //   .ref("/users/" + firebase.auth().currentUser.uid + "/bucketList")
  //   .remove({
  //   });

  // database.ref(
  //   "/users/" + firebase.auth().currentUser.uid + "/bucketList"
  // ).equalTo;

  $(event.target)
    .closest("button")
    .addClass("bucketBtn");

  $(event.target)
    .closest("button")
    .text(" Add to List ");

  let placeRef = database.ref(
    "/users/" +
      firebase.auth().currentUser.uid +
      "/bucketList/" +
      $(event.target)
        .closest("div")
        .attr("id")
  );
  // .child("places")
  // .equalTo($(event.target).parent()[0].innerHTML);

  console.log(placeRef);

  placeRef.remove();

  console.log($(event.target).parent()[0].innerHTML);

  $(event.target)
    .parent()[0]
    .remove();
});

$("#existingUser").on("click", function() {
  var loginEmail = $("#loginEmail").val();
  var loginPass = $("#loginPassword").val();
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      return firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPass)
        .then(function() {
          // $("#existingUser").attr("href", "about.html");
          window.location.href = "about.html";
        })
        .catch(function(error) {
          swal("error");
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          swal("Error: " + errorMessage);
          return false;
        });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      window.location.href = "index.html";
    })
    .catch(function(error) {
      //error
    });
}
