import { rest } from "msw";

export const getPokemons = rest.get(
  "https://pokeapi.co/api/v2/pokemon",
  (request, response, context) => {
    const offset = Number.parseInt(
      request.url.searchParams.get("offset"),
    );

    if (!offset) {
      return response(
        context.json({
          results: [
            {
              name: "Test",
              url: "www.youtube.com/c/domancode",
            },
          ],
        }),
      );
    }

    return response(
      context.json({
        results: [
          {
            name: "Test-10",
            url: "www.youtube.com/c/domancode",
          },
        ],
      }),
    );
  },
);
