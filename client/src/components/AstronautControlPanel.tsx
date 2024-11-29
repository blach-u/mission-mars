import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAstronautData } from '../hooks/useAstronautData';
import AstronautList from './AstronautList';
import AstronautForm from './AstronautForm';
import SearchBar from './SearchBar';
import ExportCSVButton from './ExportCsv';

const AstronautControlPanel: React.FC = () => {
  const {
    filteredAstronauts,
    selectedAstronaut,
    mainPageError,
    formError,
    successMessage,
    showForm,
    searchTerm,
    formMode,
    setSelectedAstronaut,
    setShowForm,
    setSearchTerm,
    setFormMode,
    setFormError,
    handleDelete,
    setEditForm,
    handleFormSubmit,
  } = useAstronautData();

  return (
    <Container>
      <Row className='align-items-center my-3'>
        <Col>
          <h2>Astronauts</h2>
        </Col>
        <Col className='d-flex justify-content-end'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ExportCSVButton astronauts={filteredAstronauts} />
          <Button variant='success' onClick={() => {
            setSelectedAstronaut(null);
            setFormMode('create');
            setShowForm(true);
          }}>
            Create
          </Button>
        </Col>
      </Row>

      {successMessage && <div className='alert alert-success'>{successMessage}</div>}
      {mainPageError && <div className='alert alert-danger'>{mainPageError}</div>}

      <AstronautList
        astronauts={filteredAstronauts}
        handleUpdate={setEditForm}
        handleDelete={handleDelete}
      />

      <AstronautForm
        showForm={showForm}
        selectedAstronaut={formMode === 'edit' ? selectedAstronaut : undefined}
        handleClose={() => {
          setShowForm(false);
          setSelectedAstronaut(null);
          setFormError(null);
        }}
        handleSubmit={handleFormSubmit}
        error={formError}
      />
    </Container>
  );
};

export default AstronautControlPanel;
