const forms = document.querySelectorAll(".signup-form")


const getTemplate = () => {
  return fetch("./template.html")
    .then((response) => response.text())
}

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send?id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results.status);
      if(results.status == 200){
        alert("E-mail send!!!")
      } else {
        alert("Send failed")
      }
      document.getElementById("email").value = ""
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

}