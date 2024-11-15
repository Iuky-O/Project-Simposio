import { FirebaseDataProvider } from 'react-admin-firebase';

const config = {
  apiKey: "AIzaSyCpoD20CDvD9li8Ky_ULRRfXbotqg33CQo",
  authDomain: "simposio-df298.firebaseapp.com",
  databaseURL: "https://simposio-df298.firebaseio.com",
  projectId: "simposio-df298",
  storageBucket: "simposio-df298.appspot.com",
  messagingSenderId: "518927230386",
  appId: "1:518927230386:web:6febb33ebb93c277f970ab",
};

const options = {
  logging: true,  // Log para depuração
  persistence: 'session',  // Persistência da autenticação
  softDelete: true,  // Deleção suave (não exclui permanentemente)
  renameMetaFields: {
    created_at: 'my_created_at',
    created_by: 'my_created_by',
    updated_at: 'my_updated_at',
    updated_by: 'my_updated_by',
  },
  lazyLoading: { enabled: false },  // Desabilitando carregamento preguiçoso
  transformToDb: (resourceName, documentData, documentId) => documentData,  // Não transforma dados antes de salvar
};

const dataProvider = FirebaseDataProvider(config, options);

export { dataProvider };
