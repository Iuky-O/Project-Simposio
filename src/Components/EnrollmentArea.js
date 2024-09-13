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
                <text> Inscrições abertas até o dia 25/10, não perca a oportunidade de participar do maior evento da américa do sul.  </text>
            </div>
            <div className='title1'>
               I Simpósio Regional de Engenharia de Software
            </div>
            <button className="inscricao-btn">
                <a className='link' href="https://forms.gle/oW43Tdii6kwG7VNu5" target="_blank"> Inscreva-se</a> 
            </button>
            <div className='card-end'>
                <div className='card-item'>
                    <text className='card-number'>10
                        <p className='card-text'> palestrantes</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'>10
                        <p className='card-text'> palestras</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'> 6
                        <p className='card-text'>Cursos</p>
                    </text>
                </div>
                <div className='card-item'>
                    <text className='card-number'>5
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
