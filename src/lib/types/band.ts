export default class Band {
    id: number
    name: string 
    slug: string 

    constructor(obj?: any) {
        this.id = obj?.data.id || -1
        this.name = obj?.data.attributes.name || ''
        this.slug = obj?.data.attributes.slug || ''
    }
}