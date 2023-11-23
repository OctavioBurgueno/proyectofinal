import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { auth } from './app.js';
import { storage } from './app.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';

const loginButton = document.querySelector('#uploadButton');
const errorMessage = document.getElementById('error-message');

const fileInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const imageUrl = document.getElementById('url');
const uploadButton = document.getElementById('btnInsertar');
const imagen = document.getElementById('imagen');

fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        imageUrl.value = e.target.result;
        uploadButton.style.display = 'block';
  
        imagePreview.style.width = '200px';
        imagePreview.style.height = '150px';
      };
  
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '';
      imagePreview.style.display = 'none';
      imageUrl.value = '';
      uploadButton.style.display = 'none';
    }
  });

// Inicializa Firebase Auth y Firebase Storage
fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
      imageUrl.value = e.target.result;
      uploadButton.style.display = 'block';
    };

    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    imageUrl.value = '';
    uploadButton.style.display = 'none';
  }
});

const successMessage = document.getElementById('successMessage');

uploadButton.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (file) {
    try {
      const storageRef = ref(storage, 'img/' + file.name);
      await uploadBytes(storageRef, file);

      alert('Imagen subida con éxito a Firebase Storage.');
     
      
      const downloadURL = await getDownloadURL(storageRef);
      alert('URL de descarga: ' + downloadURL);

   

    } catch (error) {
      console.error('Error al cargar la imagen: ' + error.message);
      alert('Error al cargar la imagen. Por favor, inténtalo de nuevo.');
    }
  } else {
    console.error('No se seleccionó ningún archivo');
    alert('Por favor, selecciona un archivo antes de cargarlo.');
  }
});