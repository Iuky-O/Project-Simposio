/*import { salvarArtigoNoFirestore } from "../functions/firebaseFileHandler";
import formData from "../Components/Article"

// formUtils - para ARTIGO
export const handleChange = (e, formData, setFormData, errorFields, setErrorFields) => {
    const { name, value } = e.target;
    if (name === "resumo" && value.length > 1000) return;
    setFormData({ ...formData, [name]: value });
    setErrorFields({ ...errorFields, [name]: false });
};

export const handleAddAuthor = (authorInput, formData, setFormData, setAuthorInput) => {
    if (authorInput.trim() && formData.autores.length < 10) {
        setFormData({
            ...formData,
            autores: [...formData.autores, authorInput],
        });
        setAuthorInput("");
    }
};

export const handleRemoveAuthor = (index, formData, setFormData) => {
    const updatedAuthors = formData.autores.filter((_, i) => i !== index);
    setFormData({
        ...formData,
        autores: updatedAuthors
    });
};

export const handleFileUpload = (e, setFormData) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
            setFormData({ ...formData, arquivo: reader.result.split(",")[1] });
        };
        reader.readAsDataURL(file);
    }
};
*/

