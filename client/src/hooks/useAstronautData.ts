import { useEffect, useState } from 'react';
import { createAstronaut, deleteAstronaut, fetchAstronauts, updateAstronaut } from '../api/astronautsApi';
import { Astronaut } from '../types/astronautTypes';
import { validateAstronautData } from '../utils/validation';

export const useAstronautData = () => {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [selectedAstronaut, setSelectedAstronaut] = useState<Astronaut | null>(null);
  const [mainPageError, setMainPageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    const loadAstronauts = async () => {
      try {
        const data = await fetchAstronauts();
        setAstronauts(data);
        setMainPageError(null);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        setMainPageError('Failed to load astronauts');
      }
    };

    loadAstronauts();
  }, []);

  const handleCreate = async (astronaut: Astronaut) => {
    if (!astronaut.name || !astronaut.role) {
      setFormError('Please provide a valid name and role for the astronaut.');
      return;
    }

    try {
      const response = await createAstronaut(astronaut);
      const updatedAstronauts = await fetchAstronauts();
      setAstronauts(updatedAstronauts);
      setShowForm(false);
      setSuccessMessage(response.data.message);
      setFormError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      console.error('Error creating astronaut:', error);
      setFormError(`Failed to create astronaut: ${error.response?.data?.error || error.message}`);
      setSuccessMessage(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteAstronaut(id);
      setAstronauts(astronauts.filter(astronaut => astronaut.id !== id));
      setSuccessMessage(response.data.message);
      setMainPageError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting astronaut:', error);
      setMainPageError('Failed to delete astronaut');
    }
  };

  const setEditForm = (astronaut: Astronaut) => {
    setSelectedAstronaut(astronaut);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleUpdate = async (astronaut: Astronaut) => {
    try {
      const response = await updateAstronaut(astronaut.id!, astronaut);
      setAstronauts(astronauts.map(a => (a.id === astronaut.id ? astronaut : a)));
      setShowForm(false);
      setSuccessMessage(response.data.message);
      setFormError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      setFormError(`Error updating astronaut: ${error.response?.data?.error || error.message}`);
      setSuccessMessage(null);
    }
  };

  const handleFormSubmit = async (data: { name: string, role: string }) => {

    const validationError = validateAstronautData(data);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);

    if (formMode === 'create') {
      await handleCreate(data);
    } else if (formMode === 'edit' && selectedAstronaut) {
      await handleUpdate({ ...selectedAstronaut, ...data });
    }
  };

  const filteredAstronauts = astronauts.filter(({ name, role }) => {
    const fullName = name.toLowerCase();
    const lowerRole = role.toLowerCase();
    const search = searchTerm.toLowerCase();
    if (search.includes(' ')) {
      return fullName.includes(search) || lowerRole.includes(search);
    } else {
      return fullName.split(' ').some(word => word.startsWith(search)) || lowerRole.split(' ').some(word => word.startsWith(search));
    }
  });

  return {
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
    handleCreate,
    handleDelete,
    setEditForm,
    handleFormSubmit,
    handleUpdate,
  };
};
