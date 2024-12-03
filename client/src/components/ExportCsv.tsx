import React from 'react';
import { Button } from 'react-bootstrap';
import { ExportCSVButtonProps } from '../types/astronautTypes';
import { exportCSV } from '../utils/exportCsv';

const ExportCSVButton: React.FC<ExportCSVButtonProps> = ({ astronauts }) => {
  return (
    <Button variant='info' className='me-2 space-button' onClick={() => exportCSV(astronauts)}>
            Export CSV
    </Button>
  );
};

export default ExportCSVButton;
