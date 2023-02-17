const url = "https://randomuser.me/api/";
const d = document,
  $perfil = d.querySelector(".perfil");

async function ajax(props) {
  let { url, cbSuccess } = props;

  

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      let message = err.statusText || `Ocurrió un error al acceder a la API`;
      $perfil.innerHTML = `
      <div >
        <p>Error ${err.status}: ${message}</p>
      </div>      
      `;
      console.log(err);
    });
}

await ajax({
  url,
  cbSuccess: (json) => {
    const person = json.results[0];
    console.log(person);

    d.querySelector(".perfil").insertAdjacentHTML(
      "afterbegin",
      `<div><h1>${person.name.first} ${person.name.last}</h1><h3>Full Stack Developer</h3></div>`
    );
    d.querySelector(".perfil-pic img").src = person.picture.large;
    d.querySelector(".perfil-pic img").style =
      "border-radius : 0%; border: 0.6rem solid #000000cc";

    d.querySelector(".info").insertAdjacentHTML(
      "afterbegin",
      ` <p>
            <b>Desarrollador de software activo y eficiente</b> que trabaja de manera sobresaliente tanto individual como en equipos.<br />
            <br/>
            <em>
            En la incansable busqueda de nuevos conocimientos y tecnologias para aprender y aplicar en el mundo laboral
            </em>
            <br />
            <br/>
            <em>
                  Siempre a disposicion de compartir los conocimientos y habilidades adquiridas para mejorar la eficiencia y calidad de el lugar donde trabaje
            </em>
            <br />
            <br/>
            
        </p>
        
        `
        
        
    );

    d.querySelector(".loader").style = "display: none";

    d.addEventListener("click", (e) => {
      if (e.target.matches("#envelope") || e.target.matches("#envelope *")) {
        d.querySelector(".info").innerHTML = `
            <p> Email </p>
            <h2>${person.email}</h2>
            `;
      }
      
      if (e.target.matches("#calendar") || e.target.matches("#calendar *")) {
        d.querySelector(".info").innerHTML = `
            <p>Edad</p>
            <h2>${person.dob.age} años</h2>
            `;
      }
      if (e.target.matches("#location") || e.target.matches("#location *")) {
        d.querySelector(".info").innerHTML = `
            <p>Residencia</p>
            <h2>${person.location.street.name} ${person.location.street.number} - ${person.location.city}, ${person.location.country}</h2>
            `;
      }
      if (e.target.matches("#phone") || e.target.matches("#phone *")) {
        d.querySelector(".info").innerHTML = `
            <p>Numero Telefonico</p>
            <h2>${person.phone}</h2>
            `;
      }
    
    });
  },
});
 