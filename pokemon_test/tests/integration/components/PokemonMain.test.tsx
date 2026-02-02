import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonMain from "@/components/Pokemon/PokemonMain";
import type { Pokemon } from "@/types/pokemon";
import { describe, it, expect } from "vitest";

const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    image: "https://example.com/bulbasaur.png",
    types: ["grass", "poison"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    },
  },
  {
    id: 2,
    name: "Ivysaur",
    image: "https://example.com/ivysaur.png",
    types: ["grass", "poison"],
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      spAtk: 80,
      spDef: 80,
      speed: 60,
    },
  },
  {
    id: 4,
    name: "Charmander",
    image: "https://example.com/charmander.png",
    types: ["fire"],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      spAtk: 60,
      spDef: 50,
      speed: 65,
    },
  },
];

describe("PokemonMain Component", () => {
  it("should render Pokemon grid with all Pokemon", () => {
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    expect(bulbasaurElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Ivysaur")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  it("should display Battle Arena section with placeholder cards", () => {
    render(<PokemonMain initialPokemons={mockPokemons} />);

    expect(screen.getByText("Battle Arena")).toBeInTheDocument();
    expect(screen.getByText("Select First Pokémon")).toBeInTheDocument();
    expect(screen.getByText("Select Second Pokémon")).toBeInTheDocument();
  });

  it("should select first Pokemon when clicking a card", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const gridCards = screen.getAllByText("Bulbasaur");
    const bulbasaurGridCard = gridCards[0].closest("div")?.parentElement;

    await user.click(bulbasaurGridCard!);

    await waitFor(() => {
      expect(
        screen.queryByText("Select First Pokémon"),
      ).not.toBeInTheDocument();
    });

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    expect(bulbasaurElements.length).toBeGreaterThan(1); // Grid + Battle Arena
  });

  it("should select second Pokemon when clicking another card", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    const ivysaurElements = screen.getAllByText("Ivysaur");

    const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;
    const ivysaurCard = ivysaurElements[0].closest("div")?.parentElement;

    await user.click(bulbasaurCard!);
    await user.click(ivysaurCard!);

    await waitFor(() => {
      expect(
        screen.queryByText("Select Second Pokémon"),
      ).not.toBeInTheDocument();
    });

    const finalBulbasaur = screen.getAllByText("Bulbasaur");
    const finalIvysaur = screen.getAllByText("Ivysaur");
    expect(finalBulbasaur.length).toBeGreaterThan(1);
    expect(finalIvysaur.length).toBeGreaterThan(1);
  });

  it("should deselect Pokemon when clicking the same card again", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;

    await user.click(bulbasaurCard!);
    await waitFor(() => {
      expect(
        screen.queryByText("Select First Pokémon"),
      ).not.toBeInTheDocument();
    });

    await user.click(bulbasaurCard!);
    await waitFor(() => {
      expect(screen.getByText("Select First Pokémon")).toBeInTheDocument();
    });
  });

  it("should replace second Pokemon when both slots are full and new card is clicked", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    const ivysaurElements = screen.getAllByText("Ivysaur");
    const charmanderElements = screen.getAllByText("Charmander");

    const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;
    const ivysaurCard = ivysaurElements[0].closest("div")?.parentElement;
    const charmanderCard = charmanderElements[0].closest("div")?.parentElement;

    await user.click(bulbasaurCard!);
    await user.click(ivysaurCard!);

    await user.click(charmanderCard!);

    await waitFor(() => {
      // Bulbasaur should still be in battle arena
      const bulbasaurInArena = screen.getAllByText("Bulbasaur");
      expect(bulbasaurInArena.length).toBeGreaterThan(1);

      // Charmander should replace Ivysaur in battle arena
      const charmanderInArena = screen.getAllByText("Charmander");
      expect(charmanderInArena.length).toBeGreaterThan(1);

      // Ivysaur should only be in grid
      const ivysaurInArena = screen.queryAllByText("Ivysaur");
      expect(ivysaurInArena.length).toBe(1);
    });
  });

  it("should clear slot when clicking the X button", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;

    await user.click(bulbasaurCard!);

    await waitFor(() => {
      const clearButtons = screen.getAllByTitle("Deselect");
      expect(clearButtons.length).toBeGreaterThan(0);
    });

    const clearButton = screen.getAllByTitle("Deselect")[0];
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Select First Pokémon")).toBeInTheDocument();
    });
  });

  // it("should filter Pokemon by type", async () => {
  //   const user = userEvent.setup();
  //   render(<PokemonMain initialPokemons={mockPokemons} />);

  //   await waitFor(() => {
  //     expect(screen.getByRole("button", { name: /fire/i })).toBeInTheDocument();
  //   });

  //   const fireType = screen.getByRole("button", { name: /fire/i });
  //   await user.click(fireType);

  //   await waitFor(() => {
  //     expect(screen.getByText("Charmander")).toBeInTheDocument();
  //     expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
  //     expect(screen.queryByText("Ivysaur")).not.toBeInTheDocument();
  //   });
  // });

  it("should show View Battle Analysis button only when both slots are filled", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    const viewButton = screen.getByRole("button", {
      name: /View Battle Analysis/i,
    });
    expect(viewButton).toBeDisabled();

    const bulbasaurElements = screen.getAllByText("Bulbasaur");
    const ivysaurElements = screen.getAllByText("Ivysaur");

    const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;
    const ivysaurCard = ivysaurElements[0].closest("div")?.parentElement;

    await user.click(bulbasaurCard!);
    await waitFor(() => {
      expect(viewButton).toBeDisabled();
    });

    await user.click(ivysaurCard!);
    await waitFor(() => {
      expect(viewButton).not.toBeDisabled();
    });
  });

  // it("should maintain selection when filtering", async () => {
  //   const user = userEvent.setup();
  //   render(<PokemonMain initialPokemons={mockPokemons} />);

  //   const bulbasaurElements = screen.getAllByText("Bulbasaur");
  //   const bulbasaurCard = bulbasaurElements[0].closest("div")?.parentElement;

  //   await user.click(bulbasaurCard!);
  //   await waitFor(() => {
  //     expect(
  //       screen.getByRole("button", { name: /grass/i }),
  //     ).toBeInTheDocument();
  //   });

  //   const grassButton = screen.getByRole("button", { name: /grass/i });
  //   await user.click(grassButton);

  //   await waitFor(() => {
  //     const bulbasaurInArena = screen.getAllByText("Bulbasaur");
  //     expect(bulbasaurInArena.length).toBeGreaterThan(1);
  //   });
  // });

  it("should filter Pokémon by type and maintain selection", async () => {
    const user = userEvent.setup();
    render(<PokemonMain initialPokemons={mockPokemons} />);

    // Select Bulbasaur
    const bulbasaurCard = screen.getAllByText("Bulbasaur")[0].closest("div")!;
    await user.click(bulbasaurCard);

    // Wait for buttons to appear
    const grassButton = await screen.findByRole("button", { name: /grass/i });
    const fireButton = await screen.findByRole("button", { name: /fire/i });

    // Select Grass type
    await user.click(grassButton);

    // Scope grid
    const grid = screen.getByRole("main").querySelector(".grid")!;
    let gridText = grid.textContent || "";

    // Bulbasaur stays in Battle Arena, Charmander hidden in grid
    expect(screen.getAllByText("Bulbasaur").length).toBeGreaterThan(1);
    expect(gridText).not.toContain("Charmander");

    // Switch to Fire type
    await user.click(fireButton);

    gridText = grid.textContent || "";
    // Charmander visible in grid, Bulbasaur still in Battle Arena, Grass types filtered out from grid
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getAllByText("Bulbasaur").length).toBeGreaterThan(1);
    expect(gridText).not.toContain("Ivysaur");
  });
});
