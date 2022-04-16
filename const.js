import { Pokemon } from "./classes.js";

export const fillPokemonCard = (pokemon) => {
    const card = document.querySelector('.card');
    const cardList = document.querySelector('.card-list');

    const cloneCard = card.cloneNode(true);
    const title = cloneCard.querySelector('h3');
    const image = cloneCard.querySelector('img');
    const propertiesText = cloneCard.querySelector('.properties p');

    const [description] = cloneCard.getElementsByClassName('description');
    title.innerText = pokemon.name;
    image.src = pokemon.image;
    propertiesText.innerText = `Experience ${pokemon.experience}`;
    
    description.innerHTML = `
        <h4> Abilities: </h4>
        <ul>
        ${pokemon.abilities.map((el) => `<li>${el}</li>`).join('')}
        </ul>
    `;
    cardList.append(cloneCard);
};


export const getPokemonByNameOrId=async(params)=>{
    try{
    const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${params}`);
    const result = await response.json();
       
    const { 
            name, 
            base_experience:experience,
            abilities:rawAbilities, 
            sprites: {front_default:image}
        }=result;
    const serializedAbilities=rawAbilities.map((el)=>{
       const {
           ability:{name}
        }= el;
    return name;
});
    const pokemon=new Pokemon(name, serializedAbilities, experience, image);
    return pokemon;    
    }catch(error){
        throw Error('Покемон не найден')
    }
    
}

export let cards = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : []
localStorage.setItem('card', JSON.stringify(cards))
const card = JSON.parse(localStorage.getItem('card'))