//*Exercici 3(NIVELL2)

//variable contador alternar apis
let countApi: number = 0;

// -------------------- //

//NIVELL1
//Exrecici 1

interface Joke {
    id: string;
    joke: string;
}

//Get acudits d'icanhazdadjoke
function fetchDadJoke(): Promise<Joke> {
    return fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((data: Joke) => {
            // console.log(data);
            return data;
        })
        .catch((err: Error) => {
            console.error("There are no jokes to show!", err);
            throw err;
        });
}

//Funció per imprimir per pantalla
function printHtml(joke: string): void {
    let jokePrintHtml: HTMLElement | null = document.getElementById("jokePrint");
    if (jokePrintHtml) {
        jokePrintHtml.innerHTML = joke;
    }
}

//Funció agafa acudit i imprimeix
async function getJoke(): Promise<void> {
    try {
        let jokeFetched: Joke = await fetchJoke();
        printHtml(jokeFetched.joke);
    } catch (err) {
        console.log(err);
    }
}

getJoke();

// Exercici 3
interface infoReportAcudits {
    joke: string;
    score: number;
    date: string;
}

//Array per introduir els objectes amb les votacions dels acudits
let reportAcudits: infoReportAcudits[] = [];

//Guarda la votació
let puntuacio: number = 0;

//Guarda objecte amb última puntuació introduida
let lastScore: infoReportAcudits | null;

//Crear objecte amb la puntuació
function getReport(jokeRandom: Joke, scoreRandom: number): infoReportAcudits {
    let newReport: infoReportAcudits = {
        joke: jokeRandom.id,
        score: scoreRandom,
        date: new Date().toISOString(),
    };

    // console.log(newReport);
    return newReport;
}

//Actualitzar puntuació
async function introReport(puntuacio: number): Promise<infoReportAcudits> {
    let fetcthJ: Joke = await fetchJoke();
    let newReport: infoReportAcudits = getReport(fetcthJ, puntuacio);
    // console.log(newReport);
    return newReport;
}

introReport(puntuacio);

//Funció per saber puntuació
async function punts(score: number): Promise<infoReportAcudits> {
    puntuacio = score;
    let newScore: infoReportAcudits = await introReport(score);
    lastScore = newScore;
    return newScore;
}

//Funció següent acudit(Exercici 1 i 2)
function next(): void {
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
let tempPrintHtml: HTMLElement | null = document.getElementById("tempPrint");
let iconPrintHtml: HTMLElement | null = document.getElementById("iconPrint");
interface WeatherData {
    main: {
        temp: number;
    };
    weather: Array<{
        icon: string;
    }>;
}

//Funció que llegeig API i imprimir per pantalla
function getWeather(): void {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=23ebbc592b1e6b4598e259f981fa0834"
    )
        .then((response) => response.json())
        .then((data: WeatherData) => {
            let temperature: number = data.main.temp;
            let tempCelsius: string = (temperature - 273.15).toFixed(1);
            let icon: string = data.weather[0].icon;
            let iconHtml: string = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;
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

//Exercici5
interface JokeChuck {
    id: string;
    value: string;
}

//Get acudits Chuck Norris
function fetchChuckJoke(): Promise<Joke> {
    return fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((data) => {
            let jokeData: Joke = {
                joke: data.value,
                id: data.id,
            };
            // console.log(jokeData);
            return jokeData;
        })
        .catch((err: Error) => {
            console.error("There are no jokes to show!", err);
            throw err;
        });
}

function fetchJoke(): Promise<Joke> {
    if (countApi === 0) {
        countApi = 1;
        return fetchDadJoke();
    } else {
        countApi = 0;
        return fetchChuckJoke();
    }
}

//NIVELL 3
//Exercici 6

const imagesArray: string[] = ["blob_1", "blob_2", "blob_3", "blob_4", "blob_5", "blob_6", "blob_7", "blob_8", "blob_9", "blob_10"];

let imagesIndex:number = 0;

function changeImage():void{

    imagesIndex += 1;
    let nextImage: string = `images/blob/${imagesArray[imagesIndex]}.svg`;
    let changeBackground: HTMLElement | null  = document.getElementById('changeBg');
    
    if(changeBackground){
        changeBackground.style.backgroundImage = `url('${nextImage}')`;
    }
    imagesIndex === imagesArray.length -1 ? 
        imagesIndex = -1 :  imagesIndex = imagesIndex;
}

