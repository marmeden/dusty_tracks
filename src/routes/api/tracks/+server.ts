import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    try {
        const page = url.searchParams.get("page");

        console.log('page')
        console.log(page)
        const response = await fetch(`https://sptfy-db.eneasmarin.xyz/api/songs?filters[album][band][slug][$eq]=qotsa&populate[album][populate][band]=*&populate[lastPlayedAt]=*&pagination[page]=${page}&sort=LastPlayedOn:asc`);

    
        const songsToday = await response.json();
        return json(songsToday);
    } catch(e:any) {
        console.log(e)
    }
};