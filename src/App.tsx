
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import "tailwindcss/tailwind.css"
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/rooms/new" component={NewRoom} /> 
            <Route path="/rooms/:id" component={Room} /> 
            <Route path="/admin/rooms/:id" component={AdminRoom} /> 
          </Switch>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    
  ); 

}

export default App;