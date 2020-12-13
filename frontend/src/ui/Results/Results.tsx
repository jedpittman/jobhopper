import React, { useMemo, useState } from 'react';
import { Body, Title } from '../Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Row, Section, StyledSecondary } from '../Common';
import { Transition } from 'src/domain/transition';
import Treemap from '../D3Visualizations/Treemap';
import TransitionTable from '../TransitionTable';
import ResultError from 'src/ui/Results/ResultError';

export interface ResultsProps {
  loading?: boolean;
  transitions?: Transition[];
  error?: string;
}

const Results: React.FC<ResultsProps> = ({
  transitions: immutableTransitions = [],
  loading = false,
  error,
}) => {
  const [visualization, setVisualization] = useState<'matrix' | 'treemap'>(
    'matrix'
  );

  // Material table mutates its data, but immer freezes objects, so we clone
  // the transition data for compatibility.
  const transitions = useMemo<Transition[]>(
    () => immutableTransitions.map(t => ({ ...t })),
    [immutableTransitions]
  );

  const hasTransitions = transitions.length > 0,
    showMatrix = visualization === 'matrix' && hasTransitions,
    showTreemap = visualization === 'treemap' && hasTransitions,
    disabled = !hasTransitions || loading;

  return (
    <>
      <Section>
        <Title>See Transitions Data</Title>
        <Body>There is a choice of two ways of viewing the data.</Body>
      </Section>
      <Row>
        <StyledSecondary
          label="See a Matrix"
          onClick={() => {
            setVisualization('matrix');
          }}
          disabled={disabled}
          selected={showMatrix}
        />
        <StyledSecondary
          label="See a Treechart"
          onClick={() => {
            setVisualization('treemap');
          }}
          disabled={disabled}
          selected={showTreemap}
        />
      </Row>
      {(() => {
        if (loading) {
          return <CircularProgress />;
        } else if (error) {
          return <ResultError error={error} />;
        } else if (showMatrix) {
          return <TransitionTable transitionData={transitions} />;
        } else if (showTreemap) {
          return <Treemap data={transitions} />;
        }
      })()}
    </>
  );
};

export default Results;
