async function requestNextFiveDays(city) {
    const apiKey = "243fd8d2749d2489a14d2d2de1fba72d";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Récupérer la date actuelle
        const currentDate = new Date();
        const currentDay = currentDate.getDate()

        // Filtrer les prévisions pour obtenir une par jour
        const nextFiveDaysForecasts = [];
        const forecastDaysSet = new Set();

        for (let item of data.list) {
            const forecastDate = new Date(item.dt * 1000);
            const forecastDay = forecastDate.getDate();

            if (forecastDay > currentDay && !forecastDaysSet.has(forecastDay)) {
                nextFiveDaysForecasts.push(item);
                forecastDaysSet.add(forecastDay);
                if (nextFiveDaysForecasts.length === 5) break;
            }
        }

        return nextFiveDaysForecasts;

    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// Appeler la fonction pour récupérer les prévisions des 5 jours suivants
requestNextFiveDays("Gembloux,BE").then(forecasts => {
    // Boucler à travers les prévisions pour les 5 jours suivants
    forecasts.forEach((forecast, index) => {
        const forecastDate = new Date(forecast.dt * 1000);
        const daysId = `days-${index + 1}`;
        const daysElement = document.getElementById(daysId);

        if (daysElement) {
            const options = { day: 'numeric', month: 'short' };
            const formattedDate = forecastDate.toLocaleDateString('en-US', options);
            daysElement.textContent = formattedDate;
        }

        // Construire l'identifiant de l'élément de température
        const temperatureId = `temperature-${index + 1}`;
        const temperatureElement = document.getElementById(temperatureId);

        // Si l'élément existe, mettre à jour son contenu avec la température
        if (temperatureElement) {
            temperatureElement.innerHTML = `${forecast.main.temp.toFixed(1)}&deg;C`;
        }
    });
}).catch(error => {
    console.error("Error fetching next five days forecast:", error);
});
