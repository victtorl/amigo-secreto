// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection,addDoc,setDoc,doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
///pinia
import { useRegalosStore } from "../stores/regalos";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwGu0nt3t5I_4wGCRL3NXaeOUytX-1ASU",
    authDomain: "peloterosfc-c496a.firebaseapp.com",
    databaseURL: "https://peloterosfc-c496a.firebaseio.com",
    projectId: "peloterosfc-c496a",
    storageBucket: "peloterosfc-c496a.appspot.com",
    messagingSenderId: "864437364837",
    appId: "1:864437364837:web:0f5636a079823f820d3e8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)



export {
    db, auth
}


export const getAllRegalos = async () => {

    const regaloST = useRegalosStore()

    const querySnapshot = await getDocs(collection(db, "lista-regalos"));
    querySnapshot.forEach((doc) => {
        regaloST.llenarlista({ id: doc.id, data: doc.data() })
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
    });
    return ligaST.listafirebase
}

//Guardar lista
export const guardarRegalo = async (nombre, sugerencias) => {
    try {
        const docRef = await addDoc(collection(db, 'lista-regalos'), {
            nombre: nombre,
            sugerencias: sugerencias,
            
        });

        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};




let idparam = 'lMjXCnX1vHqmnBPIwgO1'
// Obtener post por id
export const getListaxId = async (idparam) => {

    let datospost
    const querySnapshot = await getDocs(collection(db, "lista-regalos"));
    querySnapshot.forEach((doc) => {
        if (doc.id == idparam) {
            datospost = doc.data()
        }
    });
    return datospost
}


// Editar o agregar un campo si no esxiste por id
export const editListaxId = async (id,data) => {

    const postRef = doc(db, "lista-regalos", id);
    await setDoc(postRef, data);

    setDoc(postRef, data)
    .then(postRef => {
        console.log("Entire Document has been updated successfully");
    })
    .catch(error => {
        console.log(error);
    })

}