/* const characters = [];
const fetchData = async (endpoint) => {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((character) => {
        characters.push(character);
      });
    });
};

const getAllCharacters = async () => {
  const apiUrl = "https://swapi.dev/api/people";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((character) => {
        characters.push(character);
      });
    });
  for (let i = 2; i < 10; i++) {
    fetchData(`${apiUrl}?page=${i}`);
  }
  console.log(characters[0]);
};

getAllCharacters(); */

/* const request = async () => {
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

const useRequest = async () => {
  const res = await request();
  console.log(res);

  res.forEach((characterArray) => {
    let counter = 1;
    characterArray.forEach((character) => {
      console.log(counter, character.name);
      counter++;
    });
  });
};

useRequest();
 */
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

/*  const getAllCharacters = () => {
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
  console.log(allCharacters);

  console.log(allCharacters[1].name); */

/* let myArray = [];
let theArray = []; */

/* async function getData() {
  return fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
} */

const characters = [];
const jsonResponses = [];
const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  jsonResponses.push(json.results);

  endpoint = json.next;

  if (endpoint != null) {
    fetchData(endpoint);
  } else {
    return;
  }
  /* fetch(endpoint)
    .then((response) => {
      response.json();
    })
    .then((data) => {
      const datan = await data;
      datan.results.forEach((character) => {
        characters.push(character);
      });
      endpoint = datan.next;
      return endpoint;
    })
    .then((endpoint) => {
      if (endpoint != null) {
        fetchData(endpoint);
      } else {
        return;
      }
    }); */
};

const getAllCharacters = async () => {
  const apiUrl = "https://swapi.dev/api/people/";

  await fetchData(apiUrl);

  /*  renderCharacterList(); */

  console.log(jsonResponses);
  /*   return characters; */
};

getAllCharacters();
/* const renderCharacterList = async () => {
  const allCharacters = await getAllCharacters();
  console.log(allCharacters);
 */
/*  const allCharacters = characters; */
/* console.log(characters);
  console.log(characters);
  console.log(characters); */

/*  allCharacters.forEach((character) => {
    console.log(character);
  }); */
/* }; */

/* renderCharacterList(); */
/* async function caller() {
  const json = await getData(); // command waits until completion
  console.log(json.results[0]);
}
caller();
 */
//arrayen skrivs ut innan fetch är färdig
/* console.log(theArray);
console.log(theArray[0]);

console.log(myArray);
console.log(myArray.length);
console.log(myArray[0]);

const arr2 = ["hej", "på", "dig", 5];
console.log(arr2);
console.log(arr2.length); */

/*  allCharacters.forEach((character, index) => {
    console.log(index);
  }); */

/* let names = allCharacters
    .map((character) => {
      return `<li>${character.name}</li>`;
    })
    .join("");

  console.log(names);

  let nameList = document.createElement("ul");
  nameList.innerHTML = names;
  console.log(nameList);

  document.querySelector("body").append(nameList); */
