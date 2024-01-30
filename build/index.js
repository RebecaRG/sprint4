"use strict";
//Exrecici 1
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchJoke() {
    return fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
        // console.log(data);
        return data;
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
    fetchJoke()
        .then((jokeRandom) => {
        // console.log(jokeRandom.joke);
        printHtml(jokeRandom.joke);
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
    return fetchJoke().then((fJoke) => {
        let newReport = getReport(fJoke, puntuacio);
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
}
