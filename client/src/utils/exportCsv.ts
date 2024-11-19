import { Astronaut } from '../types/astronautTypes';

export const exportCSV = (filteredAstronauts: Astronaut[]) => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    ['ID,Name,Role']
      .concat(
        filteredAstronauts.map((astronaut) => `${astronaut.id},${astronaut.name},${astronaut.role}`)
      )
      .join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'astronauts.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
