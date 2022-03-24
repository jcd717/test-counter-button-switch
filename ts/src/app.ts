
let plus = document.getElementById('button-plus1') as HTMLButtonElement;
plus.addEventListener('click', addCompteur);

function addCompteur(): void {
  let divCompteur = document.getElementById('compteur') as HTMLDivElement;
  let compteur = (divCompteur.textContent === null) ? 0 : parseInt(divCompteur.textContent, 10);
  divCompteur.textContent = (compteur + 1).toString();
}

let cbOFF = document.getElementById('OFF') as HTMLInputElement;
cbOFF.addEventListener('change', event => {
  let off = (event.target as HTMLInputElement).checked;
  changeStateButton(!off);

});

let intervalID=-1;

function changeStateButton(on: boolean) {
  (document.getElementById('button-plus1') as HTMLButtonElement).disabled = on;
  if (on) {
    // doc de setInterval très intéressante à relire chaque fois qu'on l'utilise
    intervalID= setInterval(addCompteur);
  }
  else {
    clearInterval(intervalID);
    intervalID=-1;
  }
}



