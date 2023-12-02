import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import {useStorage} from "@vueuse/core";
import { looseIndexOf } from '@vue/shared';




export const useRegalosStore=defineStore("regalos-store",() => {

   const groupregalos = ref([] as Array<{}|null>);
   

   function setgroupregalos(data: any) {
        groupregalos.value = groupregalos.value.concat(data);
    }

    function filtergroupregalos(data: number) {
     const newArr= groupregalos.value.filter(u=>looseIndexOf(groupregalos.value,u)!=data)
     groupregalos.value=newArr
    }

    function cleargroupregaloss() {
    groupregalos.value =[]
    }


    const listafirebase = ref([] as Array<{}|null>);
    function llenarlista(data: any) {
        listafirebase.value = listafirebase.value.concat(data);
    }
    function clearlista() {
    listafirebase.value =[]
    }

    
    const itemfirebase = ref([] as Array<{}|null>);
    function llenaritem(data: any) {
        itemfirebase.value = itemfirebase.value.concat(data);
    }
    function setitem(data: any) {
        itemfirebase.value = itemfirebase.value.concat(data);
    }
    function clearitem() {
    itemfirebase.value =[]
    }

       const itemauxiliar = ref([] as Array<{}|null>);
        function llenaritemaux(data: any) {
            itemauxiliar.value = itemauxiliar.value.concat(data);
        }
        function setitemaux(data: any) {
            itemauxiliar.value = itemauxiliar.value.concat(data);
        }
        function filteritemaux(data: number) {
        const newArr= itemauxiliar.value.filter(u=>looseIndexOf(itemauxiliar.value,u)!=data)
        itemauxiliar.value=newArr
        }
        function clearitemaux() {
        itemauxiliar.value =[]
        }



   return{
      listafirebase,
      llenarlista,
      clearlista,
    groupregalos,
    setgroupregalos,
    filtergroupregalos,
    cleargroupregaloss,
        itemfirebase,
        llenaritem,
        setitem,
        clearitem,
    itemauxiliar,
    llenaritemaux,
    setitemaux,
    filteritemaux,
    clearitemaux


   }
  
})
