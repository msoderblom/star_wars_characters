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
    console.log(res);

    res.forEach((characterArray) => {
      characterArray.forEach((character) => {
        allCharacters.push(character);
      });
    });
    console.log(allCharacters);
    return allCharacters;
  };

  const setID = async () => {
    allCharacters = await getAllCharacters();

    let counter = 0;
    allCharacters.forEach((character) => {
      character["id"] = counter;
      counter++;
    });
    /* console.log(allCharacters); */

    renderNames(allCharacters);
  };

  const renderNames = (characterList) => {
    let names = characterList
      .map((character) => {
        return `<li data-id="${character.id}" class="character-list__nav__ul__listitem character-name">${character.name}</li>`;
      })
      .join("");

    /*  console.log(names); */

    let nameList = document.createElement("ul");
    nameList.classList.add("character-list__nav__ul");
    nameList.innerHTML = names;

    document.querySelector("#nameNavigation").append(nameList);
    console.log(characterList);

    document.querySelectorAll(".character-name").forEach((listitem) => {
      listitem.addEventListener("click", showInfo);
    });
  };

  const showInfo = (e) => {
    const characterId = e.currentTarget.dataset.id;
    /*    console.log(e.currentTarget.dataset.id);
    console.log(allCharacters); */

    const theCharacter = allCharacters.find(
      (character) => character.id == characterId
    );
    /* console.log(theCharacter); */

    const characterInfo = `
                          <article class="character-info__article">
                            <h2>${theCharacter.name}</h2>
                            <div>
                              <ul>
                                <li>${theCharacter.birth_year}</li>
                                <li>${theCharacter.eye_color}</li>
                                <li>${theCharacter.hair_color}</li>
                                <li>${theCharacter.height}</li>
                                <li>${theCharacter.mass}</li>
                              </ul>

                            </div>
                          </article>`;

    document.querySelector("#infoSection").innerHTML = characterInfo;
  };

  setID();
})();
