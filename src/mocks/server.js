import { setupServer } from "msw/node";
import { getPokemons } from "./handler";

export const server = setupServer(getPokemons);
