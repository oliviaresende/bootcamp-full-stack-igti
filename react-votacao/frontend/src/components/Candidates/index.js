import React from 'react';
import FlipMove from 'react-flip-move';

import Card from '../Card';
import Candidate from '../Candidate';

const Candidates = ({ candidates, previousVotes, previousPercentages }) => (
  <div className="row">
    <div class="col s8 offset-s2">
      <FlipMove>
        {candidates.map((candidate, index) => {
          const previousVoteObject = previousVotes.find(
            (item) => item.id === candidate.id
          );

          const previousPercentageObject = previousPercentages.find(
            item => item.id === candidate.id
          );

          return (
            <div key={candidate.id}>
              <Card>
                <Candidate
                  previousVote={!!previousVoteObject ? previousVoteObject.votes : 0}
                  previousPercentage={!!previousPercentageObject ? previousPercentageObject.percentage : 0}
                  candidate={candidate}
                  position={index + 1}
                />
              </Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  </div>
);

export default Candidates;