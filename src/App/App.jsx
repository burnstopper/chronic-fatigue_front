import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import "./App.css";
import Test from "../components/Test/Test";
import Result from "../components/Result/Result";
import Main from "../components/Main/Main";
import CookieLib from "../components/cookie-lib";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(CookieLib.getCookieToken());

  const [testPage, setTestPage] = useState(false);
  const [resultPage, setResultPage] = useState(false);
  const [mainPage, setMainPage] = useState(true);

  const [resultId, setResultId] = useState(-1);

  return (
    <html>
        <head></head>
          <body>
            <Header token={token} setToken={setToken} />
            {mainPage && <Main setTestPage={setTestPage} setResultPage={setResultPage} setMainPage={setMainPage} />}
            {resultPage && <Result setTestPage={setTestPage} setResultPage={setResultPage} setMainPage={setMainPage} resultId={resultId} />}
            {testPage && <Test setTestPage={setTestPage} setResultPage={setResultPage} setMainPage={setMainPage} setResultId={setResultId} />}
          </body>
    </html>
  );
}

export default App;
