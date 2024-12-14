<template>

<label for="first_name" class="block mb-0  font-medium text-2xl text-white dark:text-white">Cargar imagenes</label>
<div class="flex items-center justify-center w-full">

    <label for="media" class="flex flex-col items-center justify-center w-full  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input
              type="file" class="hidden"
              id="media"
              accept="image/*"
              multiple
              @change="(event) => handelFileUpload(event)" 
        
        />
        
    </label>

</div> 

<label for="first_name" class="block mb-0  font-medium text-2xl text-white dark:text-white">Imagenes Referenciales cargadas:</label>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4  py-4 md:py-8  ">
          <div  v-for="(item,i) in imgST.images" class=" relative" 
          :key="index"  >
              <img :src="item" id="output"  class="h-auto w-full lg:h-auto  rounded-lg object-ver "  alt="">
              <p class="h-8 w-8 bg-red-500 rounded-full font-bold flex items-center justify-center absolute top-0 right-0 hover:bg-red-900 cursor-pointer" 
                  @click="removeItem(item)"    
              >X</p>
          </div>

  </div>


            
</template>


<script setup>
import { onMounted } from 'vue';
import { uploadImage,EliminarImagenPorUrl } from '../firebase';
import { useImageStore } from '../stores/imgstore.ts';
const imgST=useImageStore()



const generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)

const handelFileUpload = async (e) => {
    var files = e.target.files[0] 
    //SUBIR UNA IMAGEN Y PONERLO AL ARRAY DE IMAGENES -- CHANCAR O SETEAR EL CAMPO IMAFENES DE NEW PRODUCT
    imgST.setimages(await uploadImage(files,generateId()))
    // imgST.setnewProduct({ 'imagenes':imgST.images})  
};


const removeItem = async (url) => {
  EliminarImagenPorUrl(url) //eliminas de la web
  imgST.deletebycontent(url) //eliminas de local storage
//   imgST.setnewProduct({ 'imagenes':imgST.images}) //asociar al new product 
};



onMounted(() => {
//   imgST.setnewProduct({ 'imagenes':imgST.images}) 
})

</script>