import { json } from '@sveltejs/kit';

export const GET = async () => {
    //const response = await fetch("https://sptfy-db.eneasmarin.xyz/api/gigs");
    try {
        const response = await fetch("https://n8n.eneasmarin.xyz/webhook/otdp-today");
    
        const songsToday = await response.json();
        return json(songsToday);
    } catch(e:any) {
        console.log(e)
    }
};