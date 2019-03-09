$(".results").hide();
$("#category-text").hide();
$(".btn-c").hide();
$(".dd").hide();
AOS.init();

var element;

let city = "New York";
let satrtDate;
let endDate;
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
  let temperatureAndCity = $("<p style='text-align: center;'>").text(
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
        $(".results").append(imgDiv);
      }
    }
  });
});
