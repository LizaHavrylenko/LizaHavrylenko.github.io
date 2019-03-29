function splitWords() {
    let header = document.querySelector("h2");
    header.innerText.replace(/(<([^>]+)>)/ig,"");
    words = header.innerText.split(" "),
    wordCount = words.length;
    header.innerHTML = "";
    for (let i=0; i < wordCount; i++) {
      header.innerHTML += "<span>" + words[i] + "</span>";
      if (i < words.length - 1) {
        header.innerHTML += " ";
      }
    }
    words = document.querySelectorAll("h2 span");
    fadeWords(words);
  }
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function fadeWords(words) {
    words.forEach(word => {
      let animate = word.animate([{
        opacity: 0,
        filter: "blur("+getRandom(2,5)+"px)"
      }, {
        opacity: 1,
        filter: "blur(0px)"
      }], 
      { 
        duration: 1000,
        delay: getRandom(500,3300),
        fill: 'forwards'
      } 
     )
    })
  }
  
  
splitWords();

const plane = document.getElementById("plane-icon");
const nav = document.getElementById("navigation");
const closeIcon = document.getElementById("close-nav");
plane.addEventListener('click', () => {
  nav.style.opacity = 1;
  plane.style.opacity = 0;
});
closeIcon.addEventListener('click', () => {
    nav.style.opacity = 0;
    plane.style.opacity = 1;
  });