import Band from "./band"

export default class Album {
    id: number 
    band: Band 
    name: string 
    slug: string 
    
    constructor(obj?: any) {
        this.id = obj?.data.id || -1
        this.band = new Band(obj?.data.attributes?.band) || new Band()
        this.name = obj?.data.attributes.name || ''
        this.slug = obj?.data.attributes.slug || ''
    }
}