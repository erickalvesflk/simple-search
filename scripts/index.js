import SearchAlgorithm from "./SearchAlgorithm.js";

let search_bar = document.querySelector("#search-bar")
let bar = document.querySelector("#bar")
let bar_input = document.querySelector("#bar-text")
let recomendation = document.querySelector("#bar div")

bar_input.addEventListener("focus", function() {
    console.log("entrou");
    recomendation.style.display = "flex"
},true);
bar_input.addEventListener("blur", function() {
    console.log("saiu");
    recomendation.style.display = "none"
},true);
