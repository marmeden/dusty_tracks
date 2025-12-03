import { json } from '@sveltejs/kit';

export const GET = async () => {
    try {
        const response = await fetch(`https://sptfy-db.eneasmarin.xyz/api/bands?filters[slug][$eq]=qotsa&populate[albums][populate][songs][populate]=lastPlayedAt`)

        const data = await response.json()
        const formatted = json(data);
        return formatted
    } catch(e:any) {
        console.log(e)
    }
};