
export default class Queue {
    private store: any[]
    private limit?: number = 20


    constructor(limit?: number, startingArray?: any[]) {
        if (limit) this.limit = limit

        if (startingArray) {
            let workingLimit = (this.limit || 20) - 1
            let totalLimit = (startingArray.length < workingLimit) ? startingArray.length : workingLimit

            console.log("SLICING", new Date())
            this.store = startingArray.slice(totalLimit * -1)
        }
        else this.store = []

    }

    public add(element: any) {


        let limit = this.limit || 20

        if (this.store.length >= limit) {
            this.store.shift()
            this.store.push(element)
        }
        else {
            this.store.push(element)
        }
    }

    public fill(elements: any[]) {
        elements.forEach(element => this.store.push(element))
    }


    get queue(): any[] {
        return [...this.store]
    }

}
