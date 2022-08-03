import axios from "axios";


export default function pokemon({ pokemon }:any) {
    const showTypes = () => {
        return pokemon.types.map((type:any,i:number) => {
            return <li key={i}>{type.type.name}</li>
        })
    }

    return <div>
        <span>{pokemon.name}</span>
        <img src={pokemon.image} alt={pokemon.name} />
        <ul>
            {showTypes()}
        </ul>
    </div>
}

export async function getServerSideProps({query}:any) {
    const id = query.id
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = res.data

        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        pokemon.image = image
        return {
            props: { pokemon }
        }
    } catch (err) {
        console.log(err);
    }
}