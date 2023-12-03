<template>
  <div class="px-6 lg:px-36 py-10 h-full bg-gray-800 relative text-white">
      <h1 class="text-2xl text-center font-medium  pb-6">Lista de regalos familia  </h1>
      <h2 class="text-xl font-medium pb-4">Reglas:</h2>
      <ol class="text-lg flex flex-col gap-y-[10px] leading-5" >
        <li>Los regalos tienen un precio base de 10 soles(sujeto a cariño y voluntad de quien regala).</li>
        <li>Llenar la lista con las pretenciones de regalos  que desea recibir.</li>
        <li>Puede editar esta lista hasta una fecha limite la cual sera comunicada en el grupo de wsp.</li>
        <li>Solo editar su lista nunca la de otro participante.</li>
      </ol>

      <div class=" flex flex-col gap-y-4 items-start mt-8 ">  
        <label class=" text-xl font-medium" for="">Añadir nombre y sugerencia</label>
             <div class="flex flex-col relative  w-auto  lg:w-auto text-black " >
                  <div class="flex  flex-col items-start gap-x-2">
                    <input v-model="nombremodel"   class=" w-72 mb-4 lg:w-auto h-10  border-2 pl-2 text-sm placeholder:text-sm  border-secundary rounded-md focus-visible:outline-none"  
                    :class="{ 'border-b-2 border-red-600': v$.nombremodel.$error }" 
                    type="text" placeholder="Nombre" >
                    <span class="flex flex-row">
                      <input v-model="present"  @keyup.enter="addItemLista" class="relative w-72   lg:w-auto h-10  border-2 pl-2 text-sm placeholder:text-sm  border-secundary rounded-md focus-visible:outline-none"  
                      
                      type="text" placeholder="Escriba su sugerencia" >
                      <PlusCircleIcon class="h-8 w-8 text-red-500 absolute  -right-8 bottom-1 " @click="addItemLista" />
                    </span>
                  </div>
              </div>
              <ol v-if="regaloST.groupregalos.length != 0" >
                  <li v-for="item in regaloST.groupregalos" class="flex flex-row items-center mb-2 gap-x-4 w-56 justify-between" >
                      {{ item }} 
                      <!-- <img src="../assets/nodoicons/deleteSimbol.svg" @click="regaloST.filtergroupregalos(looseIndexOf(regaloST.groupregalos, item))" class="h-4cursor-pointer " alt="" srcset=""> -->
                        <XMarkIcon class="h-6 w-6 text-red-500" @click="regaloST.filtergroupregalos(looseIndexOf(regaloST.groupregalos, item))"  alt="" srcset="" />
                    </li>
              </ol> 
              <button  @click="save" :class="regaloST.groupregalos.length==0?'w-44 rounded-lg text-sm bg-slate-700 h-10':' w-44 rounded-lg text-sm bg-green-700 h-10'" >Agregar participante</button>  
      </div>          

      <div class=" flex flex-col gap-y-4 items-start mt-8 ">  
               <label class=" text-xl font-medium" for="">Lista de participantes:</label>
               <div class="grid grid-cols-1 xl:grid-cols-3  place-content-between gap-y-6 gap-x-10 " >
                    <div v-for="item in regaloST.listafirebase" class="flex flex-row items-center justify-between gap-x-2 max-w-3xl" >
                      <div>
                        <div class="text-2xl">
                          <label>Nombre: </label>
                          <label >{{ item.data.nombre }}</label>
                        </div>
                        <ol class="text-white text-lg">
                          <li class="flex flex-row " v-for="itm in item.data.sugerencias">
                              - {{ itm }}
                            </li>
                          </ol>
                        </div>
                        <div>
                          <button class="bg-gray-500 px-4 text-md rounded-lg">
                            <PencilSquareIcon class="h-8 w-8 text-yellow-500" @click="getDataItm(item)" ></PencilSquareIcon>
                          </button>
                        </div>
                     </div>
               </div>

               <div v-if="showed" class="w-[100vw] h-[100vh]  bg-gray-900 flex justify-center items-center fixed left-0 top-0 z-50 ">
                
                <div class="grid grid-cols-1 xl:grid-cols-3  place-content-between gap-y-6 gap-x-10 h-[50%] overflow-auto touch-pan-y  " >
                  <XCircleIcon class="h-10 w-10 text-red-500 absolute top-6 right-6" @click="closeModal"></XCircleIcon>
                      <div v-for="item in regaloST.itemfirebase" class="flex flex-row items-center justify-between gap-x-2 max-w-3xl " >
                        <div>
                          <div class="text-2xl">
                            <label>Nombre: </label>
                            <label >{{ item.data.nombre }}</label>
                          </div>
                          <ol class="text-white text-lg">
                            <li class="flex flex-row items-center max-w-64 mt-4 justify-between " v-for="itm in regaloST.itemauxiliar">
                                - {{ itm }}
                                <XMarkIcon class="h-6 w-6 text-red-500" @click="regaloST.filteritemaux(looseIndexOf(regaloST.itemauxiliar, itm))"   alt="" srcset="" />
                              </li>
                            </ol>
                          </div>
                         
                       </div>

                       <span class="flex flex-row items-center gap-x-4 text-black">
                        <input v-model="presentaux" @keyup.enter="addItemListaAux"   class=" w-56  lg:w-64 h-10  border-2 pl-2 text-sm placeholder:text-sm  border-secundary rounded-md focus-visible:outline-none"  
                        type="text" placeholder="Escriba su sugerencia" >
                        <PlusCircleIcon class="h-8 w-8 text-red-500 "  @click="addItemListaAux"  />
                      </span>
                      <button class="bg-green-200 w-44 h-10 justify-center items-center text-black" @click="ActualizarLista(regaloST.itemfirebase[0].id)"  >Guardar cambios</button>

                    </div>
                  
               </div>
      </div>

      
  </div>


