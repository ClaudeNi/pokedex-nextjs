import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props:any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Pokedex</title>
      </Head>
      <h1 className={styles.title}>Pokedex</h1>
      <div className={styles.pokedex}>
        {props.pokemonInfo.map((pokemon:any) => {
            return <div className={styles.pokedexCol} key={pokemon.id}>
              <Link href={`/pokemon?id=${pokemon.id}`}>
                  <div className={styles.pokeItem}>
                      <span className={styles.pokeID}>#{pokemon.id}</span>
                      <img className={styles.pokeImage} src={pokemon.image} alt={pokemon.name}/>
                      <span className={styles.pokeName}>{pokemon.name.toUpperCase()}</span>
                  </div>
                  </Link>
              </div>
          })}
      </div>
    </div>
    
  )
}

export async function getStaticProps() {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
    const pokemonInfo = res.data.results.map((pokemon:any, index:number) => {  
      const id:number = (index + 1)
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {...pokemon, image, id}
    })
    return {
      props: { pokemonInfo }
    }
  } catch (err) {
    console.log(err);
  }
}

export default Home
