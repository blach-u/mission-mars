import * as THREE from 'three';
interface Astronaut {
  id?: number;
  name: string;
  role: string;
}
interface AstronautListProps {
  astronauts: Astronaut[];
  handleUpdate: (astronaut: Astronaut) => void;
  handleDelete: (id: number) => void;
}
interface AstronautFormProps {
  showForm: boolean;
  selectedAstronaut?: Astronaut | null;
  handleClose: () => void;
  handleSubmit: (data: { name: string; role: string }) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface ExportCSVButtonProps {
  astronauts: Astronaut[];
}

interface AppConfig {
  app: {
    env: string
    baseUrl: string
  };
}

type Moon = {
  name: string;
  radius: number;
  distance: number;
  orbitSpeed: number;
  mesh?: THREE.Mesh;
  angle?: number;
};

type Planet = {
    name: string;
    radius: number;
    distance: number;
    texture: string;
    orbitSpeed: number;
    mesh?: THREE.Mesh;
    moons?: Moon[];
    rings?: {
      innerRadius: number;
      outerRadius: number;
    };
    angle?: number;
  };

export type { Astronaut, AstronautListProps, AstronautFormProps, SearchBarProps, ExportCSVButtonProps, AppConfig, Moon, Planet };
