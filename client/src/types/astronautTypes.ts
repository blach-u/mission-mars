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
export type { Astronaut, AstronautListProps, AstronautFormProps, SearchBarProps, ExportCSVButtonProps, AppConfig };
