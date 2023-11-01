export default class Queue {
    private store: any[]
    private limit?: number = 20


    constructor(limit?: number, startingArray?: any[]) {
        if (limit) this.limit = limit
        
        if (startingArray) {
            console.log(startingArray.length)
            let workingArray = []
            let workingLimit = (this.limit || 20) -1
            let totalLimit = (startingArray.length < workingLimit) ? startingArray.length : workingLimit
            
            for (let i = 0; i <= totalLimit; i++) {
                workingArray.push(startingArray.reverse()[i])
            }
            this.store = [...workingArray]
        } else this.store = []
        
    }

    public add(element: any) {
        console.log("queuing")
        let limit = this.limit || 20
        console.log(limit, this.store.length)
        if (this.store.length >= limit) {
            console.log("why are you here?")
            this.store.shift()
            this.store.push(element)
        }
        else {
            console.log(element)
            this.store.push(element)
            console.log(this.store)
        }
    }

    
    get queue() : any[] {
        return [...this.store]
    }
    
}
