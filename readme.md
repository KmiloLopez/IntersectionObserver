# IntersectionObserver

`IntersectionObserver` es una API de JavaScript que proporciona una forma eficiente de observar y reaccionar a los cambios en la intersección de un elemento con su contenedor o con la ventana de visualización del dispositivo. Esta API es útil para implementar funcionalidades como lazy loading de imágenes, infinitive scrolling, o animaciones basadas en el scroll.

## Creación de un IntersectionObserver

Para crear un `IntersectionObserver`, necesitas definir una función de callback que se ejecutará cada vez que uno de los elementos observados cambie su estado de intersección. También puedes pasar un objeto de opciones para personalizar el comportamiento del observador.

### Ejemplo Básico

```javascript
// Definir la función de callback
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Elemento está en la vista");
    } else {
      console.log("Elemento salió de la vista");
    }
  });
};

// Crear una instancia de IntersectionObserver
const observer = new IntersectionObserver(callback);

// Seleccionar el elemento a observar
const target = document.querySelector(".target-element");

// Comenzar a observar el elemento
observer.observe(target);
```
