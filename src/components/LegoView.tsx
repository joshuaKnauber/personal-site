import { useEffect, useMemo, useState } from "react";
import { Brick } from "./Brick";
import type { BrickDef, HoleDef } from "./legoConfig";
import { legoConfig } from "./legoConfig";

// [width, height] in grid cells
const BRICK_SIZES: [number, number][] = [
  [4, 2],
  [2, 4],
  [2, 2],
  [2, 1],
  [1, 2],
  [1, 1],
];

function cellHash(seed: number, col: number, row: number): number {
  let h = seed;
  h = Math.imul(h ^ col, 0x9e3779b9);
  h = Math.imul(h ^ row, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return h >>> 0;
}

function buildOccupied(bricks: BrickDef[]): Set<string> {
  const set = new Set<string>();
  for (const brick of bricks) {
    const c0 = Array.isArray(brick.column) ? brick.column[0] : brick.column;
    const c1 = Array.isArray(brick.column) ? brick.column[1] : brick.column;
    const r0 = Array.isArray(brick.row) ? brick.row[0] : brick.row;
    const r1 = Array.isArray(brick.row) ? brick.row[1] : brick.row;
    for (let c = c0; c <= c1; c++) {
      for (let r = r0; r <= r1; r++) {
        set.add(`${c},${r}`);
      }
    }
  }
  return set;
}

// Smooth 1D noise: interpolates between hash values so the boundary flows
// in gentle waves rather than jumping cell-by-cell
function smoothNoise(seed: number, pos: number, scale: number): number {
  const i = Math.floor(pos / scale);
  const f = pos / scale - i;
  const t = f * f * (3 - 2 * f); // smoothstep
  const v0 = (cellHash(seed, i, 0) >>> 0) / 4294967296;
  const v1 = (cellHash(seed, i + 1, 0) >>> 0) / 4294967296;
  return v0 + (v1 - v0) * t;
}

function applyHoles(
  blocked: Set<string>,
  holes: HoleDef[],
  seed: number,
): void {
  for (const hole of holes) {
    const roughness = hole.roughness ?? 0;
    const [c0, c1] = hole.column;
    const [r0, r1] = hole.row;

    // Wave scale: ~1 wave per 5 cells gives a natural organic feel
    const waveScale = 5;

    for (let c = c0; c <= c1; c++) {
      for (let r = r0; r <= r1; r++) {
        let inHole: boolean;

        if (roughness === 0) {
          inHole = true;
        } else {
          // Each edge gets a smooth offset that varies along its length.
          // Offsets are 0–roughness, pushing the edge inward.
          const leftEdge =
            c0 + smoothNoise(seed ^ 0x1234, r, waveScale) * roughness;
          const rightEdge =
            c1 - smoothNoise(seed ^ 0x5678, r, waveScale) * roughness;
          const topEdge =
            r0 + smoothNoise(seed ^ 0x9abc, c, waveScale) * roughness;
          const botEdge =
            r1 - smoothNoise(seed ^ 0xdef0, c, waveScale) * roughness;
          inHole =
            c >= leftEdge && c <= rightEdge && r >= topEdge && r <= botEdge;
        }

        if (inHole) blocked.add(`${c},${r}`);
      }
    }
  }
}

function canPlace(
  col: number,
  row: number,
  w: number,
  h: number,
  columns: number,
  rows: number,
  blocked: Set<string>,
): boolean {
  if (col + w - 1 > columns || row + h - 1 > rows) return false;
  for (let c = col; c < col + w; c++) {
    for (let r = row; r < row + h; r++) {
      if (blocked.has(`${c},${r}`)) return false;
    }
  }
  return true;
}

export function LegoView() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { rows, columns } = useMemo(() => {
    return {
      rows: Math.ceil(windowSize.height / 24),
      columns: Math.ceil(windowSize.width / 24),
    };
  }, [windowSize]);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { fillBricks, explicitBricks } = useMemo(() => {
    const bp =
      [...legoConfig].reverse().find((b) => windowSize.width >= b.minWidth) ??
      legoConfig[0];

    const bricks: BrickDef[] = bp.bricks ?? [];
    const holes: HoleDef[] = bp.holes ?? [];

    // Cells unavailable for fill: explicit bricks + holes (with roughness)
    const blocked = buildOccupied(bricks);
    applyHoles(blocked, holes, bp.seed);

    const fillBricks: BrickDef[] = [];

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        if (blocked.has(`${col},${row}`)) continue;

        // Use hash to pick preferred size, fall back through smaller until 1x1
        const sizeHash = cellHash(bp.seed, col, row);
        const colorHash = cellHash(bp.seed ^ 0xdeadbeef, col, row);
        const startIdx = sizeHash % BRICK_SIZES.length;

        for (let i = 0; i < BRICK_SIZES.length; i++) {
          const [w, h] = BRICK_SIZES[(startIdx + i) % BRICK_SIZES.length];
          if (canPlace(col, row, w, h, columns, rows, blocked)) {
            const color = bp.palette[colorHash % bp.palette.length];
            const colProp =
              w === 1 ? col : ([col, col + w - 1] as [number, number]);
            const rowProp =
              h === 1 ? row : ([row, row + h - 1] as [number, number]);
            fillBricks.push({ column: colProp, row: rowProp, color });

            // Mark all cells of this brick as occupied
            for (let c = col; c < col + w; c++) {
              for (let r = row; r < row + h; r++) {
                blocked.add(`${c},${r}`);
              }
            }
            break;
          }
        }
      }
    }

    return { fillBricks, explicitBricks: bricks };
  }, [windowSize, rows, columns]);

  return (
    <div
      className="grid w-full h-full gap-0"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {fillBricks.map((b, i) => (
        <Brick key={i} {...b} />
      ))}
      {explicitBricks.map((b, i) => (
        <Brick key={`explicit-${i}`} {...b} />
      ))}
    </div>
  );
}
