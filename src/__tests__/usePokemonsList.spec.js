import {
  act,
  renderHook,
} from "@testing-library/react-hooks";

import { usePokemonsList } from "../usePokemonsList";
import { responses } from "../mocks/pokemonResponses";

describe.skip("testing usePokemonsList hook", () => {
  it("should fetch data after mounting and change state to loading", async () => {
    const { result } = renderHook(() => usePokemonsList());

    expect(result.current.pokemons).toStrictEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should fetch data after mounting and change state to loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemonsList(),
    );

    await waitForNextUpdate();
    expect(result.current.pokemons).toStrictEqual(
      responses[0],
    );
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch new data once page has been changed and loading state is present until fetch is done", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemonsList(),
    );

    await waitForNextUpdate();
    act(() => result.current.nextPage());
    expect(result.current.pokemons).toStrictEqual(
      responses[0],
    );
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.pokemons).toStrictEqual(
      responses[1],
    );
  });

  it("should fetch new data once page has been changed and loading state is present until fetch is done", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePokemonsList(),
    );

    await waitForNextUpdate();
    act(() => result.current.nextPage());
    await waitForNextUpdate();
    act(() => result.current.previousPage());
    expect(result.current.pokemons).toStrictEqual(
      responses[0],
    );
    expect(result.current.isLoading).toBe(false);
  });

  describe("using mocked data from MSW", () => {
    it("should fetch data after mounting and change state to loading", async () => {
      const { result } = renderHook(() =>
        usePokemonsList(),
      );

      expect(result.current.pokemons).toStrictEqual([]);
      expect(result.current.isLoading).toBe(true);
    });

    it("should fetch data after mounting and change state to loading", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonsList(),
      );

      await waitForNextUpdate();
      expect(result.current.pokemons).toStrictEqual([
        {
          name: "Test",
          url: "www.youtube.com/c/domancode",
        },
      ]);
      expect(result.current.isLoading).toBe(false);
    });

    it("should fetch new data once page has been changed and loading state is present until fetch is done", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonsList(),
      );

      await waitForNextUpdate();
      act(() => result.current.nextPage());
      expect(result.current.pokemons).toStrictEqual([
        {
          name: "Test",
          url: "www.youtube.com/c/domancode",
        },
      ]);
      expect(result.current.isLoading).toBe(true);
      await waitForNextUpdate();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.pokemons).toStrictEqual([
        {
          name: "Test-10",
          url: "www.youtube.com/c/domancode",
        },
      ]);
    });

    it("should fetch new data once page has been changed and loading state is present until fetch is done", async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonsList(),
      );

      await waitForNextUpdate();
      act(() => result.current.nextPage());
      await waitForNextUpdate();
      act(() => result.current.previousPage());
      expect(result.current.pokemons).toStrictEqual([
        {
          name: "Test",
          url: "www.youtube.com/c/domancode",
        },
      ]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
