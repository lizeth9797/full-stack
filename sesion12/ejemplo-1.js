const app = document.getElementById('app');

getImagesFromNasa()
  .then(function (data) {
        console.log(data);
        data.forEach(function (data) {
        const img = document.createElement('img');
        img.src = getImageUrl(data);
        img.alt = data.caption;
  
        app.appendChild(img);
      })  
    })


function getImagesFromNasa() {
    return fetch('https://epic.gsfc.nasa.gov/api/natural')
      .then(function (response) {
        return response.json();
      })
  }

  function getImageUrl(data) {
    const baseImageUrl = 'https://epic.gsfc.nasa.gov/archive/natural';
    const date = data.date // Looks like 2020-06-19 02:33:19
      .substr(0, 10) // Get first 10 characters from string
      .split('-'); // Split year, month and day into an array
  
    console.log(date);
    return `${baseImageUrl}/${date[0]}/${date[1]}/${date[2]}/png/${data.image}.png`;
  }

