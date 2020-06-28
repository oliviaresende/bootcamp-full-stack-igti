import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates'

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('http://localhost:8080/votes')
        .then(res => res.json())
        .then(res => {
          setPreviousVotes(candidates.map(({ id, votes }) => ({ id, votes })));
          setPreviousPercentages(candidates.map(({ id, percentage }) => ({ id, percentage })));
          setCandidates(res.candidates);
        })
    }, 1000);
    return () => clearTimeout(timer);
  }, [candidates])

  return (
    <div className="container">
      {candidates.length === 0 ?
        (<Spinner description="Carregando..." />)
        :
        (
          <>
            <Header title="Votaçao" />
            <Candidates
              previousPercentages={previousPercentages}
              previousVotes={previousVotes}
              candidates={candidates}
            />
          </>
        )
      }
    </div>
  );
}

export default App;
