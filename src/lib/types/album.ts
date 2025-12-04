import Band from "./band"
import Song from "./songs"

export default class Album {
    id: number 
    band: Band 
    name: string 
    slug: string
    songs: Song[] 
    
    constructor(obj?: any) {
        this.id = obj?.data.id || -1
        this.band = new Band(obj?.data.attributes?.band) || new Band()
        this.name = obj?.data.attributes.name || ''
        this.slug = obj?.data.attributes.slug || ''
        this.songs = obj?.data.songs
    }

    get oldestToNewest() {
        return this.songs.map((s:Song) => s).sort((a, b) => a.lastPlayedOn.localeCompare(b.lastPlayedOn))
    }

    get top5oldest() {
        return this.oldestToNewest.slice(0, 5)
    }

    get newestToOldest() {
        return this.songs.map((s:Song) => s).sort((a, b) => b.lastPlayedOn.localeCompare(a.lastPlayedOn))
    }

    get top5Newest() {
        return this.newestToOldest.slice(0, 5)
    }
}