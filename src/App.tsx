import { Alert, Col, Row, Spin, Typography } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { CharacterModal } from "./components/CharacterModal/CharacterModal";
import { StarshipModal } from "./components/StarshipModal/StarshipModal";
import { VehicleModal } from "./components/VehicleModal/VehicleModal";
import { SpeciesModal } from "./components/SpeciesModal/SpeciesModal";
import { EmptyState } from "./components/EmptyState/EmptyState";
import "./styles/main.scss";
import type { Film, Character, Starship, Vehicle, Species } from "./types";
import {
  fetchAllFilms,
  fetchCharacter,
  fetchStarship,
  fetchVehicle,
  fetchSpecies,
} from "./utils/api";

const { Title } = Typography;

const App: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [characterLoading, setCharacterLoading] = useState<boolean>(false);
  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(
    null
  );
  const [starshipLoading, setStarshipLoading] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleLoading, setVehicleLoading] = useState<boolean>(false);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [speciesLoading, setSpeciesLoading] = useState<boolean>(false);

  const getOpenModal = (): string | null => {
    if (characterLoading || selectedCharacter) return "character";
    if (starshipLoading || selectedStarship) return "starship";
    if (vehicleLoading || selectedVehicle) return "vehicle";
    if (speciesLoading || selectedSpecies) return "species";
    return null;
  };

  const openModal = getOpenModal();

  const hasFetchedRef = useRef<boolean>(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;

    const loadFilms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllFilms();
        setFilms(data);
      } catch (err) {
        setError("Failed to load Star Wars films. Please try again later.");
        console.error("Error fetching films:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  const filteredFilms = useMemo(() => {
    if (!searchQuery.trim()) {
      return films;
    }

    const query = searchQuery.toLowerCase().trim();
    return films.filter((film) => film.title.toLowerCase().includes(query));
  }, [films, searchQuery]);

  const handleCharacterClick = async (characterUrl: string) => {
    setSelectedStarship(null);
    setStarshipLoading(false);
    setSelectedVehicle(null);
    setVehicleLoading(false);
    setSelectedSpecies(null);
    setSpeciesLoading(false);

    setSelectedCharacter(null);
    setCharacterLoading(true);

    try {
      const character = await fetchCharacter(characterUrl);
      setSelectedCharacter(character);
    } catch (error) {
      console.error("Error fetching character:", error);
    } finally {
      setCharacterLoading(false);
    }
  };

  const handleStarshipClick = async (starshipUrl: string) => {
    setSelectedCharacter(null);
    setCharacterLoading(false);
    setSelectedVehicle(null);
    setVehicleLoading(false);
    setSelectedSpecies(null);
    setSpeciesLoading(false);

    setSelectedStarship(null);
    setStarshipLoading(true);

    try {
      const starship = await fetchStarship(starshipUrl);
      setSelectedStarship(starship);
    } catch (error) {
      console.error("Error fetching starship:", error);
    } finally {
      setStarshipLoading(false);
    }
  };

  const handleVehicleClick = async (vehicleUrl: string) => {
    setSelectedCharacter(null);
    setCharacterLoading(false);
    setSelectedStarship(null);
    setStarshipLoading(false);
    setSelectedSpecies(null);
    setSpeciesLoading(false);

    setSelectedVehicle(null);
    setVehicleLoading(true);

    try {
      const vehicle = await fetchVehicle(vehicleUrl);
      setSelectedVehicle(vehicle);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    } finally {
      setVehicleLoading(false);
    }
  };

  const handleSpeciesClick = async (speciesUrl: string) => {
    setSelectedCharacter(null);
    setCharacterLoading(false);
    setSelectedStarship(null);
    setStarshipLoading(false);
    setSelectedVehicle(null);
    setVehicleLoading(false);

    setSelectedSpecies(null);
    setSpeciesLoading(true);

    try {
      const species = await fetchSpecies(speciesUrl);
      setSelectedSpecies(species);
    } catch (error) {
      console.error("Error fetching species:", error);
    } finally {
      setSpeciesLoading(false);
    }
  };

  const closeAllModals = () => {
    setSelectedCharacter(null);
    setCharacterLoading(false);
    setSelectedStarship(null);
    setStarshipLoading(false);
    setSelectedVehicle(null);
    setVehicleLoading(false);
    setSelectedSpecies(null);
    setSpeciesLoading(false);
  };

  const renderModal = () => {
    switch (openModal) {
      case "character":
        return (
          <CharacterModal
            character={selectedCharacter}
            loading={characterLoading}
            open={true}
            onClose={closeAllModals}
          />
        );
      case "starship":
        return (
          <StarshipModal
            starship={selectedStarship}
            loading={starshipLoading}
            open={true}
            onClose={closeAllModals}
          />
        );
      case "vehicle":
        return (
          <VehicleModal
            vehicle={selectedVehicle}
            loading={vehicleLoading}
            open={true}
            onClose={closeAllModals}
          />
        );
      case "species":
        return (
          <SpeciesModal
            species={selectedSpecies}
            loading={speciesLoading}
            open={true}
            onClose={closeAllModals}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Loading Star Wars films..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <Title level={1}>Star Wars Movies Catalog</Title>
      </div>

      <div className="search-container">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredFilms.length === 0 ? (
        <div className="empty-films-container">
          <EmptyState
            description={
              searchQuery.trim()
                ? `No movies match your search for "${searchQuery}"`
                : "No movies available"
            }
          />
        </div>
      ) : (
        <div className="movies-grid">
          <Row gutter={[24, 24]} justify="center">
            {filteredFilms.map((film) => (
              <Col key={film.url} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MovieCard
                  film={film}
                  onCharacterClick={handleCharacterClick}
                  onStarshipClick={handleStarshipClick}
                  onVehicleClick={handleVehicleClick}
                  onSpeciesClick={handleSpeciesClick}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {renderModal()}
    </div>
  );
};

export default App;
