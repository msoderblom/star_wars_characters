(() => {
  /* fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((character) => {
        charactersArray.push(character);
      });
      console.log(data.next != null || data.next != "");
      while (data.next != null || data.next != "") {
        fetch(data.next)
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((character) => {
            charactersArray.push(character);
          });
      }
    }); */

  const getAllCharacters = () => {
    const characters = [];
    const apiUrl = "https://swapi.dev/api/people/";

    function fetchPage(endpoint) {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((character) => {
            characters.push(character);
          });
          endpoint = data.next;
          return endpoint;
        })
        .then((endpoint) => {
          if (endpoint != null) {
            fetchPage(endpoint);
          } else {
            return;
          }
        });
    }
    fetchPage(apiUrl);
    return characters;
  };

  const allCharacters = getAllCharacters();
})();
