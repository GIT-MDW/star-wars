import React from "react";
import { Card, Collapse, Typography, Space, Tag } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  UserSwitchOutlined,
  ShopOutlined,
  RocketOutlined,
  CarOutlined,
  BugOutlined,
} from "@ant-design/icons";
import type { Film } from "../../types";
import { ResourceList } from "./utils/resourceList";
import "./MovieCard.scss";

const { Text, Paragraph } = Typography;

interface MovieCardProps {
  film: Film;
  onCharacterClick: (characterUrl: string) => void;
  onStarshipClick: (starshipUrl: string) => void;
  onVehicleClick: (vehicleUrl: string) => void;
  onSpeciesClick: (speciesUrl: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  film,
  onCharacterClick,
  onStarshipClick,
  onVehicleClick,
  onSpeciesClick,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      className="movie-card"
      title={
        <div className="movie-card-title">
          <Text strong>{film.title}</Text>
          <Tag color="blue" className="movie-card-episode-tag">
            Episode {film.episode_id}
          </Tag>
        </div>
      }
    >
      <div className="movie-card-info-item">
        <Space>
          <CalendarOutlined className="movie-card-icon" />
          <span className="movie-card-info-label">Release Date:</span>
          <span className="movie-card-info-value">
            {formatDate(film.release_date)}
          </span>
        </Space>
      </div>

      <div className="movie-card-info-item">
        <Space>
          <UserSwitchOutlined className="movie-card-icon" />
          <span className="movie-card-info-label">Director:</span>
          <span className="movie-card-info-value">{film.director}</span>
        </Space>
      </div>

      <div className="movie-card-info-item">
        <Space>
          <ShopOutlined className="movie-card-icon" />
          <span className="movie-card-info-label">Producer:</span>
          <span className="movie-card-info-value">{film.producer}</span>
        </Space>
      </div>

      <div className="movie-card-info-item">
        <span className="movie-card-info-label">Opening Crawl:</span>
        <Paragraph className="movie-card-opening-crawl">
          {film.opening_crawl}
        </Paragraph>
      </div>

      <Collapse
        ghost
        items={[
          {
            key: "characters",
            label: (
              <Space>
                <UserOutlined />
                <Text strong>Characters ({film.characters.length})</Text>
              </Space>
            ),
            children: (
              <ResourceList
                items={film.characters}
                itemLabel={(index) => `Character ${index + 1}`}
                onItemClick={(url, e) => {
                  e.stopPropagation();
                  onCharacterClick(url);
                }}
                emptyMessage="No characters available"
              />
            ),
          },
          {
            key: "starships",
            label: (
              <Space>
                <RocketOutlined />
                <Text strong>Starships ({film.starships.length})</Text>
              </Space>
            ),
            children: (
              <ResourceList
                items={film.starships}
                itemLabel={(index) => `Starship ${index + 1}`}
                onItemClick={(url, e) => {
                  e.stopPropagation();
                  onStarshipClick(url);
                }}
                emptyMessage="No starships available"
              />
            ),
          },
          {
            key: "vehicles",
            label: (
              <Space>
                <CarOutlined />
                <Text strong>Vehicles ({film.vehicles.length})</Text>
              </Space>
            ),
            children: (
              <ResourceList
                items={film.vehicles}
                itemLabel={(index) => `Vehicle ${index + 1}`}
                onItemClick={(url, e) => {
                  e.stopPropagation();
                  onVehicleClick(url);
                }}
                emptyMessage="No vehicles available"
              />
            ),
          },
          {
            key: "species",
            label: (
              <Space>
                <BugOutlined />
                <Text strong>Species ({film.species.length})</Text>
              </Space>
            ),
            children: (
              <ResourceList
                items={film.species}
                itemLabel={(index) => `Species ${index + 1}`}
                onItemClick={(url, e) => {
                  e.stopPropagation();
                  onSpeciesClick(url);
                }}
                emptyMessage="No species available"
              />
            ),
          },
        ]}
      />
    </Card>
  );
};
