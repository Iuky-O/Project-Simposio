import { db } from '../Firebase/firebaseConfig';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

// Salvar artigo no Firestore
export async function salvarArtigoNoFirestore(articleData) {
    try {
        await addDoc(collection(db, "artigos"), articleData);
        console.log('Artigo salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar artigo:', error);
        throw error;
    }
}

// Salvar arquivo em base64 no Firestore
export async function salvarArquivoBase64(base64String, fileName) {
    try {
        await addDoc(collection(db, "arquivos"), {
            nome: fileName,
            arquivo: base64String,
            dataUpload: new Date(),
        });
        console.log('Arquivo salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar arquivo:', error);
        throw error;
    }
}

// Baixar arquivo do Firestore
export async function baixarArquivo(id) {
    try {
        const docRef = doc(db, "arquivos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const blob = base64ToBlob(data.arquivo, 'application/pdf');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = data.nome;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            throw new Error('Arquivo não encontrado!');
        }
    } catch (error) {
        console.error('Erro ao baixar arquivo:', error);
        throw error;
    }
}

export async function baixarArquivoDoArtigo(articleId) {
    try {
        const docRef = doc(db, "artigos", articleId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const articleData = docSnap.data();
            
            // Verifica se existe um arquivo associado ao artigo
            if (articleData.arquivo && articleData.arquivo.arquivo) {
                const base64String = articleData.arquivo.arquivo; // String base64
                const fileName = articleData.arquivo.nome; // Nome do arquivo
                const mimeType = 'application/pdf'; // Tipo MIME, você pode alterar se for outro tipo de arquivo
                
                // Converte o base64 em Blob
                const blob = base64ToBlob(base64String, mimeType);
                
                // Cria um link de download e inicia o download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName; // Nome do arquivo
                link.click();
                
                // Revoga o link depois de usar
                URL.revokeObjectURL(url);
                console.log('Arquivo baixado com sucesso!');
            } else {
                throw new Error('Este artigo não contém um arquivo associado!');
            }
        } else {
            throw new Error('Artigo não encontrado!');
        }
    } catch (error) {
        console.error('Erro ao baixar arquivo do artigo:', error);
        throw error;
    }
}

// Converter base64 para Blob
function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}
