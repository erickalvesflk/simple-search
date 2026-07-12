// Ideia 
// fazer um map, onde cada letra que há nas palavras é uma chave de uma array com outras letras que são chaves para outras...

const PRODUCTS = ["T-Shirt","Pants","Shoes","Shirt","Socks","Coat","Jacket"];

class SearchAlgorithm {

    #searchMap = new Map();

    constructor(items) {
        if(typeof(items) != "object") return;

        this.#buildSearch(items);
    };

    /**@param {String[]} items */
    #buildSearch(items){
        let finished = false;

        /** @returns {Map} */
        function constructLevel(array){
            let newMap = new Map();

            items.map(array => {
                if(!newMap.has(array[0])){
                    newMap.set(array[0],[]);
                };
    
                newMap.get(array[0]).push(array);
            });

            return newMap;
        }
        
        this.#searchMap = constructLevel(items)
        this.#searchMap.forEach((v,k)=>{

        })

        console.log(this.#searchMap)
    };

};

let ClothesSearch = new SearchAlgorithm(PRODUCTS);