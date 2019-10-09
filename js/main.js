console.log('Super lista de compras');
//generamos un listado de items para comprar que se pueda desplegar en la vista
//registramos el service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(function(reg){
        console.log('Service Worker registrado Exitosamente', reg);
    })
    .catch(function(err) {
        console.log('Error registrando el Service Worker', err);
    });
}
let listaDecompras = [
    {nombre:'Envia Mail Fanes', precio:1},
    {nombre:'Inventario Cajon Solar', precio:2},
    {nombre:'Cambiar Termocupla Caldera', precio:3},
    {nombre:'Cargar Horas Equipos', precio:4}
]
function borrar(index){
    console.log(index);
    listaDecompras.splice(index,1);
    renderList();
}
function cambiarPrecio(e,index){
    console.log('cambiar',index);
    let precioNuevo= e.value;
    console.log(e.value);
    listaDecompras[index].precio=precioNuevo;
    console.log(listaDecompras);
}

function renderList(){
    let productos = '';
    listaDecompras.forEach((producto, index) => {

            productos +=    `<li class='mdl-list__item'>
                            <span class='mdl-list__item-primary-content'>
                                ${producto.nombre}
                            </span>
                            <span class='spanhoras'>horas= </span>
                            <div class='mdl-textfield mdl-js-textfield'>
                                
                                <input class='mdl-textfield__input' value='${producto.precio}' onchange='cambiarPrecio(this,${index})' type='text' id='sample${index+1}'>
                                <label class='mdl-textfield__label' for='sample${index+1}'></label>
                            </div>
                            <button onclick='borrar(${index})' class='boton-borrar mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
                                Borrar
                            </button>
                            <button onclick='borrar(${index})' class='boton-borrar mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
                                Cerrar
                            </button>
                        </li>
                        `
    })
    document.getElementById('lista').innerHTML=productos;
}
document.getElementById('borrar-lista').addEventListener('click', ()=>{
    console.log('apreto el boton borrar');
    listaDecompras=[];
    renderList();
})

document.getElementById('agregar-producto').addEventListener('click', ()=>{
    console.log('apreto el boton agregar');
    let prod = document.getElementById('producto').value
    if(prod!=''){
        listaDecompras.push({nombre: prod, precio:0});
        document.getElementById('producto').value = '';
    }
    
    renderList();
})


renderList();
