/*
  L'appel d'une fontion qui retourne une Promise rend la main immédiatement (donc, pour moi, elle est asychrone)
*/

function resolveAfter4Seconds() {
  console.log("Initialisation de la promesse lente");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("lente");
      console.log("La promesse lente est terminée");
    }, 4000);
  });
}

function resolveAfter1Second() {
  console.log("Initialisation de la promesse rapide");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("rapide");
      console.log("La promesse rapide est terminée");
    }, 1000);
  });
}

async function sequentialStart() { // async pour avoir le droit d'utiliser await
  // sinon: SyntaxError: await is only valid in async functions and the top level bodies of modules
  // et je crois que "the top level bodies of modules" marche avec une version récente (>2015) de ECMAScript
  console.log('==Début séquentiel==');

  // 1. L'exécution atteint ce point quasi-instantanément
  const lente = await resolveAfter4Seconds();
  console.log(lente); // 2. cela s'exécute 4s après 1.

  const rapide = await resolveAfter1Second();
  console.log(rapide); // 3. cela s'exécute 5s après 1.
}

//sequentialStart(); // après 4 secondes, "lente" est affichée, après une
                   // autre seconde, c'est "rapide" qui est affichée

async function concurrentStart() {
  console.log('==Début concurrentiel avec await==');
  const lente = resolveAfter4Seconds(); // le minuteur démarre immédiatement
  const rapide = resolveAfter1Second();  // le minuteur démarre immédiatement

  // 1. L'exécution atteint ce point quasi-instantanément
  console.log(await lente);  // 2. s'exécute 4s après 1.
  console.log(await rapide); // 3. s'exécute 4s après 1., immédiatement après 2.,
                             // car "rapide" est déjà résolue
}

concurrentStart();
// pour comprendre: executer

function monTest() { 
  console.log('==Début de mon test==');

  // 1. L'exécution atteint ce point quasi-instantanément
  const lente = resolveAfter4Seconds();
  console.log(lente.state); 

  const rapide = resolveAfter1Second();
  console.log(rapide); 

  console.log('==FIN de mon test==');
}

//monTest();
// les console.log s'exécutent immédiatement mais n'affichent pas vraiment de valeur (Promise { <pending> })

async function concurrentStart2() {
  console.log('==Début n°2 concurrentiel avec await==');
  const lente = resolveAfter4Seconds(); // le minuteur démarre immédiatement
  const rapide = resolveAfter1Second();  // le minuteur démarre immédiatement

  // 1. L'exécution atteint ce point quasi-instantanément
  console.log(await rapide); // 2. s'exécute 1s après 1.
  console.log(await lente);  // 3. s'exécute 3s (4-1=3) après 2.
}
//concurrentStart2();