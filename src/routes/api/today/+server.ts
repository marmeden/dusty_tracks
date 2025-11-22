import { json } from '@sveltejs/kit';

export const GET = async () => {
    console.log('viene')
    //const response = await fetch("https://sptfy-db.eneasmarin.xyz/api/gigs");
    const response = await fetch("https://n8n.eneasmarin.xyz/webhook/otdp-today");
  
    const users = await response.json();
  
    return json(users);
};