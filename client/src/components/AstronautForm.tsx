import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AstronautFormProps } from '../types/astronautTypes';

const AstronautForm: React.FC<AstronautFormProps> = ({
  showForm,
  selectedAstronaut,
  handleClose,
  handleSubmit,
  error,
}) => {
  const [name, setName] = useState(selectedAstronaut?.name || '');
  const [role, setRole] = useState(selectedAstronaut?.role || '');

  useEffect(() => {
    if (selectedAstronaut) {
      setName(selectedAstronaut.name);
      setRole(selectedAstronaut.role);
    }
  }, [selectedAstronaut]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ name, role });
    clearData();
  };
  const clearData = () =>{
    setName('');
    setRole('');
    console.log('TU JESTEM');
  };
  return (
    <Modal show={showForm} onHide={() =>{
      clearData();
      handleClose();
    }}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedAstronaut ? 'Update Astronaut' : 'Create Astronaut'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className='alert alert-danger'>{error}</div>}

        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type='text'
              placeholder='Role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='space-button'>
            {selectedAstronaut ? 'Update' : 'Create'}
          </Button>
          <Button variant='secondary' className='ms-2 space-button' onClick={() =>{
            clearData();
            handleClose();
          }}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AstronautForm;
