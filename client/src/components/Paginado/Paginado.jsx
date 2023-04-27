import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ presentarPaises, paises, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(paises / presentarPaises); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <a
              href={`#${number}`}
              key={number}
              className={style.numeroStyle}
              onClick={() => paginado(number)}
            >
              {number}
            </a>
          ))}
      </ul>
    </nav>
  );
}
