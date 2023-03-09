import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './HistoryTable.css';

const HistoryTable = ({ data }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        if (data.length > 0) {
            setTableData(data);
        }
    }, [data]);
    
    return (
        <Table responsive>
          <thead>
            <tr>
              <th></th>
              {tableData.map((test, index) => (
                <th key={index}>{new Date(test.timestamp).toLocaleString("en-US", {timeZone: "Europe/Moscow"})}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Индекс хронического утомления</td>
              {tableData.map((test, index) => {
                if (index > 0 && test.distress < tableData[index - 1].distress) {
                    return <td key={index} style={{"color": "green"}}>{test.distress} ↓</td>
                }
                else {
                    if (index > 0 && test.distress > tableData[index - 1].distress) {
                        return <td key={index} style={{"color": "red"}}>{test.distress} ↑</td>
                    }
                }
                return <td key={index}>{test.distress}</td>
              })}
            </tr>
            <tr>
              <td>Симптомы физического дискомфорта</td>
              {tableData.map((test, index) => {
                if (index > 0 && test.physical_discomfort < tableData[index - 1].physical_discomfort) {
                    return <td key={index} style={{"color": "green"}}>{test.physical_discomfort} ↓</td>
                }
                else {
                    if (index > 0 && test.physical_discomfort > tableData[index - 1].physical_discomfort) {
                        return <td key={index} style={{"color": "red"}}>{test.physical_discomfort} ↑</td>
                    }
                }
                return <td key={index}>{test.physical_discomfort}</td>
            })}
            </tr>
            <tr>
              <td>Снижение общего самочувствия и когнитивный дискомфорт</td>
              {tableData.map((test, index) => {
                if (index > 0 && test.cognitive_discomfort < tableData[index - 1].cognitive_discomfort) {
                    return <td key={index} style={{"color": "green"}}>{test.cognitive_discomfort} ↓</td>
                }
                else {
                    if (index > 0 && test.cognitive_discomfort > tableData[index - 1].cognitive_discomfort) {
                        return <td key={index} style={{"color": "red"}}>{test.cognitive_discomfort} ↑</td>
                    }
                }
                return <td key={index}>{test.cognitive_discomfort}</td>
            })}
            </tr>
            <tr>
              <td>Нарушения в эмоционально-аффективной сфере</td>
              {tableData.map((test, index) => {
                if (index > 0 && test.emotional_violation < tableData[index - 1].emotional_violation) {
                    return <td key={index} style={{"color": "green"}}>{test.emotional_violation} ↓</td>
                }
                else {
                    if (index > 0 && test.emotional_violation > tableData[index - 1].emotional_violation) {
                        return <td key={index} style={{"color": "red"}}>{test.emotional_violation} ↑</td>
                    }
                }
                return <td key={index}>{test.emotional_violation}</td>
            })}
            </tr>
            <tr>
              <td>Снижение мотивации и изменения в сфере социального общения</td>
              {tableData.map((test, index) => {
                if (index > 0 && test.motivation_decrease < tableData[index - 1].motivation_decrease) {
                    return <td key={index} style={{"color": "green"}}>{test.motivation_decrease} ↓</td>
                }
                else {
                    if (index > 0 && test.motivation_decrease > tableData[index - 1].motivation_decrease) {
                        return <td key={index} style={{"color": "red"}}>{test.motivation_decrease} ↑</td>
                    }
                }
                return <td key={index}>{test.motivation_decrease}</td>
            })}
            </tr>
          </tbody>
        </Table>
      );
}

export default HistoryTable;