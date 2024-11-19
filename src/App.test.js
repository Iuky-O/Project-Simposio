import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Article from './Components/Article'
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

describe('Login Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ login: mockLogin });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it('Deve renderizar o componente de login corretamente', () => {
    expect(screen.getByText(/Seja Bem-Vindo/i)).toBeInTheDocument();
  });

  it('Deve mostrar erro se o formulário for enviado vazio', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.submit(screen.getByRole('button', { name: /Login/i }));
    expect(alertMock).toHaveBeenCalledWith('Todos os campos devem ser preenchidos!');
    alertMock.mockRestore();
  });

  it('Deve permitir mostrar e ocultar a senha', () => {
    const eyeIcon = screen.getByTestId('toggle-password-visibility');
    fireEvent.click(eyeIcon);
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'text');
    fireEvent.click(eyeIcon);
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
  });

  it('Deve exibir erro ao realizar login com credenciais inválidas', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Erro ao efetuar login! Email ou Senha está errado!'));
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'email@invalido.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'senhaerrada' } });
    fireEvent.submit(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erro ao efetuar login! Email ou Senha está errado!/i)).toBeInTheDocument();
    });
  });

  it('Deve redirecionar para a página home após login bem-sucedido', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'usuario@valido.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'senhaValida' } });
    fireEvent.submit(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});



describe('Register Component', () => {
  const setup = () => {
      return render(
          <Router>
              <Register />
          </Router>
      );
  };

  it('deve renderizar o primeiro passo com campos obrigatórios', () => {
      setup();

      expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
      expect(screen.getByLabelText('Sobrenome:')).toBeInTheDocument();
      expect(screen.getByLabelText('Email:')).toBeInTheDocument();
      expect(screen.getByLabelText('Número:')).toBeInTheDocument();
  });

  it('deve navegar para o segundo passo ao clicar em "Próximo" com campos válidos', () => {
      setup();

      fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Número:'), { target: { value: '123456789' } });

      fireEvent.click(screen.getByText('Próximo'));

      expect(screen.getByLabelText('País:')).toBeInTheDocument();
      expect(screen.getByLabelText('Estado:')).toBeInTheDocument();
      expect(screen.getByLabelText('Cidade:')).toBeInTheDocument();
  });

  it('deve mostrar erro ao tentar ir para o próximo passo com campos obrigatórios vazios', () => {
      setup();

      fireEvent.click(screen.getByText('Próximo'));

      expect(screen.getByLabelText('Nome:')).toHaveClass('error');
      expect(screen.getByLabelText('Sobrenome:')).toHaveClass('error');
      expect(screen.getByLabelText('Email:')).toHaveClass('error');
      expect(screen.getByLabelText('Número:')).toHaveClass('error');
  });

  it('deve navegar de volta para o primeiro passo ao clicar em "Anterior"', () => {
      setup();

      fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Número:'), { target: { value: '123456789' } });
      fireEvent.click(screen.getByText('Próximo'));

      fireEvent.click(screen.getByText('Voltar'));

      expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
  });

  it('deve validar os campos obrigatórios do segundo passo', () => {
      setup();

      fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Número:'), { target: { value: '123456789' } });
      fireEvent.click(screen.getByText('Próximo'));

      fireEvent.click(screen.getByText('Próximo'));

      expect(screen.getByLabelText('País:')).toHaveClass('error');
      expect(screen.getByLabelText('Estado:')).toHaveClass('error');
      expect(screen.getByLabelText('Cidade:')).toHaveClass('error');
  });
});

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
