import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Home from "./pages/index";
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
  return (
    <Scrollbars id="content" style={{ height: '100vh' }}>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </RecoilRoot>
    </Scrollbars >
  );
}

export default App;
