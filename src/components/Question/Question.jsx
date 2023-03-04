import React from 'react';
import { Form, Container, Row, Col} from 'react-bootstrap';
import './Question.css';

const Question = ({question, question_id}) => {
  return (
    <Form question_id={question_id} className="mt-3">
      <Row>
        <Col>
          <Form.Label><b>{question_id}. {question}</b></Form.Label>
        </Col>
      </Row>
      <Row className="mt-2">
          <Form.Check type="radio" label="Да" name="answer" id={'yes' + question_id} />
          <Form.Check type="radio" label="Затрудняюсь ответить" name="answer" id={'notsure' + question_id} />
          <Form.Check type="radio" label="Нет" name="answer" id={'no' + question_id} />
      </Row>
    </Form>
  );
};

export default Question;