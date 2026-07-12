// Ideia 
// fazer um map, onde cada letra que há nas palavras é uma chave de uma array com outras letras que são chaves para outras...

const PRODUCTS = ["T-Shirt","Pants","Shoes","Shirt","Shit","Socks","Coat","Jacket"];

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
        function constructLevel(array, view_index = 0){
            let newMap = new Map();

            array.map(element => {
                if(!newMap.has(element[view_index])){
                    newMap.set(element[view_index],[]);
                };
    
                newMap.get(element[view_index]).push(element);
            });

            return newMap;
        }

        function constructOtherLevels(map) {
            
        }
        
        this.#searchMap = constructLevel(items,0)

        while (!finished) {
            let all_1_op = true
            this.#searchMap.forEach((value, key)=>{
                if ((value.length > 1)){
                    all_1_op = false;
                    let n = constructLevel(value)
                    console.log(n)
                    this.#searchMap.set(key,constructLevel(value,1));
                }
                if (all_1_op){
                    finished = true;
                }
            })
        }

        console.log(this.#searchMap)
    };

};

let ClothesSearch = new SearchAlgorithm(PRODUCTS);