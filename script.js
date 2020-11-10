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
        var first_twelve_cities = ls_cities.slice(0,12);
        
        for(var i = 0; i < first_twelve_cities.length; i++){
            var c = $("<p></p>").text(first_twelve_cities[i].city);
            sc.append(c);
        }

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&units=imperial&appid=" + apiKey;
        var wt = $("#weather-today");
		var five_day_weather = [];

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
			console.log(response);
			var cityTitle = $("<h2></h2>").text(response.city.name);
			cityTitle.append("<img src='http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'></img>");
			wt.append(cityTitle);
			var tempToday = $("<p></p>").text("Temperature today: " + response.list[0].main.temp)
			var windToday = $("<p></p>").text("Wind speed: " + response.list[0].wind.speed)
			wt.append(tempToday, windToday);
			
			for (var i = 0; i < response.list.length; i++){
				var d = new Date(response.list[i].dt * 1000);
				var h = d.getHours();
				if (h == 0){
					var this_days_weather = {
						date: d.toLocaleDateString('en-US'),
						temp: response.list[i].main.temp,
						humidity: response.list[i].main.humidity
					};
					five_day_weather.push(this_days_weather);
				}
			}
			
			var fd = $("#five-day-forecast");
			
			for (var i = 0; i < five_day_weather.length; i++){
				
				var parent_div = $("<div class='weather col'></div>");
				parent_div.append("<p>Date: " + five_day_weather[i].date + "</p>");
				parent_div.append("<p>Temp: " + five_day_weather[i].temp + "</p>");
				parent_div.append("<p>Humidity: " + five_day_weather[i].humidity + "</p>");
				fd.append(parent_div);
			}
		});
    }
});

function addNewCity (city) {
    var cities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    cities.unshift({city});
    localStorage.setItem('searchedCities', JSON.stringify(cities));
    var allCities = localStorage.getItem('searchedCities');
    for(var i = 0; i < allCities.length; i++)
    return allCities;
}