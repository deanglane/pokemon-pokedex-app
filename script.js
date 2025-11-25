const app = {};

app.pokeID = '77';

app.getPokemon = () => {
   fetch(`https://pokeapi.co/api/v2/pokemon/${app.pokeID}`)
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            throw new Error(response.statusText);
         }
      })
      .then((jsonResult) => {
         app.pokeName.innerText = jsonResult.name;
         app.pokeHeight.innerText = `${Math.floor(jsonResult.height * 10)} cm`; //decimeter to cm;
         app.pokeWeight.innerText = `${Math.floor(jsonResult.weight * 0.1)} kg`; // hectogram to kg;
         app.pokeSprite.attributes.src.textContent = jsonResult.sprites.front_default;
         app.pokeSprite.attributes.alt.textContent = jsonResult.name;
         // store array of types (1 or 2)
         app.typeArray = jsonResult.types;
         // if there are 2 types, print both
         if (app.typeArray.length === 2) {
            app.pokeType.innerText = `${app.typeArray[0].type.name} ${app.typeArray[1].type.name}`;
            // if it's just one, print it
         } else if (app.typeArray.length === 1) {
            app.pokeType.innerText = `${app.typeArray[0].type.name}`;
         }
      })
      .catch((error) => {
         alert("Something went wrong, try again later");
      })
   };

// method - if button Right is pressed, add 1 from app.pokeID and fetch again;
app.clickNext = () => {
   app.pokeID++;
   
   if (app.pokeID === 1011) {
      app.pokeID = 1;
   }
   
   app.pokeIndex.textContent = app.pokeID;
   app.getPokemon();
};

// method - if button Left is pressed, subtract 1 from app.pokeID and fetch again;
app.clickPrevious = () => {
   app.pokeID--;
   
   if (app.pokeID === 0) {
      app.pokeID = 1010;
   }

   app.pokeIndex.textContent = app.pokeID;
   app.getPokemon();
};

// method - if button A or B is pressed, randomize app.pokeID and fetch again;
app.clickRandom = () => {
   app.pokeID = (Math.floor(Math.random() * 1010 + 1)); //1 to 1010;  maximum and  minimum are inclusive
   app.pokeIndex.textContent = app.pokeID;
   app.getPokemon();
};

// method - play/pause music with button
app.music = () => {
   app.audio.paused ? app.audio.play() : app.audio.pause();
};

// keydown events
app.keyEvents = () => {
   document.addEventListener('keydown', function (event) {
      if (event.code === 'ArrowRight') { // right key
         app.clickNext();
      }
      else if (event.code === 'ArrowLeft') { // left key
         app.clickPrevious();
      }
      else if (event.code === 'KeyA' || event.code === 'KeyB') { // A or B button
         app.clickRandom();
      }
   });
}

app.init = () => {
   app.pokeName = document.getElementById('name');
   app.pokeHeight = document.getElementById('height');
   app.pokeWeight = document.getElementById('weight');
   app.pokeType = document.getElementById('type'); // array
   app.pokeSprite = document.getElementById('sprite'); // png

   app.btnRight = document.getElementById('btnRight'); // right button
   app.btnLeft = document.getElementById('btnLeft'); // left button
   app.btnA = document.getElementById('btnA'); // A button
   app.btnB = document.getElementById('btnB'); // B button
   app.musicBtn = document.getElementById('onOff'); // music play/pause button
   app.pokeIndex = document.getElementById('pokemonIndex'); // pokemon index number (app.pokeid)

   app.audio = new Audio('./assets/10 Battle! (Trainer Battle).mp3');
   app.audio.volume = 0.1;

   // disable up and down buttons
   app.btnUp = document.getElementById('btnUp').disabled = true;
   app.btnDown = document.getElementById('btnDown').disabled = true;

   // click events
   app.btnRight.addEventListener('click', app.clickNext);
   app.btnLeft.addEventListener('click', app.clickPrevious);
   app.btnA.addEventListener('click', app.clickRandom);
   app.btnB.addEventListener('click', app.clickRandom);
   app.musicBtn.addEventListener('click', app.music);
   app.keyEvents();
   
   app.getPokemon();
}

app.init();


