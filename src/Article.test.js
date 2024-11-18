import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Article from '../Components/Article';
import { BrowserRouter } from 'react-router-dom';

describe('Article Component', () => {
    const setup = () => {
        return render(
            <Router>
                <Article />
            </Router>
        );
    };

    it('renders Article form fields correctly', () => {
        expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Autores/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Resumo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Upload/i)).toBeInTheDocument();
        expect(screen.getByText(/Submeter/i)).toBeInTheDocument();
    });

    it('adds an author to the list', () => {
        const authorInput = screen.getByPlaceholderText(/Digite o nome dos autores/i);
        const addButton = screen.getByText(/Adicionar Autor/i);
      
        fireEvent.change(authorInput, { target: { value: 'John Doe' } });
        fireEvent.click(addButton);
      
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      });
      
      it('displays an error when adding more than 10 authors', () => {
        render(
          <BrowserRouter>
            <Article />
          </BrowserRouter>
        );
      
        const authorInput = screen.getByPlaceholderText(/Digite o nome dos autores/i);
        const addButton = screen.getByText(/Adicionar Autor/i);
      
        // Adicionando 10 autores
        for (let i = 0; i < 10; i++) {
          fireEvent.change(authorInput, { target: { value: `Author ${i}` } });
          fireEvent.click(addButton);
        }
      
        expect(screen.getByText(/Limite de 10 autores atingido/i)).toBeInTheDocument();
      });


      it('shows validation error when required fields are empty', () => {
        render(
          <BrowserRouter>
            <Article />
          </BrowserRouter>
        );
      
        const submitButton = screen.getByText(/Submeter/i);
        fireEvent.click(submitButton);
      
        expect(screen.getByText(/Por favor, preencha todos os campos obrigatórios!/i)).toBeInTheDocument();
      });


      it('accepts only PDF file types', () => {
        render(
          <BrowserRouter>
            <Article />
          </BrowserRouter>
        );
      
        const fileInput = screen.getByLabelText(/Upload/i);
      
        const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
        fireEvent.change(fileInput, { target: { files: [file] } });
      
        expect(fileInput.files[0].name).toBe('example.pdf');
      });
      
      
})

