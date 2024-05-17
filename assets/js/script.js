async function request(city) {
    const apiKey = "243fd8d2749d2489a14d2d2de1fba72d";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
   

    try {
        const response = await fetch(url);

        const data = await response.json();


        const firstTemp = data.list[0].main.temp;


        const temperatureElement = document.getElementById("temperature");
        temperatureElement.innerHTML = `${firstTemp}&deg;<sup>c</sup>`;
        
        const dateElement = document.getElementById("date");
        const currentDate = new Date();
        
        const options = { weekday: 'long' , month: 'long', day: 'numeric' };
        
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        dateElement.textContent = formattedDate;

        const weather = document.getElementById("weather")
        weather.textContent = data.list[0].weather[0].main


        const villeElement = document.getElementById("ville")

        villeElement.textContent = data.city.name

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

request("Gembloux,BE");
