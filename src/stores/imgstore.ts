import { defineStore } from "pinia";
import { ref } from "vue";
import {useStorage} from "@vueuse/core";
import { looseIndexOf } from '@vue/shared';

interface Iimages{
   imagenes:string
}

interface IProduct{
  nombre:string,
  marca:string,
  codigo:string
  medida:string,
  imagenes:Iimages[],
  oferta:boolean,
}

interface IEdProduct{
id:string,
data:IProduct
}



export const useImageStore=defineStore("images-store",() => {  
  
  
  const images = ref<string[]>(loadImagesFromLocalStorage());
  function setimages(data: any) {
       images.value = images.value.concat(data);
       saveImagesToLocalStorage()
   }
   function filterimages(data: number) {
    const newArr= images.value.filter(u=>looseIndexOf(images.value,u)!=data)
    images.value=newArr
   }
   function deletebycontent(data: any) { // data puede ser cualquier contenido pero en este caso usaremos urls 
    const newArr= images.value.filter(u=>u!=data)
    images.value=newArr
    saveImagesToLocalStorage()
   }
   function updateAllimages(data:any){
    images.value=data
    saveImagesToLocalStorage()
   }
   function clearimagess() {
   images.value =[]
   saveImagesToLocalStorage()
   }
     // Función para cargar imágenes desde localStorage
  function loadImagesFromLocalStorage(): string[] {
    const storedImages = localStorage.getItem('images-amigosecreto');
    return storedImages ? JSON.parse(storedImages) : [];
  }

  // Función para sincronizar imágenes en localStorage
  function saveImagesToLocalStorage() {
    localStorage.setItem('images-amigosecreto', JSON.stringify(images.value));
  }


  return {


    images,
    setimages,
    updateAllimages,
    clearimagess,
    deletebycontent,

}

})