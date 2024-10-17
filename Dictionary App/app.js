const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input");
infoText = wrapper.querySelector(".info-text");
synonyms = wrapper.querySelector(".synonyms .list");
volumeIcon = wrapper.querySelector(".word i");
let audio;
removeIcon = wrapper.querySelector(".close span i");

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `can't find the meaning of <span>"${word}"</span>. Please try to search another word.`;
  } else {
    console.log(result);
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    let phonetics = `${result[0].meanings[0].partOfSpeech}/${result[0].phonetics[0].text}/`;
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example;
    audio = new Audio(result[0].phonetics[0].audio); // Corrected capitalization

    if (definitions.synonyms && definitions.synonyms.length > 0) {
      synonyms.innerHTML = ""; // Clear previous synonyms
      for (let i = 0; i < Math.min(definitions.synonyms.length, 5); i++) {
        let tag = `<span onclick=search('${definitons.synonyms[i]}')>${definitions.synonyms[i]},</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    } else {
      synonyms.innerHTML = "<span>No synonyms found</span>";
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
}

function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});

removeIcon.addEventListener("click", () => {
  console.log("remove icon clicked");
  searchInput.value = "";
  searchInput.focus();
});
