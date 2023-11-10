
export default class Queue {
    private store: any[]
    private limit?: number = 20


    constructor(limit?: number, startingArray?: any[]) {
        if (limit) this.limit = limit
        
        if (startingArray) {
            let workingArray = []
            let workingLimit = (this.limit || 20) -1
            let totalLimit = (startingArray.length < workingLimit) ? startingArray.length : workingLimit
            
            for (let i = 0; i <= totalLimit; i++) {
                let element = startingArray[i]
                if (element) workingArray.push(element)
            }
            this.store = [...workingArray]
        } else this.store = []
        
    }

    public add(element: any) {
    
     
        let limit = this.limit || 20
     
        if (this.store.length >= limit) {
            let workingStore = [...this.store]
            workingStore.shift()
            // this.store = [...workingStore, element]
            this.store.shift()
            this.store.push(element)
        }
        else {
            // this.store = [...this.store, element]
            this.store.push(element)
        }
    }

    public fill(elements: any[]) {
        elements.forEach(element => this.store.push(element))
    }

    
    get queue() : any[] {
        return [...this.store]
    }
    
}
