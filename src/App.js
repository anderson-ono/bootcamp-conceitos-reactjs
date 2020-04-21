import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Anderson Ono ${Date.now()}`,
	    url: `github.com/anderson-ono${Date.now()}`,
	    techs: "[NodeJS, ReactJS]"
    });

    const newRepositories = [...repositories, response.data];
    setRepositories(newRepositories);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status == 204) {
      const index = repositories.findIndex(repository => repository.id === id);

      const newRepositories = [...repositories];
      newRepositories.splice(index, 1);
      
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repository => <li key={ repository.id }>
                            { repository.title }
                            
                            <button onClick={() => handleRemoveRepository(repository.id)}>
                              Remover
                            </button>
                          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
