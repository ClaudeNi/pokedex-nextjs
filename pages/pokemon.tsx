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

    const showStats = () => {
        let stats:Array<String> = ["HP","ATK","DEF","SP. ATK","SP. DEF","SPD"]
        return pokemon.stats.map((stat:any, i:number) => {
            console.log(stat);
            
            return (<div key={i} className={styles.pokeStatLine}>
                <span className={styles.pokeStatName}>{stats[i]}</span><div className={styles.pokeStat}></div>
            </div>)
        })
    }

    console.log(pokemon);
    
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
            <div className={styles.flexContainer}>
                <div className={styles.pokeWeightHeightContainer}>
                    <span className={styles.pokeWeightHeight}>{pokemon.weight / 10} KG</span>
                    <span className={styles.pokeSubtitle}>Weight</span>
                </div>
                <div className={styles.pokeWeightHeightContainer}>
                    <span className={styles.pokeWeightHeight}>{pokemon.height / 10} M</span>
                    <span className={styles.pokeSubtitle}>Height</span>
                </div>
            </div>
            <div className={styles.pokeStatsContainer}>
                {showStats()}
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