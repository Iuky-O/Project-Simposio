import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import '../Styles/EnrollmentArea.css';

const EnrollmentArea = () => {
    return (
        <div className="container">
            <div className="text">
                <text> Incrições abertas até o dia 25/10, não perca a oportunidade de participar do maior evento da américa do sul.  </text>
            </div>
            <div className='title'>
                <h1>Simposio Regional de Engenharia de Software</h1>
            </div>
            <button className="inscricao-btn">
                Inscreva-se
            </button>
            <div className='card-end'>
                <div className='card-item'>
                    <text className='card-number'>5
                        <p className='card-text'> palestrantes</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'> 10
                        <p className='card-text'>Cursos</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'>2
                        <p className='card-text'>dias</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'>4
                        <p className='card-text'>locais</p>
                    </text>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentArea;
