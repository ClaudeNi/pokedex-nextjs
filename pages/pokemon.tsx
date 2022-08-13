import axios from "axios";
import { stringify } from "querystring";
import styles from '../styles/Pokemon.module.css'

export default function pokemon({ pokemon }:any) {
    const capFirstLetter = (str:string) => {
        let newStr:string = str.charAt(0).toUpperCase() + str.slice(1)
        return newStr
    }

    const displayID = (id:number) => {
        let idStr:string = "00" + id.toString()
        idStr = idStr.slice(-3)
        return idStr
    }

    const showTypes = () => {
        return pokemon.types.map((type:any,i:number) => {
            return <span key={i} className={`${styles[type.type.name]} ${styles.pokeType}`}>{capFirstLetter(type.type.name)}</span>
        })
    }
    
    return <div className={styles.pokePage}>
        <div className={`${styles.upperHalf} ${styles[pokemon.types[0].type.name]}`}>
            <span className={styles.pokeID}>#{displayID(pokemon.id)}</span>
            <img src={pokemon.image} alt={pokemon.name} className={styles.pokeImg}/>
        </div>
        <div className={styles.lowerHalf}>
            <span className={styles.pokeName}>{capFirstLetter(pokemon.name)}</span>
            <div className={styles.pokeTypeContainer}>
                {showTypes()}
            </div>
            
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