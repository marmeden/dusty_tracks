import { json } from '@sveltejs/kit';

export const GET = async () => {
    try {
        const response = await fetch(`https://sptfy-db.eneasmarin.xyz/api/bands?filters[slug][$eq]=qotsa&populate[today][populate][lastPlayedAt]=*&populate[today][populate][album][populate][band]=*&populate[soon][populate][lastPlayedAt]=*&populate[soon][populate][album][populate][band]=*`)

        const today = await response.json()
        const formatted = json(today.data[0]);
        return formatted
    } catch(e:any) {
        console.log(e)
    }
};