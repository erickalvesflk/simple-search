// Ideia 
// fazer um map, onde cada letra que há nas palavras é uma chave de uma array com outras letras que são chaves para outras...

const PRODUCTS = ["T-Shirt","Pants","Shoes","Shirt","Shit","Shit","Socks","Coat","Jacket"];

class SearchAlgorithm {

    /**
     * 
     * @param {string[]} items - Array with no duplicate strings.
     */
    constructor(items) {
        if(typeof(items) != "object") return;
        this.items = this.verifierAndFormater(items)

        // if(!this.items){
        //     let d = new Date()
        //     console.error(`${d.toLocaleDateString()} - [Error]`)
        // }
        
        this.#buildSearch(this.items);

    };

    /**
     * @param {string[]} items - Array with no duplicate strings.
     * @returns {string[]}}
     */
    #formatedArray(items){
        let result = items.forEach((item_name)=>{item_name.toLocaleLowerCase()})
    };
    
    /**
     * @param {string[]} items - Array with no duplicate strings.
     * @returns {string[]} Array ormated
     */
    verifierAndFormater(items){
        let HashMap = new Map();
        let formatedItems = []
        for(const item of items){
            if(!HashMap.has(item)){
                HashMap.set(item,0);
                formatedItems.push(item.toLocaleLowerCase())
            }else{
                console.log(item)
                console.error("[Error] - Duplicated Terms")
                return [];
            };
        }

        return formatedItems;
    }
    
    /** 
     * - Build a new container. Putting the elements in new "box" ordened by the <letter_pos>° letter in elements 
     * @param {String[]} elements - Array with the new elements
     * @param {number} letter_pos - Position of the letter, which will be used for ordanate the boxes
     * @returns {Map<string, string>} Return the new Container
     * */
    #buildContainer(elements, letter_pos = 0){
        console.log("Building a new container for: ",elements,"Using the letter pos: ",letter_pos);
        let newContainer = new Map();
        
        elements.map(element => {
            let keyLetter = element[letter_pos];
            
            if(!newContainer.has(keyLetter)){
                let newBox = new Map();
                newContainer.set(keyLetter,newBox);
            };
            
            let boxMap = newContainer.get(keyLetter);
            let actual_index = boxMap.size;
            
            boxMap.set(actual_index,element);
            
        });
        
        console.log(" NewContainer:",  newContainer);
        return newContainer;
    };


    /**
     * - Verify elements in the container 
     * @param {Map<number,string>} container - The Container 
     * @param {number} i - the letter will be checked (0 to n-1)
     * */
    #verifyElements(container, i) {
        if(i > 10) return;
        let finished = false;

        console.log("Verifing the container: ", container);
        while (!finished) {
            let allBoxesWithOneElement = true;

            container.forEach((box, key)=>{
                if ((box.size > 1) && box.get(0)){
                    if(box.size == 1) return;
                    allBoxesWithOneElement = false;
                    let unpackedBoxArray = [...box.values()];
                    console.log(i," Conatiner:", container, "Box(",key,") has more than 1 element: ",box);
                    let newContainer = this.#buildContainer(unpackedBoxArray, i);
                    container.set(key,this.#verifyElements(newContainer, i + 1));

                }
                if(!box.get(0)) console.log("Container: ",container," is completed!");
                if (allBoxesWithOneElement){
                    finished = true;
                }
            })
        }

        console.log(i, "Container: ", container, "Verified");
        return container;
    }


    /**
     * - Build the map for search
     * @param {String[]} items - Array de items 
     * @returns {Map<string|number, string|Map}  Returns a SearchMap
     * */
    #buildSearch(items){
        let newSearchMap = new Map();

        newSearchMap = this.#buildContainer(items,0);
        newSearchMap = this.#verifyElements(newSearchMap, 1);

        console.log(newSearchMap);
    };
};

let ClothesSearch = new SearchAlgorithm(PRODUCTS);