/* -------------
RETO 03
----------------
Se debe mostrar el mensaje n cantidad de veces, determinado por triggerActions. Tomar en cuenta que no se debe modificar la función processAction.
*/ 

const processAction = (i, callback) => {
  setTimeout(function() {
    callback("Processed Action " + i);
  }, Math.random()*1000);
}

  const triggerActions = (count) => {
  const promises = [];
  const generatePromise = (i) => {
    return new Promise((resolve) => {
      processAction(i, resolve);
    });
  }
  for (let i = 1; i <= count; i += 1) {
    promises.push(generatePromise(i));
  }
  Promise.all(promises)
    .then((strings) =>
      strings.forEach((string) => console.log(string)));
}

triggerActions(10);