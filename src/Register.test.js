import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Components/Register';

jest.mock('./Scripts/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register Component', () => {
  const setup = () => render(
    <Router>
      <Register />
    </Router>
  );

  it('deve renderizar o primeiro passo com campos obrigatórios', () => {
    setup();

    expect(screen.getByTestId('nome-input')).toBeInTheDocument();
    expect(screen.getByTestId('sobrenome-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('numero-input')).toBeInTheDocument();
  });

  it('deve navegar para o segundo passo ao clicar em "Próximo" com campos válidos', () => {
    setup();

    fireEvent.change(screen.getByTestId('nome-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('sobrenome-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('numero-input'), { target: { value: '123456789' } });

    fireEvent.click(screen.getByText(/Próximo/i));

    expect(screen.getByTestId('pais-input')).toBeInTheDocument();
    expect(screen.getByTestId('estado-input')).toBeInTheDocument();
    expect(screen.getByTestId('cidade-input')).toBeInTheDocument();
  });

  it('deve mostrar erro ao tentar ir para o próximo passo com campos obrigatórios vazios', () => {
    setup();

    fireEvent.click(screen.getByText(/Próximo/i));

    expect(screen.getByTestId('nome-input')).toHaveClass('error');
    expect(screen.getByTestId('sobrenome-input')).toHaveClass('error');
    expect(screen.getByTestId('email-input')).toHaveClass('error');
    expect(screen.getByTestId('numero-input')).toHaveClass('error');
  });

  it('deve navegar de volta para o primeiro passo ao clicar em "Voltar"', () => {
    setup();

    fireEvent.change(screen.getByTestId('nome-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('sobrenome-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('numero-input'), { target: { value: '123456789' } });
    fireEvent.click(screen.getByText(/Próximo/i));

    fireEvent.click(screen.getByText(/Voltar/i));

    expect(screen.getByTestId('nome-input')).toBeInTheDocument();
  });

  it('deve validar os campos obrigatórios do segundo passo', () => {
    setup();

    fireEvent.change(screen.getByTestId('nome-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('sobrenome-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('numero-input'), { target: { value: '123456789' } });
    fireEvent.click(screen.getByText(/Próximo/i));

    fireEvent.click(screen.getByText(/Próximo/i));

    expect(screen.getByTestId('pais-input')).toHaveClass('error');
    expect(screen.getByTestId('estado-input')).toHaveClass('error');
    expect(screen.getByTestId('cidade-input')).toHaveClass('error');
  });
});
