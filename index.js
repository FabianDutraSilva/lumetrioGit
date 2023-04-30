//base de datos inicial
let recetas = [
    {
        nombre: "pizza",
        ingredientes: ["harina", "levadura", "salsa de tomate", "muzzarella", "aceite"],
        preparacion:
            "mezclar la harina con la levadura, agregar agua tibia, amasar, leudar por 1hs, estirar en asadera aceitada, agregar la salsa de tomate, llevar a horno precalentado hasta que haga apenas piso. Agregar la muzzarella, encender el grill, controlar hasta que se derrita la muzzarella.",
    },
    {
        nombre: "arroz con atun",
        ingredientes: ["arroz", "atun", "aceite"],
        preparacion:
            "Colocar un chorro de aceite en olla y calentar, agregar el arroz y sofritar hasta que agarre color, agregar el doble de agua que de arroz, hervir a fuego medio. Una vez evaporada el agua, apagar la hornalla, colocar tapa y dejar reposar 20 min. Agregar el atún y mezclar. ",
    },
    {
        nombre: "fideos con tuco",
        ingredientes: ["fideos", "salsa de tomate", "cebolla", "zanahoria", "carne", "aceite"],
        preparacion:
            "Colocar agua a hervir en una olla, el triple de agua en volumen que de fideos. Cuando rompa el hervor agregar los fideos. Retirar un fideo a los 8 minutos y revisar si el punto de cocción es el deseado: al dente/pasado. En otra olla colocar aceite, y sofritar la zanahoria cortada en trozos chicos, luego agregar la carne y por último la carne, precocinando todos los elementos. Luego agregar la salsa de tomate y agua al 10% y dejar hervir hasta que espese y se cocinen tanto las dos verduras como la carne. Por último mezclar todo.",
    },
    {
        nombre: "carne con papas al horno",
        ingredientes: ["papas", "carne", "cebolla", "aceite"],
        preparacion: "Colocar todos los elementos en asadera aceitada y cocinar a horno alto.",
    },
    {
        nombre: "milanesas con fritas",
        ingredientes: ["milanesas", "papas", "aceite"],
        preparacion: "Pelar y cortar las papas en tiras, colocar aceite en sartén y freír. Luego freir las milanesas.",
    },
];

let ingredientesDisponibles = ["milanesas", "papas", "aceite"];

//funciones auxiliares para manejar mensaje
function borrarMsj() {
    let pList = document.getElementsByTagName("p");
    while (pList.length > 0) {
        pList[0].parentNode.removeChild(pList[0]);
    }
}

function mostrarMsj(mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
}

//agregar ingrediente
function agregarIngredienteDisponible() {
    borrarMsj();
    let texto;
    let auxIngrediente = prompt("Ingrese el ingrediente disponible:", "panchos").toLowerCase();
    if (auxIngrediente == null || auxIngrediente == "") {
        texto = "El usuario canceló el prompt.";
    } else {
        texto = "Se ingresó " + auxIngrediente + " correctamente.";
        ingredientesDisponibles.push(auxIngrediente);
    }
    insertarP(texto);
}

// crea una nueva receta para agregar al recetario
function nuevaReceta() {
    borrarMsj();
    let nombreNuevaReceta = prompt("Ingrese el nombre de la receta", "panchos al pan");
    let strNuevaListaIngredientes = prompt(
        "Ingrese nueva lista de ingredientes, separados por coma y sin espacios",
        "panchos,pan"
    );
    let nuevaPreparacion = prompt(
        "Ingrese la preparacion de la nueva receta",
        "hervir los panchos y colocar en el pan"
    );

    let arrNuevaListaIngredientes = strNuevaListaIngredientes.split(",");
    recetas.push({ nombre: nombreNuevaReceta, ingredientes: arrNuevaListaIngredientes, preparacion: nuevaPreparacion });
    insertarP("Nombre: " + nombreNuevaReceta);
    insertarP("Ingredientes: " + strNuevaListaIngredientes);
    insertarP("Preparacion: " + nuevaPreparacion);
}

//muestra los ingredientes en la base de datos
function mostrarIngredientes() {
    borrarMsj();
    insertarP("Ingredientes disponibles: " + ingredientesDisponibles);
}

//funcion auxiliar para buscar ingrediente en receta
function buscarIngrediente(ingredientes, objetivo) {
    let encontrado = false;
    for (let i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i] == objetivo) {
            encontrado = true;
        }
    }
    return encontrado;
}

//funcion insertar p en el body de html
function insertarP(texto) {
    let parrafo = document.createElement("p");
    parrafo.textContent = texto;
    parrafo.className = "parrafos";
    document.body.appendChild(parrafo);
}

//funcion encontrar receta con ingredientes disponibles
function encontrarReceta() {
    borrarMsj();
    let recetasPosibles = [];
    let ingredienteEncontrado;

    for (let i = 0; i < recetas.length; i++) {
        ingredienteEncontrado = 0;
        for (let j = 0; j < ingredientesDisponibles.length; j++) {
            if (buscarIngrediente(recetas[i].ingredientes, ingredientesDisponibles[j])) {
                ingredienteEncontrado = ingredienteEncontrado + 1;
            }
        }
        if (recetas[i].ingredientes.length == ingredienteEncontrado) {
            recetasPosibles.push(recetas[i].nombre);
            insertarP("Nombre: " + recetas[i].nombre);
            insertarP("Ingredientes: " + recetas[i].ingredientes);
            insertarP("Preparación: " + recetas[i].preparacion);
            insertarP("--------------------");
        }
    }

    if (recetasPosibles.length == 0) {
        insertarP("No existen recetas con los ingredientes disponibles");
    }
}

function mostrarRecetas() {
    borrarMsj();
    for (let i = 0; i < recetas.length; i++) {
        insertarP("Nombre: " + recetas[i].nombre);
        insertarP("Ingredientes: " + recetas[i].ingredientes);
        insertarP("Preparación: " + recetas[i].preparacion);
        insertarP("--------------------");
    }
}
