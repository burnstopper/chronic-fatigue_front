import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useParams } from "react-router-dom";
import './Result.css';
import { getResult } from '../../api/testApi';

const Result = ({setMainPage, setResultPage, setTestPage, resultId}) => {
    const result_id = resultId;
    const [result, setResult] = React.useState({});
    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState('');

    useEffect(() => {
        async function getResults() {
            try {
                const results = await getResult(result_id);
                setResult(results);
            } catch (error) {
                setShow(true);
                setError(error.message);
            }
        }
        getResults();
    }, []); 

    const handleStartAgain = () => {
       setResultPage(false);
       setTestPage(true);
    };

    const handleBack = () => {
        setResultPage(false);
        setMainPage(true);
    };

    return (
        <Container className='ResultContainer p-5'>
            {show && <Alert className='mt-3' variant="danger" onClose={() => handleBack()} dismissible>
                <Alert.Heading>Ошибка!</Alert.Heading>
                {error}
            </Alert>}
            {!show && <div>
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
                <p className={`diagnosis ${result.distress <= 17 ? 'lvl0' : 
                                            result.distress <= 26 ? 'lvl1' : 
                                            result.distress <= 37 ? 'lvl2' :
                                            result.distress <= 48 ? 'lvl3' : 'lvl4'}`}>{result.distress <= 17 ? 'Отсутствие признаков хронического утомления' : 
                                            result.distress <= 26 ? 'Начальная степень хронического утомления' : 
                                            result.distress <= 37 ? 'Выраженная степень хронического утомления' :
                                            result.distress <= 48 ? 'Сильная степень хронического утомления' : 'Переход в область патологических состояний (астенический синдром)'}</p>
                <hr></hr>
                <Button className='ButtonNav mt-3' variant="primary" type="button" onClick={handleStartAgain}>Пройти тест ещё раз</Button>
                <Button className='ButtonNav mt-3 mb-3' variant="primary" type="button" onClick={handleBack}>Вернуться на страницу теста</Button>
            </Container></div>}
        </Container>
    );
};

export default Result;