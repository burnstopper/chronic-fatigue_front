import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Question from '../Question/Question';
import './Test.css';
import { submitTest } from '../../api/testApi';
import Alert from 'react-bootstrap/Alert';
import { useSearchParams } from "react-router-dom";


const Test = () => {
  const questions = [["Чаще всего у меня хорошее самочувствие", 1],
    ["Я стал(а) раздражительным.", 2],
    ["В последнее время я стал(а) хуже видеть.", 3],
    ["Я стал(а) забывчивым.", 4],
    ["После работы я чувствую себя разбитым(ой).", 5],
    ["Мне нравится работать в коллективе.", 6],
    ["У меня часто бывает подавленное настроение.", 7],
    ["Я чувствую постоянную тяжесть в голове", 8],
    ["У меня отекают ноги", 9],
    ["У меня бывают головокружения", 10],
    ["У меня бывает ощущение, что мне трудно вздохнуть", 11],
    ["Мне всегда хочется как можно быстрее закончит работу и уйти домой", 12],
    ["После сна я обычно встаю вялым(ой) и плохо отдохнувшим(ей)", 13],
    ["Мой рабочий день обычно протекает незаметно", 14],
    ["Я стал(а) часто ссориться со своими близкими", 15],
    ["После пробуждения я засыпаю с трудом", 16],
    ["Я постоянно испытываю неприятные ощущения в глазах", 17],
    ["В последнее время стали раздражать вещи, к которым раньше я относился(ась) спокойно", 18],
    ["Я стал(а) вялым и безразличным", 19],
    ["Мне трудно удержать в памяти даже те дела, которые нужно сделать сегодня", 20],
    ["В последнее время мне стало трудно работать", 21],
    ["У меня ровный и спокойный характер", 22],
    ["Меня мучают боли в висках и во лбу", 23],
    ["У меня часто бывают приступы сердцебиений", 24],
    ["Когда я работаю, у меня почти все время болят спина и шея", 25],
    ["У меня часто возникает чувство тошноты", 26],
    ["У меня часто болит голова", 27],
    ["Моя работа перестала мне нравиться", 28],
    ["Я постоянно хочу спать днем", 29],
    ["Мои близкие стали замечать, что у меня портится характер", 30],
    ["Когда я читаю, мне приходится напрягать глаза", 31],
    ["Чаще всего у меня беспокойный сон", 32],
    ["Я с удовольствием прихожу на работу", 33],
    ["Я в последнее время чувствую себя усталым(ой)", 34],
    ["В последнее время я чувствую общее недомогание", 35],
    ["Я чувствую себя абсолютно здоровым человеком", 36]];

  const [show, setShow] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const quiz_id = searchParams.get("quiz_id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var radios = document.querySelectorAll('input[name="answer"]');
    var flag = false;

    var count = 0;
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        count++;
      }
    }

    var answers = [];
    if (count == 36) {
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          if (radios[i].id.match(/[a-zA-Z]+/g)[0] == 'yes') {
            answers.push(0);
          } else {
            if (radios[i].id.match(/[a-zA-Z]+/g)[0] == 'no') {
              answers.push(2);
            } else {
              answers.push(1);
            }
          }
        }
      }
    } else {
      setErrorText("Выберите ответ на все вопросы!");
      setShow(true);
      return;
    }
      
    submitTest(answers, quiz_id).then((res) => { window.location.replace(`/ihru/result/${res.result_id}`) }).catch((err) => { setErrorText(err.toString()); setShow(true); });
  };

  return (
    <Container className='TestForm mt-5 mb-5 p-5 rounded'>
      <p className='TestName'>Тест на выявление хронического утомления</p>
      <Form className="mt-5" onSubmit={handleSubmit}>
        {questions.map(question => (
          <Question
            question={question[0]}
            question_id={question[1]}
          />))
        }
        {show && <Alert className='mt-3' variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Ошибка!</Alert.Heading>
          {errorText}
          </Alert>}
        <Button className='TestSubmit mt-5' variant="primary" type="submit">Получить результат</Button>
      </Form>
    </Container>
  );
};

export default Test;