// Ideia 
// fazer um map, onde cada letra que há nas palavras é uma chave de uma array com outras letras que são chaves para outras...

const PRODUCTS = ["T-Shirt","Pants","Shoes","Shirt","Socker","sockera","Coat","Jacket"];

class SearchAlgorithm {

    searchMap;

    /**
     * 
     * @param {string[]} items - Array with no duplicate strings.
     * @param {boolean} devMode -Actives the logs
     */
    constructor(items, devMode = false) {
        if(typeof(items) != "object") return;
        this.devMode = devMode;
        this.items = this.#verifierAndFormater(items);
        this.searchMap = this.#buildSearch(this.items);
    };

    #unpackContainer(container){
        if(this.devMode) console.log("- - UNPACKING CONTAINER: ",container)
        let unpackedBoxesArray = [];
        let devModeForLocalFunction = this.devMode
        function unpackBoxes(boxes){
            if(devModeForLocalFunction) console.log("- Staring [unpackBoxes]: for the boxes",boxes)
                if(boxes.size == 1){
                    if(boxes.has(0)){
                        unpackedBoxesArray.push(boxes.get(0));
                        return;
                    }
                    // Especial Case, so we need unpack this box with only lenght 1, whose there are 2 boxes inside!
                    if(devModeForLocalFunction) console.log("- The boxes: ",boxes, "have a special case! Let's unpack that")
            };
            
            for(const box of boxes){
                if(devModeForLocalFunction) console.log("unpacking box",box[1])
                    if(box[1].has(0)) {
                        if(devModeForLocalFunction) console.log("- Box:",box[1],"has the box 0, so push",box[1].get(0))
                            
                            unpackedBoxesArray.push(box[1].get(0))
                            continue;
                    if(box[1].has("")){
                        // the especial final box is a box with the key letter "" simbolizing the others letters keys form the item
                        if(devModeForLocalFunction) console.log("- Box:",box[1],"is a especial, so push",box[1].get(""))
                            let finalBox = box[1].get("")
                        unpackedBoxesArray.push(finalBox.get(0))
                    }
                }else{
                    if(devModeForLocalFunction) console.log("- Box:",box[1],"need be unpacked")
                    unpackBoxes(box[1]);
                }
            }
        }
        unpackBoxes(container);
        return unpackedBoxesArray;
    };

    /**
     * 
     * @param {string} item - item witch will be search
     * @returns {string[] | []}
     */
    search(item){
        if (this.devMode) console.log("- STARTING THE SEARCH")
        let formatedItem = item.toLocaleLowerCase();
        let actualContainer = this.searchMap;

        for(const letter of formatedItem){
            if(actualContainer.has(letter)){
                actualContainer = actualContainer.get(letter);
                if(actualContainer.has(0)){
                    // há uma resposta
                    return [actualContainer.get(0)];
                };
                if(actualContainer.has("")){
                    // the especial final box is a box with the key letter "" simbolizing the others letters keys form the item
                    let finalBox = actualContainer.get("")
                    return [finalBox.get(0)]
                }    
            };
        };
        if (this.devMode) console.log("the final actual container is: ",actualContainer);

        let result = this.#unpackContainer(actualContainer)
        return result;
    }
    
    /**
     * @param {string[]} items - Array with no duplicate strings.
     * @returns {string[]} Array ormated
     */
    #verifierAndFormater(items){
        let HashMap = new Map();
        let formatedItems = []

        for(const item of items){
            formatedItems.push(item.toLocaleLowerCase())
            if(!HashMap.has(item)){
                HashMap.set(item,0);
            }else{
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
        if (this.devMode) console.log("Building a new container for: ",elements,"Using the letter pos: ",letter_pos);
        let newContainer = new Map();
        
        elements.map(element => {
            let keyLetter = element[letter_pos];
            if (!keyLetter) {
                // undefined key, so there are one option.
                console.log(keyLetter,"is ouch of the limit in the position",letter_pos,"of the string",element)
                let newFinalBox = new Map()
                newFinalBox.set(0,element)
                newContainer.set(" ",newFinalBox)
                return;
            }
            
            if(!newContainer.has(keyLetter)){
                let newBox = new Map();
                newContainer.set(keyLetter,newBox);
            };
            
            let boxMap = newContainer.get(keyLetter);
            let actual_index = boxMap.size;
            
            boxMap.set(actual_index,element);
            
        });
        
        if (this.devMode) console.log(" NewContainer:",  newContainer);
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

        if (this.devMode) console.log("Verifing the container: ", container);
        while (!finished) {
            let allBoxesWithOneElement = true;

            container.forEach((box, key)=>{
                if ((box.size > 1) && box.get(0)){
                    if(box.size == 1) return;
                    allBoxesWithOneElement = false;
                    let unpackedBoxArray = [...box.values()];
                    if (this.devMode) console.log(i," Conatiner:", container, "Box(",key,") has more than 1 element: ",box);
                    let newContainer = this.#buildContainer(unpackedBoxArray, i);
                    container.set(key,this.#verifyElements(newContainer, i + 1));

                }
                if(!box.get(0) && this.devMode) console.log("Container: ",container," is completed!");
                if (allBoxesWithOneElement){
                    finished = true;
                }
            })
        }

        if (this.devMode) console.log(i, "Container: ", container, "Verified");
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

        if (this.devMode) console.log(newSearchMap);
        return newSearchMap
    };
};

let ClothesSearch = new SearchAlgorithm(PRODUCTS);
console.log(ClothesSearch.searchMap)
console.log(ClothesSearch.search("sockera"))