// src: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for-await...of


async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log(`DONE in streamAsyncIterator, value=${value}`)
        return;
      }
      yield value;
    }
  }
  finally {
    reader.releaseLock();
  }
}
// On récupère les données d'une URL et
// on calcule la taille de la réponse
// avec un générateur asynchrone
async function getResponseSize(url,start) {
  const response = await fetch(url);
  // La taille de la réponse, exprimée en octets.
  let responseSize = 0;
  // La boucle for-await-of qui parcourt, de façon asynchrone,
  // chaque portion de la réponse.
  for await (const chunk of streamAsyncIterator(response.body)) {
    responseSize += chunk.length;
  }

  console.log(`Taille de la réponse : ${responseSize} octets`);
  document.getElementById('fin').textContent=`${performance.now()-start} ms`;
  return responseSize;
}

let startTime = performance.now();
getResponseSize('https://jsonplaceholder.typicode.com/photos',startTime);


// mes modifs
console.log("APRES l'appel à getResponseSize()")
document.getElementById('modifAsync').textContent='OK';
document.getElementById('debut').textContent=startTime;
