window.addEventListener('load', ()=>{
    let long;
    let lat;
    let tempDesc = document.querySelector('.temp-desc');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temp');
    const temperatureSpan = document.querySelector('.temp span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tbilisi?unitGroup=metric&key=2M2T2ZKXLKBU39RVYWUYJGHUX&contentType=json`;

            fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data)
            const {temp, icon}= data.currentConditions;
            // set DOM from API
            tempDegree.textContent = temp;
            tempDesc.textContent = data.description;
            locationTimezone.textContent = data.timezone;
            //convertion to celcius
            let celcius = (temp * (9 / 5)) + 32;
            // set icons
            setIcons(icon, document.querySelector('.icon'));
            // chancge temp to celsius/farenheit
            temperatureSection.addEventListener('click', ()=>{
                if(temperatureSpan.textContent === "C"){
                    temperatureSpan.textContent = "F";
                    tempDegree.textContent = Math.floor(celcius);
                }else {
                    temperatureSpan.textContent = "C";
                    tempDegree.textContent = temp;
                }
            });

        })
        .catch(error => {
            console.log("Error fetching weather data", error);
            const errorMsg = "Failed to fetch weather data. Please try again later.";
            tempDesc.textContent = errorMsg;
        });
        });

    }else{
        h1.textContent = "enable the location service bruh I'm not the fortune teller"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
