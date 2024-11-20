
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SubmitTimeline from '../src/Components/SubmiteTimelineArea';
import { db } from '../src/Firebase/firebaseConfig';
import { setDoc } from 'firebase/firestore';

/*
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));*/


import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
useNavigate.mockImplementation(() => mockNavigate);


describe('SubmitTimeline Component', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <SubmitTimeline />
      </BrowserRouter>
    );
  };

  it('deve renderizar o formulário corretamente', () => {
    setup();
    expect(screen.getByText(/Editar Cronograma/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dia:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dia da semana:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data:/i)).toBeInTheDocument();
    expect(screen.getByText(/Programação do dia/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Atividade/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar Cronograma/i)).toBeInTheDocument();
  });

  it('deve adicionar uma nova atividade ao clicar em "Adicionar Atividade"', () => {
    setup();
    fireEvent.click(screen.getByText(/Adicionar Atividade/i));
    expect(screen.getAllByLabelText(/Tipo:/i).length).toBe(1);
    fireEvent.click(screen.getByText(/Adicionar Atividade/i));
    expect(screen.getAllByLabelText(/Tipo:/i).length).toBe(2);
  });

  it('deve atualizar os valores dos campos de atividade', () => {
    setup();
    fireEvent.click(screen.getByText(/Adicionar Atividade/i));
    const tipoInput = screen.getByLabelText(/Tipo:/i);
    fireEvent.change(tipoInput, { target: { value: 'palestra' } });
    expect(tipoInput.value).toBe('palestra');
  });

  it('Deve exibir erro ao tentar enviar formulário com campos obrigatórios vazios', () => {

    setup();

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.submit(screen.getByRole('button', { name: /Salvar Cronograma/i }));
    expect(alertMock).toHaveBeenCalledWith('Erro ao atualizar o cronograma.');
    alertMock.mockRestore();
  });

});

