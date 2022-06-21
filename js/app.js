//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregar un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click',eliminaCurso);

    vaciarCarrito.addEventListener('click',()=>{
       articulosCarrito=[]
       limpiarHTML();

    })

}
function eliminaCurso(e){
    if(e.target.classList.contains('borrar-curso')){
    const cursoId=e.target.getAttribute('data-id')
        console.log(cursoId)
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId)
        //Iterar sobre el carrito
        carritoHTML();
    }
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }


}

//Leer el contenido del HTML y extraer el contenido en un arreglo
function leerDatosCurso(curso) {
    console.log(curso)
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Revisar si un elemento ya exite en el carrito
    const existe=articulosCarrito.some(curso=>curso.id===infoCurso.id)
    if(existe){
        //actualizamos la cantidad
        const cursos= articulosCarrito.map(curso=>{
            if(curso.id=== infoCurso.id){
                curso.cantidad++;
                return curso
            }else{
                return curso

            }


        })
        articulosCarrito=[...cursos]

    }else{  
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]

    }

    //Agrega elementos al areglo de carrito

    carritoHTML();
    console.log(articulosCarrito)
}

//Muestra carrito de compras  en HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();
    //Recoge y genera html
    articulosCarrito.forEach(curso => {
        const {titulo,precio,cantidad,imagen,id}=curso;
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100px">
        </td>
    <td> ${titulo}</td>
    <td> ${precio}</td>
    <td> ${cantidad}</td>
    <td> 
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
    </td>

    `;
        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

}

//Elimina los cursos del tbody
function limpiarHTML() {
    //FormaLenta
    //contenedorCarrito.innerHTML ='';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}



