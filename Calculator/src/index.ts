"use strict";

import CalculatorBrain from "./CalculatorBrain";

import CalculatorUi from "./CalculatorUi";
 
// === MAIN ===

let calculatorUis: CalculatorUi[] = [];

let calculatorCount: number = -1;

let contentDiv: HTMLDivElement = document.createElement("div");
contentDiv.className = "content";
document.body.prepend(contentDiv);

function addNewCalculator(): void{
    calculatorCount++;

    let ui : CalculatorUi = new CalculatorUi(new CalculatorBrain(), calculatorCount);

    calculatorUis.push(ui);


}

function removeCalculator(): void{
    if (calculatorCount < 0 ) return;
    let calculator: HTMLDivElement = contentDiv.querySelector(".js-calculator-" + calculatorCount)!;
    if (calculator !== null) {
        calculator.remove();
    }
    calculatorCount--;

    calculatorUis.pop();
}


function addDynamicButtons(): void{
    let buttonAdd: HTMLButtonElement = document.createElement("button");
    buttonAdd.textContent = "Add Calculator";
    buttonAdd.onclick = function(){
        addNewCalculator();
    }
    contentDiv.appendChild(buttonAdd);


    let buttonRemove = document.createElement("button");
    buttonRemove.textContent = "Remove Calculator";
    buttonRemove.onclick = function(){
        removeCalculator();
    }
    buttonAdd.after(buttonRemove);

}

addDynamicButtons();