import axios from "axios";
import type {
  Film,
  Character,
  Starship,
  Vehicle,
  Species,
  SWAPIResponse,
} from "../types";
import { API_ENDPOINTS } from "./constants";

const BASE_URL = "https://swapi.info/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchPaginatedResource = async <T>(endpoint: string): Promise<T[]> => {
  try {
    const response = await apiClient.get<T[] | SWAPIResponse<T>>(endpoint);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    const paginatedResponse: SWAPIResponse<T> = response.data;
    const allResults: T[] = [...paginatedResponse.results];
    let nextUrl: string | null = paginatedResponse.next
      ? paginatedResponse.next.replace("http://", "https://")
      : null;

    while (nextUrl) {
      try {
        const cleanUrl: string = nextUrl.replace(BASE_URL, "");
        const nextResponse = await apiClient.get<SWAPIResponse<T>>(cleanUrl);
        allResults.push(...nextResponse.data.results);
        nextUrl = nextResponse.data.next
          ? nextResponse.data.next.replace("http://", "https://")
          : null;
      } catch (error) {
        console.error(`Error fetching next page for ${endpoint}:`, error);
        break;
      }
    }

    return allResults;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

const fetchResourceByUrl = async <T>(url: string): Promise<T> => {
  try {
    const cleanUrl: string = url
      .replace("http://", "https://")
      .replace(BASE_URL, "");
    const response = await apiClient.get<T>(cleanUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching resource from ${url}:`, error);
    throw error;
  }
};

export const fetchAllFilms = async (): Promise<Film[]> => {
  return fetchPaginatedResource<Film>(API_ENDPOINTS.FILMS);
};

export const fetchCharacter = async (url: string): Promise<Character> => {
  return fetchResourceByUrl<Character>(url);
};

export const fetchStarship = async (url: string): Promise<Starship> => {
  return fetchResourceByUrl<Starship>(url);
};

export const fetchVehicle = async (url: string): Promise<Vehicle> => {
  return fetchResourceByUrl<Vehicle>(url);
};

export const fetchSpecies = async (url: string): Promise<Species> => {
  return fetchResourceByUrl<Species>(url);
};
