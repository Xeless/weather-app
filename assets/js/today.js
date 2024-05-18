async function requestToday(city) {
    const apiKey = "243fd8d2749d2489a14d2d2de1fba72d";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json
        const currentFeelsLike = data.list[0].main.feels_like;


        const currentDate = new date ()
        const currentDay = currentDate.getData()

    }catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


const city = document.getElementById("city-input").value;





