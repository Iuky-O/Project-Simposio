import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
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
    expect(screen.getByPlaceholderText(/Password/i)).toHaveAttribute('type', 'text');
    fireEvent.click(eyeIcon);
    expect(screen.getByPlaceholderText(/Password/i)).toHaveAttribute('type', 'password');
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
