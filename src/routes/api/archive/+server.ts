import { json } from '@sveltejs/kit';

export const GET = async () => {
    const response = await fetch("https://sptfy-db.eneasmarin.xyz/api/songs?filters[album][band][slug][$eq]=qotsa&populate[album][populate][band]=*&populate[lastPlayedAt]=*&sort=LastPlayedOn:asc");
  
    const songsToday = await response.json();
    return json(songsToday);
};