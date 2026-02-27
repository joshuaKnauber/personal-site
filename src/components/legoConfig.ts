import type { BrickColor } from "./Brick";

export type BrickDef = {
  column: number | [number, number];
  row: number | [number, number];
  color: BrickColor;
};

export type HoleDef = {
  column: [number, number];
  row: [number, number];
  roughness?: number; // cells of ragged border (0 = clean rectangle)
};

export type BreakpointConfig = {
  minWidth: number;
  seed: number;
  palette: BrickColor[];
  holes?: HoleDef[];
  bricks?: BrickDef[];
};

export const legoConfig: BreakpointConfig[] = [
  {
    // mobile ~17 cols x 36 rows
    minWidth: 0,
    seed: 42,
    palette: ["white", "white", "red", "blue", "yellow"],
    holes: [
      { column: [3, 15], row: [3, 13], roughness: 5 }, // hero
      { column: [3, 15], row: [17, 27], roughness: 5 }, // content
    ],
    bricks: [],
  },
  {
    // tablet ~32 cols x 43 rows
    minWidth: 768,
    seed: 42,
    palette: ["white", "white", "red", "blue", "yellow"],
    holes: [
      { column: [4, 29], row: [3, 16], roughness: 5 }, // hero
      { column: [4, 29], row: [20, 33], roughness: 5 }, // content
    ],
    bricks: [],
  },
  {
    // desktop ~54 cols x 38 rows
    minWidth: 1280,
    seed: 42,
    palette: ["white", "white", "red", "blue", "yellow"],
    holes: [
      { column: [6, 49], row: [4, 18], roughness: 5 }, // hero
      { column: [6, 49], row: [22, 35], roughness: 5 }, // content
    ],
    bricks: [],
  },
];
