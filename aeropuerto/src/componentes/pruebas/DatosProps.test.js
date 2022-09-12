import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Datos from "../seccion_general/Datos";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renderiza temperatura, ciudad y clima",() => {

    act(() => {
        render(<Datos 
                temperatura="20"
                ciudad="Sinaloa"
                clima="Soleado"
                />, container);
    });
    expect(container.querySelector("h1").textContent).toBe("20");
    expect(container.querySelector("h2").textContent).toBe("Sinaloa");
    expect(container.querySelector("div.clima p").textContent).toBe("Soleado");
});