</template>



<script setup>
import { ref,onMounted,computed} from 'vue';
import {useRegalosStore} from '../stores/regalos'
import { XCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid"
import { PlusCircleIcon } from "@heroicons/vue/24/solid"
import { PencilSquareIcon } from "@heroicons/vue/24/solid"
import { looseIndexOf } from '@vue/shared';
import { editListaxId, guardarRegalo,ismatchName } from '../firebase/index'
import { getAllRegalos } from '../firebase/index';
import { toast } from 'vue3-toastify';
import { helpers, required, email, minLength, } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'





const present = ref('')
const nombremodel = ref('')
const regaloST = useRegalosStore()

const allregalos=ref()

const presentaux=ref('')


onMounted(async() => {
  await getAllRegalos()
})



const rules = computed(() => ({
  nombremodel: {
    required: helpers.withMessage("Este campo es requerido", required)
  }
}));

const v$ = useVuelidate(rules, {
  present,nombremodel
})


const addItemLista=() => {
  if(present.value!=''){
    regaloST.setgroupregalos(present.value)
    present.value=''
  }else{
    toast("Ingrese algo antes de guardar", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

const addItemListaAux = () => {
  if (presentaux.value != '') {
    regaloST.setitemaux(presentaux.value)
    presentaux.value = ''
  } else {
    toast("Ingrese algo antes de guardar", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    });
  }
}


const ActualizarLista=(id) => {
    editListaxId(id,{nombre:regaloST.itemfirebase[0].data.nombre,sugerencias:regaloST.itemauxiliar})
    regaloST.clearlista()
    getAllRegalos()
    closeModal()
    toast.success("Lista actualizada!", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    });
}

const save=() => {
  v$.value.$touch();
  if (!v$.value.$invalid && regaloST.groupregalos.length!=0) {
     //evaluar si existe un documento con el mismo nombre de
     ismatchName(nombremodel.value).then((res)=>{
        if(res){
          toast.warning(`Existe un registro con el nombre ${nombremodel.value}`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
          });
        }else{
          console.log('registrar  nuevo doc con nuevo nonmbre');
            guardarRegalo(nombremodel.value, regaloST.groupregalos)
            nombremodel.value = ''
            regaloST.cleargroupregaloss()
            regaloST.clearlista()
            getAllRegalos()
            toast.success(`Nuevo integrante agregado, puedes seguir editando tu lista`, {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER,
            });
        }
     })

  }else{
    toast.error("Antes, debes completar todos los campos o agregar alguna sugerencia", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    });
  }
       
}

const showed=ref(false)
const showModal=() => {
  showed.value=!showed.value
}

const listademo=ref([{nombre:'Demo',sugerencias:['nuevo','Sugerencia2']}])


const getDataItm=(variable) => {
  regaloST.setitem(variable)
  regaloST.setitemaux(variable.data.sugerencias)
  showModal()
  console.log(variable);
}
const closeModal=() => {
    showModal()
    regaloST.clearitem()
    regaloST.clearitemaux()
}

</script>