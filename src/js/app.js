import "../style/index.css";

//Crear un HTML dinámicamente usando las variables proporcionadas

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // imprimir en la consola
  // aquí hacemos las preguntas lógicas para tomar decisiones sobre cómo construir el html

  // Lógica para mostrar o no la portada
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;

  /* interpolación de variables: ${variables.background} forma de insertar el valor de una variable dentro de una cadena de texto.
  Por ejemplo, si variables.background es "https://images.unsplash.com/photo-1511974035430-5de47d3b95da */

  // si includeCover==false entonces restablecemos el código de portada sin la etiqueta <img> para que la portada sea transparente.
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Lógica para crear los enlaces de redes sociales. Solo se agregan los enlaces de redes sociales si el nombre de usuario correspondiente está presente.
  let socialMediaLinks = "";
  if (variables.twitter) {
    socialMediaLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  }
  if (variables.github) {
    socialMediaLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  }
  if (variables.linkedin) {
    socialMediaLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  }
  if (variables.instagram) {
    socialMediaLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;
  }

  // Lógica para la posición de la barra de redes sociales, eliminamos null

  let socialMediaPositionClass =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  // Lógica para el nombre completo
  let fullName =
    (variables.name ? variables.name : "") +
    " " +
    (variables.lastName ? variables.lastName : "");

  // Lógica para la ciudad y el país
  let location =
    (variables.city ? variables.city : "") +
    (variables.city && variables.country ? ", " : "") +
    (variables.country ? variables.country : "");

  /* Genera el HTML dinámicamente y se inserta en el elemento con el ID widget_content, incluyendo la portada, la imagen de avatar, el nombre completo, el rol, la ubicación y los enlaces de las redes sociales, todo según las variables proporcionadas. */
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" /> 
      <h1>${fullName}</h1>
      <h2>${variables.role ? variables.role : ""}</h2>
      <h3>${location}</h3>
      <ul class="${socialMediaPositionClass}"> 
        ${socialMediaLinks}
      </ul>
    </div>
  `;
}

/**
 * No cambie ninguna de las líneas siguientes, aquí es donde hacemos la lógica para los menús desplegables.
 */
window.onload = function() {
  window.variables = {
    // Si includeCover es verdadero, el algoritmo debería mostrar la imagen de portada.
    includeCover: true,
    //esta es la URL de la imagen que se utilizará como fondo para la portada del perfil.
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // esta es la URL del avatar del perfil
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // Posición de la barra de redes sociales (izquierda o derecha).
    socialMediaPosition: "position-left",
    // nombres de usuario de redes sociales
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // Rederiza por primera vez

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- Añadir un listener a cada input
      const attribute = e.target.getAttribute("for"); //obtiene el nombre de la propiedad del objeto variables que debe actualizarse.

      //crea un objeto values donde la clave es el valor de attribute y el valor es el nuevo valor del elemento de entrada
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); //La función render se encarga de generar el HTML dinámicamente.
    });
  });
};

/*Este código realiza las siguientes acciones:
-Selecciona todos los elementos con la clase picker.
-Añade un event listener de tipo change (cambio) a cada elemento.
-Obtiene el atributo for del elemento que cambió.
-Actualiza el valor correspondiente en el objeto values.
-Llama a la función render con el objeto window.variables actualizado con los nuevos valores.*/
