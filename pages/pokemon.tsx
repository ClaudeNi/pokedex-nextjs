

export default function pokemon({ pokemon }:any) {
    return <div>
        <img src={pokemon.image} alt={pokemon.name} /> {pokemon.name}
    </div>
}

export async function getServerSideProps({query}:any) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json()

        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        pokemon.image = image
        return {
            props: { pokemon }
        }
    } catch (err) {
        console.log(err);
    }
}