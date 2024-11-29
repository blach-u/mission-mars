import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { AstronautListProps } from '../types/astronautTypes';

const AstronautList: React.FC<AstronautListProps> = ({ astronauts, handleUpdate, handleDelete }) => {
  return (
    <ListGroup>
      {astronauts.map((astronaut) => (
        <ListGroup.Item key={astronaut.id} className='astronaut-item'>
          <div>
            <strong>{astronaut.name}</strong> - {astronaut.role}
          </div>
          <div className='action-btn'>
            <Button
              variant='primary'
              size='sm'
              className='me-2 space-button'
              onClick={() => handleUpdate(astronaut)}
            >
              Update
            </Button>
            <Button
              variant='danger'
              size='sm'
              className ='space-button'
              onClick={() => {
                if (astronaut.id !== undefined) {
                  handleDelete(astronaut.id);
                } else {
                  console.warn('Astronaut ID is undefined; can\'t delete');
                }
              }}
            >
              Delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AstronautList;
