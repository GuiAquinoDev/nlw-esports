import { CaretLeft, CaretRight } from "phosphor-react";

interface ArrowProps {
  left?: boolean;
  onClick: (e: any) => void;
}

export function Arrow(props: ArrowProps) {
  return (
    <div className="px-8">
      {props.left && (
        <div>
          <CaretLeft
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
            fontSize={48}
            color="#a1a1aa"
          />
        </div>
      )}

      {!props.left && (
        <div>
          <CaretRight
            onClick={props.onClick}
            className={`arrow ${
              props.left ? "arrow--left" : "arrow--right"
            }`}
            fontSize={48}
            color="#a1a1aa"
          />
        </div>
      )}
    </div>
  );
}
