"use strict";
//*Exercici 3(NIVELL2)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//variable contador alternar apis
let countApi = 0;
//Get acudits d'icanhazdadjoke
function fetchDadJoke() {
    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        // console.log(data);
        return data;
    })
        .catch((err) => {
        console.error("There are no jokes to show!", err);
        throw err;
    });
}
//Funció per imprimir per pantalla
function printHtml(joke) {
    let jokePrintHtml = document.getElementById("jokePrint");
    if (jokePrintHtml) {
        jokePrintHtml.innerHTML = joke;
    }
}
//Funció agafa acudit i imprimeix
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let jokeFetched = yield fetchJoke();
            printHtml(jokeFetched.joke);
        }
        catch (err) {
            console.log(err);
        }
    });
}
getJoke();
//Array per introduir els objectes amb les votacions dels acudits
let reportAcudits = [];
//Guarda la votació
let puntuacio = 0;
//Guarda objecte amb última puntuació introduida
let lastScore;
//Crear objecte amb la puntuació
function getReport(jokeRandom, scoreRandom) {
    let newReport = {
        joke: jokeRandom.id,
        score: scoreRandom,
        date: new Date().toISOString(),
    };
    // console.log(newReport);
    return newReport;
}
//Actualitzar puntuació
function introReport(puntuacio) {
    return __awaiter(this, void 0, void 0, function* () {
        let fetcthJ = yield fetchJoke();
        let newReport = getReport(fetcthJ, puntuacio);
        // console.log(newReport);
        return newReport;
    });
}
introReport(puntuacio);
//Funció per saber puntuació
function punts(score) {
    return __awaiter(this, void 0, void 0, function* () {
        puntuacio = score;
        let newScore = yield introReport(score);
        lastScore = newScore;
        return newScore;
    });
}
//Funció següent acudit(Exercici 1 i 2)
function next() {
    getJoke();
    if (lastScore != null) {
        reportAcudits.push(lastScore);
        lastScore = null;
        console.table(reportAcudits);
    }
    changeImage();
}
//NIVELL2
//Exercici4
//Imprimir temperatura i html a Html
let tempPrintHtml = document.getElementById("tempPrint");
let iconPrintHtml = document.getElementById("iconPrint");
//Funció que llegeig API i imprimir per pantalla
function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=23ebbc592b1e6b4598e259f981fa0834")
        .then((response) => response.json())
        .then((data) => {
        let temperature = data.main.temp;
        let tempCelsius = (temperature - 273.15).toFixed(1);
        let icon = data.weather[0].icon;
        let iconHtml = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;
        if (tempPrintHtml) {
            tempPrintHtml.innerHTML = tempCelsius + "ºC";
        }
        if (iconPrintHtml) {
            iconPrintHtml.innerHTML = iconHtml;
        }
        // console.log(`Temperature: ${tempCelsius}`);
        // console.log(`Icon: ${iconHtml}`);
    });
}
getWeather();
//Get acudits Chuck Norris
function fetchChuckJoke() {
    return fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
        let jokeData = {
            joke: data.value,
            id: data.id,
        };
        // console.log(jokeData);
        return jokeData;
    })
        .catch((err) => {
        console.error("There are no jokes to show!", err);
        throw err;
    });
}
function fetchJoke() {
    if (countApi === 0) {
        countApi = 1;
        return fetchDadJoke();
    }
    else {
        countApi = 0;
        return fetchChuckJoke();
    }
}
//NIVELL 3
//Exercici 6
const imagesArray = ["blob_1", "blob_2", "blob_3", "blob_4", "blob_5", "blob_6", "blob_7", "blob_8", "blob_9", "blob_10"];
let imagesIndex = 0;
function changeImage() {
    imagesIndex += 1;
    let nextImage = `images/blob/${imagesArray[imagesIndex]}.svg`;
    let changeBackground = document.getElementById('changeBg');
    if (changeBackground) {
        changeBackground.style.backgroundImage = `url('${nextImage}')`;
    }
    imagesIndex === imagesArray.length - 1 ?
        imagesIndex = -1 : imagesIndex = imagesIndex;
}
