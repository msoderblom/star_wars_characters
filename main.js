(() => {
  const infoSection = document.querySelector("#infoSection");
  const logoSection = document.querySelector("#logoSection");

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

    res.forEach((characterArray) => {
      characterArray.forEach((character) => {
        allCharacters.push(character);
      });
    });

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

    let nameList = document.querySelector("#character-ul");
    nameList.innerHTML = "";
    nameList.innerHTML = names;

    document.querySelectorAll(".character-name").forEach((listitem) => {
      listitem.addEventListener("click", showInfo);
    });
  };

  const extraFetch = async (endpoint) => {
    const response = await fetch(endpoint);
    const json = await response.json();
    return await json;
  };

  const showInfo = (e) => {
    console.log(e.currentTarget.classList);

    if (e.currentTarget.className.includes("active")) {
      console.log("hej från if");
      infoSection.classList.add("hide");
      logoSection.classList.remove("hide");

      document.querySelector("#infoSection").innerHTML = "";
      e.currentTarget.classList.remove("active");
      return;
    }

    document.querySelectorAll(".character-name").forEach((listitem) => {
      listitem.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

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
                    <img src="./assets/films/${
                      film.episode_id
                    }.jpg" alt="Film poster">
                    </div>
                    <p class="episode">Episode ${romanize(film.episode_id)}</p>
                    <p class="title">${film.title}</p>  
                  </div>`;
        })
        .join("");

      const characterInfo = `
                            <article class="character-info__article">
                              <button id="close-btn" class="close-btn">
                                <div class="sword left"></div>
                                <div class="sword right"></div>
                              </button>
                              <h2 class="character-info__article__title">${theCharacter.name}</h2>
                              <div class="character-info__article__features">
                                <ul class="list">
                                  <li><strong>Eye color:</strong> ${theCharacter.eye_color}</li>
                                  <li><strong>Hair color:</strong> ${theCharacter.hair_color}</li>
                                  <li><strong>Height:</strong> ${theCharacter.height} cm</li>
                                  <li><strong>Mass:</strong> ${theCharacter.mass} kg</li>
                                </ul>
  
                              </div>
                              <div class="character-info__article__birth-info">
                                <ul class="list">
                                  <li><strong>Birth year:</strong> ${theCharacter.birth_year}</li>
                                  <li><strong>Homeworld:</strong> ${homeworld.name}
                                    <ul class="character-info__article__birth-info__homeworld">
                                      <li><strong>Population:</strong> ${homeworld.population}</li>
                                      <li><strong>Climate:</strong> ${homeworld.climate}</li>
                                      <li><strong>Terrain:</strong> ${homeworld.terrain}</li>
                                    </ul>
                                  </li>         
                                </ul>
                              </div>
                              <div class="character-info__article__films">
                                <h3 class="character-info__article__films__title">Films</h3>
                                <div class="character-info__article__films__wrapper">
                                ${filmSection}
                                </div>
                              </div>
                            </article>`;

      infoSection.innerHTML = characterInfo;
      document.querySelector("#close-btn").addEventListener("click", closeInfo);

      infoSection.classList.remove("hide");
      logoSection.classList.add("hide");
    });
  };

  setID();

  const listSearch = (e) => {
    const searchWord = e.currentTarget.value.toLowerCase();

    const filteredList = allCharacters.filter((character) =>
      character.name.toLowerCase().includes(searchWord)
    );
    renderNames(filteredList);
  };

  const closeInfo = () => {
    infoSection.classList.add("hide");
    logoSection.classList.remove("hide");
    document.querySelectorAll(".character-name").forEach((listitem) => {
      listitem.classList.remove("active");
    });
  };

  const romanize = (num) => {
    // This functions is taken from here: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    if (!+num) return false;
    var digits = String(+num).split(""),
      key = [
        "",
        "C",
        "CC",
        "CCC",
        "CD",
        "D",
        "DC",
        "DCC",
        "DCCC",
        "CM",
        "",
        "X",
        "XX",
        "XXX",
        "XL",
        "L",
        "LX",
        "LXX",
        "LXXX",
        "XC",
        "",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
      ],
      roman = "",
      i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  };

  document.querySelector("#searchfield").addEventListener("change", listSearch);
  document.querySelector("#searchfield").addEventListener("keyup", listSearch);
})();
