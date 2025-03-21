import App from '../App';
import {Route, Routes} from "react-router";
// Importe outros componentes de página conforme necessário

const RoutesConfig = (
    <Routes>
        <Route path="/" element={<App/>}/>
    </Routes>
);

export default RoutesConfig;
