import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import "./App.css";
import Test from "../components/Test/Test";
import Result from "../components/Result/Result";
import Main from "../components/Main/Main";

function App() {
  return (
    <html>
        <head></head>
          <body>
            <Header />
            <BrowserRouter>
              <Routes >
                <Route exact path="/ihru/test" element={<Test />} />
                <Route exact path="/ihru/result" element={<Result />} />
                <Route exact path="/ihru" element={<Main />} />
              </Routes>
            </BrowserRouter>
          </body>
    </html>
  );
}

export default App;
