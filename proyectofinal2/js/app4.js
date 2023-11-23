import { ref, get, set, getDatabase, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { app } from './app.js';

const btnInsertar = document.getElementById('btnInsertar');
const btnBuscar = document.getElementById('btnBuscar');
const btnActualizar = document.getElementById('btnActualizar');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnDeshabilitar = document.getElementById('btnDeshabilitar');
const imagePreview = document.getElementById('imagePreview');
let CodigoProd, NombreProd, PrecioProd, StatusProd, UrlProd;

btnInsertar.addEventListener('click', () => {
    existe();

});

btnBuscar.addEventListener('click', () => {
    buscar();
});

btnActualizar.addEventListener('click', () => {
    actualizarDatos();
});

btnDeshabilitar.addEventListener('click', () => {
    deshabilitar();
});

btnLimpiar.addEventListener('click', () => {
    limpiarInputs();
});

function limpiarInputs() {
    document.getElementById('codigo').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('status').value = "";
    document.getElementById('url').value = "";
}

function llenarInputs(producto) {
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('status').value = producto.status;
    document.getElementById('url').value = producto.url;
    imagePreview.src = producto.url;
}

function leerInputs() {
    let CodigoProd = document.getElementById('codigo').value;
    let NombreProd = document.getElementById('nombre').value;
    let PrecioProd = document.getElementById('precio').value;
    let StatusProd = document.getElementById('status').value;
    let UrlProd = document.getElementById('url').value;
    return {
        CodigoProd,
        NombreProd,
        PrecioProd,
        StatusProd,
        UrlProd
    };

}

function mostrarProductos() {
    const db = getDatabase();
    const dbRef = ref(db, 'Productos');
    onValue(dbRef, (snapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        lista.innerHTML = "<section class='servicio>" + lista.innerHTML + " " + childKey + " "
            + childData.CodigoProdProd + " " + childData.NombreProd + " " + childData.PrecioProd + " " + childData.StatusProd + " "
            + childData.UrlProd + " " + "</section>";
    });
}

async function insertarDatos() {
    var inputs = leerInputs();
    var id = await idInsertar();
    const db = getDatabase();
    set(ref(db, 'Productos/' + id), {
        codigo: inputs.CodigoProd,
        nombre: inputs.NombreProd,
        precio: inputs.PrecioProd,
        status: inputs.StatusProd,
        url: inputs.UrlProd
    }).then((resp) => {
        alert('Se realizo el Registro');
        limpiarInputs();
    }).catch((error) => {
        alert('Error' + " " + error);
    })
}

async function buscar(act){
    if(valiEmptyCode()){
        alert('Porfavor Ingrese un codigo para buscar');
    }
    else{
        const db = getDatabase(app);
        const dbref = ref(db, 'Productos');
        var read = leerInputs();
        var exist = false;
        var idcount=0;

        return new Promise((resolve, reject) => {
            get(dbref).then((snapshot) => {
                if (snapshot.exists()) {
                    const productosData = snapshot.val();
                    if (productosData !== null) {
                        Object.values(productosData).forEach(producto => {
                            if (producto.codigo === read.CodigoProd) {
                                exist = true;
                                if(act == true){
                                    act = false;
                                    resolve(idcount);
                                }
                            }
                            
                            idcount++;
                        });
                        if (exist === true) {
                            Object.values(productosData).forEach(producto => {
                                if (producto.codigo === read.CodigoProd) {
                                    llenarInputs(producto); 
            
                                }
                            });
                            exist = false;
                        }
                        else {
                            alert('Ese codigo no existe');
                        }
                    }
                }
        
            }).catch((error) => {
                alert('Error ' + error);
            });
        });
    }
    
    
}

function idInsertar() {
    const db = getDatabase(app);
    const productosRef = ref(db, 'Productos');
    let cantidad = 0;
    return obtenerCantidadProductos(cantidad);
    async function obtenerCantidadProductos(cantidad) {
        const snapshot = await get(productosRef);
        if (snapshot.exists()) {
            const productosData = snapshot.val();
            if (productosData !== null) {
                cantidad = (Object.keys(productosData).length);
            }
        }
        return cantidad;
    }
}

async function actualizarDatos() {
    const db = getDatabase(app);
    var read = leerInputs();
    if (valiEmpty()) {
        alert('No deje espacios vacios');
    }
    else {
        var act = true;
        var id = await buscar(act);
        update(ref(db, 'Productos/'+id), {
            codigo: read.CodigoProd,
            nombre: read.NombreProd,
            precio: read.PrecioProd,
            status: read.StatusProd,
            url: read.UrlProd
        }).then(resp => {
            alert('Se realizo la actualizacion con exito');
            limpiarInputs();
        }).catch((error) => {
            alert('Error ' + error);
        })
    }
}

async function deshabilitar() {
    const db = getDatabase(app);
    var read = leerInputs();
    read.StatusProd = 1;
    if (valiEmpty()) {
        alert('No deje espacios vacios');
    }
    else {
        var act = true;
        var id = await buscar(act);
        update(ref(db, 'Productos/'+id), {
            codigo: read.CodigoProd,
            nombre: read.NombreProd,
            precio: read.PrecioProd,
            status: read.StatusProd,
            url: read.UrlProd
        }).then(resp => {
            alert('Se realizo la actualizacion con exito');
            limpiarInputs();
        }).catch((error) => {
            alert('Error ' + error);
        })
    }
}

function existe() {
    
    const db = getDatabase(app);
    var read = leerInputs();
    var exist = false;
    if (valiEmpty()) {
        alert('No deje espacios vacios');
    }
    else {
        const dbref = ref(db, 'Productos');
        get(dbref).then((snapshot) => {
            if (snapshot.exists()) {
                const productosData = snapshot.val();
                if (productosData !== null) {
                    // Verificar si algún producto tiene el código que estás buscando

                    // Iterar sobre los productos
                    Object.values(productosData).forEach(producto => {
                        if (producto.codigo === read.CodigoProd) {
                            exist = true;

                        }
                    });
                    if (exist === true) {
                        
                        buscar(productosData);
                        exist = false;
                    }
                    else {
                        
                        insertarDatos();
                    }
                }
                
            }
            else {       
                insertarDatos();
            }

        }).catch((error) => {
            alert('Error ' + error);
        });
    }
}

function valiEmpty() {
    var read = leerInputs();
    if (read.CodigoProd == "" || read.NombreProd == "" || read.PrecioProd == "" || read.StatusProd == "" ) {
        return true;
    }
    else if(read.UrlProd == ""){
        alert('no olvide seleccionar una imagen');
        return false;
    }
    else {
        return false;
    }
}

function valiEmptyCode() {
    var read = leerInputs();
    if (read.CodigoProd == "") {
        return true;
    }
    else {
        return false;
    }
}


