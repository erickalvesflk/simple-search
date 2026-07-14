import SearchAlgorithm from "./SearchAlgorithm.js";

let search_bar = document.querySelector("#search-bar");
let bar = document.querySelector("#bar");
let bar_input = document.querySelector("#bar-text");
let recomendation = document.querySelector("#bar div");

function renderSearchBar(possibleItemsArray, limit = 5){
    if(!possibleItemsArray) return;
    recomendation.innerHTML = "";

    possibleItemsArray.slice(0,limit).forEach(possibleItem => {
        recomendation.innerHTML += `<p>${possibleItem}</p>`
    })
}

const DATA = fetch("../json/data.json").then((responseConnect) => {
    responseConnect.json().then((responseJson) => {

        const DATA = responseJson;
        console.log(DATA);

        const SearchSys = new SearchAlgorithm(DATA);

        bar_input.addEventListener("input",(event)=>{
            let item = event.target.value;
            let possibleSearchArray = SearchSys.search(item);
            renderSearchBar(possibleSearchArray)
        });
        
        bar_input.addEventListener("focus", ()=>{
            let item = bar_input.value;
            let possibleSearchArray = SearchSys.search(item);
            renderSearchBar(possibleSearchArray)
            
        });
    });
});

bar_input.addEventListener("focus", function() {
    console.log("entrou");
    bar_input.style.borderRadius = "20px 20px 0px 0px";
    recomendation.style.display = "flex";
},true);

bar_input.addEventListener("blur", function() {
    console.log("saiu");
    bar_input.style.borderRadius = "20px";
    recomendation.style.display = "none";
},true);