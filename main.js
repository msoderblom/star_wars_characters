(() => {
  let allCharacters;
  const request = async () => {
    const jsonResponses = [];
    const response = await fetch("https://swapi.dev/api/people");
    const json = await response.json();
    jsonResponses.push(json.results);

    const apiUrl = "https://swapi.dev/api/people";
    for (let i = 2; i < 10; i++) {
      const response = await fetch(`${apiUrl}?page=${i}`);
      const json = await response.json();
      jsonResponses.push(json.results);
    }

    return jsonResponses;
  };

  const getAllCharacters = async () => {
    const allCharacters = [];
    const res = await request();
    /* console.log(res); */

    res.forEach((characterArray) => {
      characterArray.forEach((character) => {
        allCharacters.push(character);
      });
    });
    /* console.log(allCharacters); */
    return allCharacters;
  };

  const setID = async () => {
    allCharacters = await getAllCharacters();

    let counter = 0;
    allCharacters.forEach((character) => {
      character["id"] = counter;
      counter++;
    });
    console.log(allCharacters);

    renderNames(allCharacters);
  };

  const renderNames = (characterList) => {
    let names = characterList
      .map((character) => {
        return `<li data-id="${character.id}" class="character-list__nav__ul__listitem character-name">${character.name}</li>`;
      })
      .join("");

    /*  console.log(names); */

    let nameList = document.querySelector("#character-ul");
    nameList.innerHTML = "";
    nameList.innerHTML = names;

    /* document.querySelector("#nameNavigation").append(nameList); */
    /* console.log(characterList); */

    document.querySelectorAll(".character-name").forEach((listitem) => {
      listitem.addEventListener("click", showInfo);
    });
  };

  /* const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }; */

  const extraFetch = async (endpoint) => {
    const response = await fetch(endpoint);
    const json = await response.json();
    return await json;
  };

  const showInfo = (e) => {
    const characterId = e.currentTarget.dataset.id;

    const getInfo = async (id) => {
      return new Promise((resolve, reject) => {
        const theCharacter = allCharacters.find(
          (character) => character.id == id
        );

        let homeworld;
        (async () => {
          homeworld = await extraFetch(theCharacter.homeworld);
        })();

        const films = [];
        let itemsProcessed = 0;
        theCharacter.films.forEach(async (film, index, array) => {
          console.log(film);
          films.push(await extraFetch(film));

          itemsProcessed++;
          if (itemsProcessed === array.length) {
            console.log("hej från ifsatsen");

            resolve({ theCharacter, films, homeworld });
          }
        });
        console.log(films);
      });
    };

    getInfo(characterId).then(({ theCharacter, films, homeworld }) => {
      console.log(theCharacter, films);
      console.log(films[0]);
      console.log(homeworld);

      const filmSection = films
        .map((film) => {
          return `<div class="character-info__article__films__wrapper__film">
                    <div>
                    <img src="./assets/films/${film.episode_id}.jpg" alt="Film poster">
                    </div>
                    <p>Episode ${film.episode_id}</p>
                    <p>${film.title}</p>  
                  </div>`;
        })
        .join("");

      const characterInfo = `
                            <article class="character-info__article">
                              <button id="close-btn" class="close-btn">x</button>
                              <h2 class="character-info__article__title">${theCharacter.name}</h2>
                              <div class="character-info__article__features">
                                <ul>
                                  <li>${theCharacter.eye_color}</li>
                                  <li>${theCharacter.hair_color}</li>
                                  <li>${theCharacter.height}</li>
                                  <li>${theCharacter.mass}</li>
                                </ul>
  
                              </div>
                              <div class="character-info__article__birth-info">
                              <p>Birth year: ${theCharacter.birth_year}</p>
                              <p>${homeworld.name}</p>
                              <ul>
                              <li>Population: ${homeworld.population}</li>
                              <li>${homeworld.climate}</li>
                              <ul>
                              </div>
                              <div class="character-info__article__films">
                                <h3 class="character-info__article__films__title">Films</h3>
                                <div class="character-info__article__films__wrapper">
                                ${filmSection}
                                </div>
                              </div>
                            </article>`;

      document.querySelector("#infoSection").innerHTML = characterInfo;
      document.querySelector("#close-btn").addEventListener("click", () => {
        console.log("close");
      });
    });

    /* console.log(theCharacter); */

    /*    await asyncForEach(theCharacter.films, async (num) => {
        await waitFor(50);
        console.log(num);
      }); */

    // expected output: "Success!"

    /*  console.log(films[1]); */
  };

  setID();

  const listSearch = (e) => {
    const searchWord = e.currentTarget.value.toLowerCase();
    /* console.log(searchWord); */

    const filteredList = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchWord)
    );
    /* console.log(filteredList); */
    renderNames(filteredList);
  };

  document.querySelector("#searchfield").addEventListener("change", listSearch);
  document.querySelector("#searchfield").addEventListener("keyup", listSearch);
})();
