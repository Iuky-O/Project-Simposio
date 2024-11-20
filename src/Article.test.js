import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Article from './Components/Article';
import { useAuth } from "./Scripts/AuthContext";

jest.mock('./Scripts/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Article Component', () => {
  const setup = () => {
    useAuth.mockReturnValue({
      user: { uid: '123', email: 'test@example.com' },
      loading: false,
    });
      return render(
          <Router>
              <Article />
          </Router>
      );
  };

 
  it('Verifica se adiciona autores corretamente', () => {
    setup();
      const authorInput = screen.getByPlaceholderText(/Digite o nome dos autores e clique em adicionar./i);

      const addButton = screen.getByText(/Adicionar Autor/i);
    
      fireEvent.change(authorInput, { target: { value: 'John Doe' } });
      fireEvent.click(addButton);
    
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
 
    it('Deve mostrar erro se o formulário for enviado vazio', () => {

      setup();

      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      fireEvent.submit(screen.getByRole('button', { name: /Submeter/i }));
      expect(alertMock).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios!');
      alertMock.mockRestore();
    });

    it("valida o formulário ao submeter", () => {
      setup();

      const submitButton = screen.getByText(/Submeter/i);
      fireEvent.click(submitButton);

      expect(screen.getByPlaceholderText(/Adicione o Título do artigo/i)).toHaveClass("error");
      expect(screen.getByPlaceholderText(/Digite o nome dos autores/i)).toHaveClass("error");
      expect(screen.getByPlaceholderText(/Adicione o Resumo/i)).toHaveClass("error");
  });


    it('Aceita apenas arquivos PDF', () => {
      setup();
    
      const fileInput = screen.getByLabelText(/Upload/i);
    
      const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
      fireEvent.change(fileInput, { target: { files: [file] } });
    
      expect(fileInput.files[0].name).toBe('example.pdf');
    });
 
});

