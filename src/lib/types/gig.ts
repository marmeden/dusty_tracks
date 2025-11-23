export default class Gig {
    id: number 
    name: string
    slug: string
    date: string
    venue: string
    city: string
    state: string
    tour: string
    country: string

    constructor(obj?: any) {
        this.id = obj.data.id || -1  
        this.name = obj.data.attributes.name || ''
        this.slug = obj.data.attributes.slug || ''
        this.date = obj.data.attributes.date || ''
        this.venue = obj.data.attributes.venue || ''
        this.city = obj.data.attributes.city || ''
        this.state = obj.data.attributes.state || ''
        this.tour = obj.data.attributes.tour || ''
        this.country = obj.data.attributes.country || ''
    }
}