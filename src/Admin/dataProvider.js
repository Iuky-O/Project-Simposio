import { collection, query, getDocs, updateDoc, doc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';

const DataProvider = {
    getList: async (resource, params) => {
        const collectionRef = collection(db, resource);
        const q = query(collectionRef);
        
        try {
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,  
            ...doc.data(),
          }));
      
          console.log("Dados de users:", data);
      
          return {
            data,
            total: querySnapshot.size,
          };
        } catch (error) {
          console.error("Erro ao buscar users:", error);
          throw new Error("Erro ao buscar users");
        }
      },
      

  getOne: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        data: { id: docSnap.id, ...docSnap.data() },
      };
    }
    throw new Error("Documento não encontrado");
  },

  create: async (resource, params) => {
    const docRef = await addDoc(collection(db, resource), params.data);
    return {
      data: { ...params.data, id: docRef.id },
    };
  },

  update: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await updateDoc(docRef, params.data);
    return {
      data: { ...params.data, id: params.id },
    };
  },

  delete: async (resource, params) => {
    const docRef = doc(db, resource, params.id);
    await deleteDoc(docRef);
    return {
      data: { id: params.id },
    };
  },
};

export default DataProvider;
