(() => {
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

  const renderNames = async () => {
    const characterList = await getAllCharacters();

    let names = characterList
      .map((character) => {
        return `<li>${character.name}</li>`;
      })
      .join("");

    console.log(names);

    let nameList = document.createElement("ul");
    nameList.innerHTML = names;

    document.querySelector("#nameNavigation").append(nameList);
    console.log(characterList);
  };

  renderNames();
})();
