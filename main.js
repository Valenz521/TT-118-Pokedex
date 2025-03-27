const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
const btnsearch= document.getElementById("btnsearch")
const Search = document.getElementById("Search")
let pokemonToSearch =""
let type = null

async function getPokemonData(pokemonID) {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon = await res.json()
        return pokemon
    } catch (error) {
        console.error(error.message)
        return false
    }
 
}
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID: ${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
    return true
}
function showPokemonDetail(pokemon){
    console.log(pokemon.types.length)
    let typesName = []
    let typesImg = ""
    for(i=0;i<pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src="./assets/${pokemon.types[i].type.name}.png" alt= "logo tipo ${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }
    pokemonList.style.display ="none"
    pokemonDetail.style.display ="block"
    pokemonInfo.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="Image view front ${pokemon.name}">
    <img src="${pokemon.sprites.back_default}" alt="Image view back ${pokemon.name}">
    <div>${typesImg}</div>
    `
}
async function loadPokedex() {
    for (let i=1;i<50;i++){
        let pokemon = await getPokemonData(i)
        displayPokemon(pokemon)
    }
}
btnBack.addEventListener("click",()=>{
    pokemonList.style.display = "grid"
    pokemonDetail.style.display = "none"
})

Search.addEventListener("input",(e)=> {
    pokemonToSearch = e.target.value
    console.log(pokemonToSearch)
})

btnsearch.addEventListener("click",async () => {
    let pokemon = await getPokemonData(pokemonToSearch)
    if(pokemon==false){
        console.error("Pokemon not found")
        return alert("pokemon not found")
    }
    showPokemonDetail(pokemon)
})

loadPokedex()

