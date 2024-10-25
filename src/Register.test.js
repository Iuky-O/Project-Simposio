import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Components/Register';  
import { BrowserRouter as Router } from 'react-router-dom';

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

    it('deve mostrar erro ao tentar enviar o formulário sem preencher todos os passos', async () => {
        setup();
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        // Preencher os campos do primeiro passo
        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Número:'), { target: { value: '123456789' } });
        fireEvent.click(screen.getByText('Próximo'));
    
        // Preencher os campos do segundo passo
        fireEvent.change(screen.getByLabelText('País:'), { target: { value: 'Brasil' } });
        fireEvent.change(screen.getByLabelText('Estado:'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('Cidade:'), { target: { value: 'São Paulo' } });
        fireEvent.click(screen.getByText('Próximo'));
    
        // Preencher os campos do terceiro passo
        fireEvent.change(screen.getByLabelText('Tipo de Usuário:'), { target: { value: 'Aluno' } });
        fireEvent.change(screen.getByLabelText('Vínculo:'), { target: { value: 'Universidade' } });
        fireEvent.change(screen.getByLabelText('Escolaridade:'), { target: { value: 'Superior' } });
        fireEvent.click(screen.getByText('Próximo'));
        
        fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));
        expect(alertMock).toHaveBeenCalledWith('Todos os campos devem ser preenchidos!');
        alertMock.mockRestore();
    });
    
/*
    test('deve submeter o formulário corretamente quando todos os campos forem preenchidos', () => {
        setup();

        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Número:'), { target: { value: '123456789' } });
        fireEvent.click(screen.getByText('Próximo'));

        fireEvent.change(screen.getByLabelText('País:'), { target: { value: 'Brasil' } });
        fireEvent.change(screen.getByLabelText('Estado:'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('Cidade:'), { target: { value: 'São Paulo' } });
        fireEvent.click(screen.getByText('Próximo'));

        fireEvent.change(screen.getByLabelText('Tipo de Usuário:'), { target: { value: 'Aluno' } });
        fireEvent.change(screen.getByLabelText('Vínculo:'), { target: { value: 'Universidade' } });
        fireEvent.change(screen.getByLabelText('Escolaridade:'), { target: { value: 'Superior' } });
        fireEvent.click(screen.getByText('Próximo'));

        fireEvent.change(screen.getByLabelText('Sexo:'), { target: { value: 'Masculino' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Cadastrar'));
        expect(screen.queryByText('Cadastro realizado com sucesso!')).toBeInTheDocument();
    });*/
});
