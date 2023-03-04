import React, { useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import './Result.css';
import { getResult } from '../../api/testApi';

const Result = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let [result, setResult] = React.useState({});
    let res_id = searchParams.get('result_id');
    useEffect(() => {
        async function getResults() {
            const results = await getResult(res_id);
            setResult(results);
        }
        getResults();
    }, []); 

    const handleStartAgain = () => {
        window.location.href = '/ihru/test';
    };

    const handleBack = () => {
        window.location.href = '/ihru';
    };

    return (
        <Container className='ResultContainer p-5'>
            <p className='ResultLabel'>Ваш результат: </p>
            <Container className='ResultTable rounded mt-5'>
                <table>
                    <tr>
                        <th>Индекс хронического утомления</th>
                        <td>{result.distress}</td>
                        <td>{Math.round(result.distress / 72 * 100)}%</td>
                    </tr>
                    <tr>
                        <th>Симптомы физического дискомфорта</th>
                        <td>{result.physical_discomfort}</td>
                        <td>{Math.round(result.physical_discomfort / 30 * 100)}%</td>
                    </tr>
                    <tr>
                        <th>Снижение общего самочувствия и когнитивный дискомфорт</th>
                        <td>{result.cognitive_discomfort}</td>
                        <td>{Math.round(result.cognitive_discomfort / 20 * 100)}%</td>
                    </tr>
                    <tr>
                        <th>Нарушения в эмоционально-аффективной сфере</th>
                        <td>{result.emotional_violation}</td>
                        <td>{Math.round(result.emotional_violation / 12 * 100)}%</td>
                    </tr>
                    <tr>
                        <th>Снижение мотивации и изменения в сфере социального общения</th>
                        <td>{result.motivation_decrease}</td>
                        <td>{Math.round(result.motivation_decrease / 10 * 100)}%</td>
                    </tr>
                </table>
                <hr></hr>
                <p className={`diagnosis ${result.o <= 17 ? 'lvl0' : 
                                            result.o <= 26 ? 'lvl1' : 
                                            result.o <= 37 ? 'lvl2' :
                                            result.o <= 48 ? 'lvl3' : 'lvl4'}`}>{result.o <= 17 ? 'Отсутствие признаков хронического утомления' : 
                                            result.o <= 26 ? 'Начальная степень хронического утомления' : 
                                            result.o <= 37 ? 'Выраженная степень хронического утомления' :
                                            result.o <= 48 ? 'Сильная степень хронического утомления' : 'Переход в область патологических состояний (астенический синдром)'}</p>
                <hr></hr>
                <Button className='ButtonNav mt-3' variant="primary" type="button" onClick={handleStartAgain}>Пройти тест ещё раз</Button>
                <Button className='ButtonNav mt-3 mb-3' variant="primary" type="button" onClick={handleBack}>Вернуться на страницу теста</Button>
            </Container>
        </Container>
    );
};

export default Result;