//Exrecici 1

interface Joke {
    id: string;
    joke: string;
    status: number;
}

function fetchJoke(): Promise<Joke>{
    return fetch('https://icanhazdadjoke.com/',{
    headers: {
        'Accept': 'application/json'
    }
})
    .then((res) => res.json())
    .then((data: Joke) =>{
        // console.log(data);
        return data
    });
}

//Funció per imprimir per pantalla
function printHtml(joke: string):void{
    let jokePrintHtml = document.getElementById("jokePrint");
    if(jokePrintHtml){
        jokePrintHtml.innerHTML = joke;
    }
}

//Funció agafa acudit i imprimeix
function getJoke():void{
    fetchJoke()
        .then((jokeRandom: Joke)=> {
        // console.log(jokeRandom.joke);
        printHtml(jokeRandom.joke);
    });
}

getJoke();


// Exercici 3

interface infoReportAcudits{
    joke: string;
    score: number;
    date: string;
} 

//Array per introduir els objectes amb les votacions dels acudits 
let reportAcudits: infoReportAcudits[] = [];

//Guarda la votació
let puntuacio:number = 0;

//Guarda objecte amb última puntuació introduida
let lastScore: infoReportAcudits|null;

//Crear objecte amb la puntuació
function getReport(jokeRandom: Joke, scoreRandom:number){
    let newReport: infoReportAcudits = {
        joke: jokeRandom.id,
        score: scoreRandom,
        date: new Date().toISOString(),
    }
    
    // console.log(newReport);
    return newReport;
}

//Actualitzar puntuació
function introReport(puntuacio: number): Promise<infoReportAcudits> {
    return fetchJoke().then((fJoke) => {
        let newReport = getReport(fJoke, puntuacio);
        // console.log(newReport);
        return newReport;
    });
}

introReport(puntuacio);


//Funció per saber puntuació
async function punts(score:number): Promise<infoReportAcudits> {
    puntuacio = score;
    let newScore = await introReport(score);
    lastScore = newScore;
    return newScore;
}

//Funció següent acudit(Exercici 1 i 2)
function next(){
    getJoke();
    if(lastScore != null){
    reportAcudits.push(lastScore);
    lastScore = null;
    console.table(reportAcudits);
}
}
