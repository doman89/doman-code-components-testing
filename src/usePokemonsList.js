import { useEffect, useRef, useState } from "react";

export function usePokemonsList({
  defaultLimit = 10,
  defaultPage = 0,
} = {}) {
  const cache = useRef({});
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cacheKey = `${limit}:${page}`;

    if (cache.current[cacheKey]) {
      return setPokemons(cache.current[cacheKey]);
    }

    let isMountedHook = true;

    setIsLoading(true);
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        page * limit
      }`,
    )
      .then((response) => response.json())
      .then(({ results }) => {
        if (!isMountedHook) {
          return;
        }

        setPokemons(results);
        cache.current[cacheKey] = results;
        setIsLoading(false);
      });

    return () => {
      isMountedHook = false;
    };
  }, [page, limit]);

  const changeLimit = (limit = defaultLimit) =>
    setLimit(limit);
  const nextPage = () =>
    setPage((previousValue) => ++previousValue);
  const previousPage = () =>
    setPage((previousValue) => --previousValue);

  return {
    changeLimit,
    isLoading,
    nextPage,
    pokemons,
    previousPage,
  };
}
