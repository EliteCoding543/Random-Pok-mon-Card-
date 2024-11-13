const typeColor = {
     bug:"#26de81",
     dragon: "#ffeaa7",
     electric: "#fed330",
     fairy: "#FF0069",
     fire: "#f0932b",
     flying: "#81ecec",
     grass: "#00b894",
     ground: "#EFB549",
     ghost: "#a55eea",
     ice: "#74b9ff",
     normal: "#95afc0",
     posison: "#6c5ce0",
      psychic: "#a2d3436",
      rock: "#2d3436",
      water: "#0190FF",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const Btn = document.getElementById("btn");
let getPokeData = () => {

    // random a number generate between 1 and 150
     let id = Math.floor(Math.random() * 150) + 1;
     // combine the  pokeapi url with pokemon id

     const finalUrl = url + id;
     
     // fetech generate url
fetch(finalUrl)
     .then((response) => response.json())
     .then((data) => {
        generateCard(data);
     });

};
     // generate card

     let  generateCard = (data) => {
        // get necessary data and assign it to variable 
        console.log(data);
        const hp = data.stats[0].base_stat;
        const imgSrc = data.sprites.other.dream_world.front_default;

        const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
        const statAttack = data.stats[1].base_stat;
        const statDefense = data.stats[2].base_stat;
        const statSpeed = data.stats[5].base_stat;

       // style card based on thems color 
       
       const themesColor = typeColor[data.types[0].type.name];


     card.innerHTML = `
           <p class="hp">
                <span>HP</span>
                ${hp}
                
          </p>
            <img src=${imgSrc} alt="">  
            <h2 class="poke-name">${pokeName}</h2> 
            <div class="types">

            </div> 
            <div class="stats">
                <div>
                    <h3>${statAttack}</h3>
                    <p>Attack</p>
                </div>
                <div>
                    <h3>${statDefense}</h3>
                    <p>Defense</p>
                </div>
                <div>
                    <h3>${statSpeed}</h3>
                    <p>Speed</p>
                </div>
            </div> `;

     appendTypes(data.types);
     styleCard(themesColor);
     
     };
        let appendTypes = (types) => {
          types.forEach((item) => {
               let span = document.createElement("SPAN");
               span.textContent = item.type.name;
               document.querySelector(".types").appendChild(span);
          });
        };

        // style card based on thems color 
     let styleCard = (color) => {
          card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
          card.querySelectorAll(".types span").forEach(
               (typeColor) => {
                    typeColor.style.backgroundColor = color;
               
     });
     }   

Btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
