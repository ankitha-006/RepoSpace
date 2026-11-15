
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import {AuthProvider} from './AuthContext.jsx'
import ProjectRoutes from './Routes.jsx';
import {BrowserRouter as Router} from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <AuthProvider> 
   {/* by wrapping like this the whole applications gets the access of the user  */}
    {/* so that which ever 
    component we are currently on will be able to accesss user id  */}
    <Router>
    <ProjectRoutes />
    {/* This project route decides which router needs to be opened (it is thefirst running comp )*/}
    </Router>
  </AuthProvider>,
)
