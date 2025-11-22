export default class Song {
    id: number
    lastPlayedOn: string
    album: Album
    lastPlayedAt: Gig
    name: string
    position: number 
    slug: string 

    constructor(obj?:any) {
        this.id = obj.id || -1
        this.lastPlayedOn = obj.attributes.LastPlayedOn || ''
        this.album = new Album(obj.attributes.album) || new Album()
    }
}