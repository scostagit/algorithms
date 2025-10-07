import { TodoList } from "./components";
import './App.css';

import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

function App() {

  const { user, login, logout, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
        
      <div className="App"> 
        {user ? (
                <>
                  <h2>Welcome, {user.name}!</h2>
                  <TodoList/>                      
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <p>You are not logged in.</p>
                  <button onClick={() => login('john', '123')}>Login as John</button>
                </>
          )}                          
      </div>          
    
  );
}
export default App;
