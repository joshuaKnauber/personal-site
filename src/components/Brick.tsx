export type BrickColor = "red" | "blue" | "yellow" | "white";

type BrickProps = {
  column: number | [number, number];
  row: number | [number, number];
  color: BrickColor;
};

const colorMap = {
  red: { brick: "#ED1B24", dark: "#C5212A" },
  yellow: { brick: "#FFD95E", dark: "#FCC048" },
  blue: { brick: "#006FB9", dark: "#075080" },
  white: { brick: "#FDEFE2", dark: "#F2E2D2" },
};

export function Brick(props: BrickProps) {
  const vertical = Array.isArray(props.row)
    ? props.row[1] - props.row[0] + 1
    : 1;
  const horizontal = Array.isArray(props.column)
    ? props.column[1] - props.column[0] + 1
    : 1;
  const amount = vertical * horizontal;

  return (
    <div
      className="w-full h-full grid place-items-center"
      style={{
        gridColumn: Array.isArray(props.column)
          ? `${props.column[0]} / ${props.column[1] + 1}`
          : props.column,
        gridRow: Array.isArray(props.row)
          ? `${props.row[0]} / ${props.row[1] + 1}`
          : props.row,
        gridTemplateColumns: `repeat(${horizontal}, 1fr)`,
        gridTemplateRows: `repeat(${vertical}, 1fr)`,
        backgroundColor: colorMap[props.color].brick,
        boxShadow:
          "inset 0px 0px 0px .05rem #000000, 0px 0px 0px .05rem #000000",
      }}
    >
      {Array.from({ length: amount }).map((_, index) => (
        <div
          key={index}
          className="rounded-full shrink size-4"
          style={{
            boxShadow: "inset 0px 0px 0px .1rem #020303",
            backgroundColor: colorMap[props.color].dark,
          }}
        />
      ))}
    </div>
  );
}
