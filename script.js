// the value in the city input is $("#weather-city").val(); //
// submit button = $("#submit-city").click();

var apiKey = '19a41f64e9b172bc415d713ba3a84285';


$("#submit-city").click(function(){
    var wt = $("#weather-today");
    var sc = $("#searched-cities");
    wt.html('');
    sc.html('');

    var inputCity = $("#weather-city").val();

    if(inputCity && inputCity != ''){
        
        var ls_cities = JSON.parse(addNewCity(inputCity));

        for(var i = 0; i < ls_cities.length; i++){
            var c = $("<p></p>").text(ls_cities[i].city);
            sc.prepend(c);
        }

        var queryURL = "//api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&units=imperial&appid=" + apiKey;
        var wt = $("#weather-today");

        $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                console.log(response);
                var cityTitle = $("<h2></h2>").text(response.city.name);
                cityTitle.append("<img src='http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'></img>");
                wt.append(cityTitle);
                var tempToday = $("<p></p>").text("Temperature today: " + response.list[0].main.temp)
                var windToday = $("<p></p>").text("Wind speed: " + response.list[0].wind.speed)
                wt.append(tempToday, windToday);
            });
    }
});

function addNewCity (city) {
    var cities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    cities.push({city});
    localStorage.setItem('searchedCities', JSON.stringify(cities));
    var allCities = localStorage.getItem('searchedCities');
    for(var i = 0; i < allCities.length; i++)
    return allCities;
}