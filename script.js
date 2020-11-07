// the value in the city input is $("#weather-city").val(); //
// submit button = $("#submit-city").click();

var apiKey = '19a41f64e9b172bc415d713ba3a84285';

$("#submit-city").click(function(){
    var wt = $("#weather-today");
    wt.html('');

    var inputCity = $("#weather-city").val();
    if(inputCity && inputCity != ''){
        addNewCity(inputCity);
        var queryURL = "//api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial&appid=" + apiKey;
        var wt = $("#weather-today");

        $.ajax({
            url: queryURL,
            method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
            
            // Log the queryURL
            console.log(queryURL);
            
            // Log the resulting object
            console.log(response);
            
            //log the weather
            wt.append("Temp today = ");
            wt.append(response.main.temp);
            console.log(response.main.temp)
            });
    }
});

function addNewCity (city) {
    var cities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    cities.push(city);
    localStorage.setItem('searchedCities', JSON.stringify(cities));
    var allCities = localStorage.getItem('searchedCities');
    for(var i = 0; i < allCities.length; i++)
    return allCities;
}