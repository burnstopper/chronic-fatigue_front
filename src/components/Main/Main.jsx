import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import HistoryTable from '../HistoryTable/HistoryTable';
import { getResults } from '../../api/testApi';
import './Main.css';

const Main = () => {
    const handleStart = () => {
        window.location.href = '/ihru/test';
    };

    let [history, setHistory] = React.useState({});
    useEffect(() => {
        async function getHistory() {
            const results = await getResults();
            setHistory(results);
        }
        getHistory();
    }, []); 

    return (
        <Container className='TestInfo p-5'>
            <p className='Label'>Хроническое утомление</p>
            <br></br>
            <p>
            Хроническое утомление – это пограничное функциональное состояние организма, при котором к началу очередного трудового цикла сохраняются субъективные и объективные признаки утомления от предыдущей работы, для ликвидации которых необходим дополнительный отдых.
            </p>
            <p>В данном разделе сайта вы можете пройти тест на выявление хронического утомления</p>
            <Button className='TestStart mt-5 mb-5' variant="primary" type="button" onClick={handleStart}>Пройти тест</Button>
            <p className='Label'>История тестов:</p><br></br>
            <HistoryTable data={history}></HistoryTable>
        </Container>
    );
};

export default Main;