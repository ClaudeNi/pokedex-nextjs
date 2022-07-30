import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props:any) => {
  return (
    <div className={styles.container}>
      <h1>Pokedex</h1>
      <ul>
        {props.pokemonInfo.map((pokemon:any, id:number) => {
          return <li key={id + 1}>{pokemon.name}</li>
        })}
      </ul>
    </div>
    
  )
}

export async function getStaticProps(context:any) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    const { results } = await res.json()
    const pokemonInfo = results.map((pokemon:String, index:number) => {
      const id:number = index + 1
      return {...pokemon}
    })
    return {
      props: { pokemonInfo }
    }
  } catch (err) {
    console.log(err);
  }
}

export default Home
