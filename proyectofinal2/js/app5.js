import { ref, get, getDatabase } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { app } from './app.js';
const db = getDatabase(app);

const productosRef = ref(db, 'Productos');
let article;

mostrarProductos();

async function mostrarProductos(){
    var id = await numStatus();
    mostrarCartas(id);
}


async function numStatus(){
    try {
        const snapshot = await get(productosRef);
        var y = 0;
        if (snapshot.exists()) {
            const productosData = snapshot.val();
            const numNodos = Object.keys(productosData).length;
            for (let x = 0; x < numNodos; x++) {
                const nodoProductoRef = ref(db, 'Productos/' + x);
                const subSnapshot = await get(nodoProductoRef);
                const data = subSnapshot.val();
                if (data.status == 0) {
                    y++;
                }
            }
            return y;
        } else {
            console.log("El nodo 'Productos' no contiene datos.");
            return 0; // Podrías querer manejar este caso de manera específica.
        }
    } catch (error) {
        console.error("Error al obtener datos de 'Productos':", error);
        throw error; // Propaga el error para que pueda ser manejado en el llamador.
    }
}


function mostrarCartas(id){
    get(productosRef).then((snapshot) => {
        if (snapshot.exists()) {
            const productosData = snapshot.val();
            //Cantidad de Datos
            const numNodos = (Object.keys(productosData).length);
            var cant = (id / 3);
            for (let y = cant; y > 0; y--) {
                articulos(cant);
                cant--;
            }
            var y=0;
            for (let x = 0; x < numNodos; x++) {
                const nodoProductoRef = ref(db, 'Productos/' + x);
                get(nodoProductoRef).then((snapshot) => {
                    const data = snapshot.val();
                    if (data.status == 0) {
                        console.log(data.status);
                        console.log(x);
                        console.log(data.nombre);

                        //-----------Agregando Imagenes-----------
                        var cards = document.querySelectorAll('.card');
                        var imgElement = cards[y].querySelector('.card-img-top');
                        imgElement.src = data.url;
                        //-----------Agregando Titulo-----------
                        var cardBody = document.querySelectorAll('.card-body');
                        var title = cardBody[y].querySelector('.card-title');
                        title.textContent = data.nombre;
                        //-----------Agregando Precio-----------
                        var precio = cardBody[y].querySelector('.card-text');
                        precio.textContent = "$" + data.precio;
                        y++;
                    }
                }).catch((error) => {
                    console.error('Error al obtener datos del subnodo ' + x + ' :, ' + error);
                });
            }
        } else {
            console.log("El nodo 'Productos' no contiene datos.");
        }
    }).catch((error) => {
        console.error("Error al obtener datos de 'Productos':", error);
    });
}

function articulos(cant) {
    const section = document.getElementById('cuerpo');
   
    article = document.createElement('article');
  
    article.classList.add('d-flex', 'mb-3');
 
    
    if(cant <= 0.4){
        cards(section,article);
    }
    else if(cant >=0.5 && cant <=0.7){
        for(let x=0;x<2;x++){
            cards(section,article);
        }
    }
    else{
        for(let x=0;x<3;x++){
            cards(section,article);
        }
    }
}

function cards(section) {


    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    const img = document.createElement('img');
    const h5 = document.createElement('h5');
    const h4 = document.createElement('h4');

    div1.classList.add('d-flex', 'justify-content-center', 'text-center');
    div2.classList.add('card', 'text-bg-dark', 'mb-3', 'ms-3', 'me-3', 'p-1');

    img.classList.add('card-img-top', 'rounded-5', 'img-fluid');
    img.style.width = '380px';
    div3.classList.add('card-body');
    h5.classList.add('card-title');
    h4.classList.add('card-text');

    section.appendChild(article);
    article.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(h5);
    div3.appendChild(h4);

    
   
    flexVentana();


  
    
}


function flexVentana() {
    if(window.innerWidth <=991){
        article.classList.add('flex-column');
        article.classList.remove('flex-row');
    } else {
        article.classList.remove('flex-column');
        article.classList.add('flex-row');
    }
}
window.addEventListener('load', flexVentana);
window.addEventListener('resize', flexVentana);
window.addEventListener('load', () => {
    cards(); 
    flexVentana();
});



