import { useEffect, useRef } from "react";
import { ClassFigureProps } from "src/lib/declarations/interfaces";
import { nullishFig } from "src/lib/declarations/types";

export default function ClassFigure(props: ClassFigureProps) {
  const mainRef = useRef<nullishFig>(null);
  useEffect(() => {}, []);
  return (
    <figure
      className={`classPanelFigure classPanelFigure${props.idf}`}
      id={`fig-${props.idf}-count`}
      ref={mainRef}
    >
      <img
        src={`${props.imgSrc}`}
        alt={`${props.idf}`}
        loading="lazy"
        id={`img${props.idf}-count`}
        className={`classPanelImg classPanelImg${props.idf}`}
      />
      <figcaption className={`classPanelCapt classPanelCapt${props.idf}`}>
        {props.caption ? props.caption : <span>TEXTO</span>}
      </figcaption>
    </figure>
  );
}
