import {createRoot} from 'react-dom/client'
import './styles.css'
import {BrowserRouter} from "react-router";
import RoutesConfig from "./routes";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        {RoutesConfig}
    </BrowserRouter>
)
