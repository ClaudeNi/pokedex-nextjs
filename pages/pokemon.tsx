import axios from "axios";
import { stringify } from "querystring";
import styles from '../styles/Pokemon.module.css'

export default function pokemon({ pokemon }:any) {
    const showTypes = () => {
        return pokemon.types.map((type:any,i:number) => {
            return <li key={i} className={styles[type.type.name]}>{type.type.name}</li>
        })
    }

    const displayID = (id:number) => {
        let idStr:string = "00" + id.toString()
        idStr = idStr.slice(-3)
        return idStr
    }

    const displayName = (name:string) => {
        let capName:string = name.charAt(0).toUpperCase() + name.slice(1)
        return capName
    }
    
    return <div className={styles.pokePage}>
        <div className={`${styles.upperHalf} ${styles[pokemon.types[0].type.name]}`}>
            <span className={styles.pokeID}>#{displayID(pokemon.id)}</span>
            <span className={styles.pokeName}>{displayName(pokemon.name)}</span>
            <img src={pokemon.image} alt={pokemon.name} className={styles.pokeImg}/>
        </div>
        <div className={styles.lowerHalf}>
            <ul>
                <li>Types:</li>
                {showTypes()}
            </ul>
        </div>
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