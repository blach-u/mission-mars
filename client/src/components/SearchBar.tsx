import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { SearchBarProps } from '../types/astronautTypes';

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className='me-2 space-seach-bar' style={{ maxWidth: '300px' }}>
      <FormControl
        type='text'
        placeholder='Search Astronauts'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
