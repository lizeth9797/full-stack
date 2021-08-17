/* <div class="card">
  <img src="http://example.com" alt="John Doe">
  <h2>John Doe</h2>
  <a href="https://example.com/johndoe" target="blank" class="button">
    GitHub
  </a>
</div>
 */

//login avatar_url html_url

const div=document.getElementById("app").appendChild(createNode("img"))

  console.log(div)
  console.log('hola')


/* const div=document.createElement('div')
div.className = "card";
const img=document.createElement('img')
const h2=document.createElement('h2')
const a=document.createElement('a')

div.appendChild()

 */

/* getUsers()
  .then(function (data) {
        console.log(data);



        data.forEach(function (data) {
        const img = document.createElement('img');
        img.src = getImageUrl(data);
        img.alt = data.caption;
  
        app.appendChild(img);
      })  
    })


function getUsers() {
    return fetch('https://api.github.com/users')
      .then(function (response) {
        return response.json();
      })
  }
 */
  
