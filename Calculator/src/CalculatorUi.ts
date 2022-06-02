import CalculatorBrain from "./CalculatorBrain";

interface Actions {
    id: string,
    value: number
}

export default class CalculatorUi{

    private listWithId: string[] = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "add", "minus", "multiply", "divide", "dot", "equal", "C", "X", "+-"]

    private dictionary: Actions[] = [];

    private avoidOperators: boolean = false;

    private isLashCharIsNum: boolean = false;

    private isDotPossible: boolean = false;

    constructor(private calc: CalculatorBrain, private calcNo: number){
        
        this.initializeActions();

        this.initializeField();

        for (const elem of this.dictionary) {

            let querySelector = document.querySelector(`.js-calculator-${this.calcNo} [data-value='${elem.id}']`);
            
            if (this.isDivElem(querySelector)) {

                let queryElem: HTMLDivElement = querySelector;
                querySelector.addEventListener("click", () => {
                    for (const elem of this.dictionary) {
                        if (queryElem.dataset.value === elem.id) {
                            this.action(elem.value)
                        }
                    }  
                });
            }

        }

    }
    
    dataBinding(id: number): void{
        let elementButtons: Element | null = document.querySelector(`.js-calculator-${this.calcNo} [data-value='${this.dictionary[id].id}']`)!;
        let elementShow: Element | null = document.querySelector(`.js-calculator-${this.calcNo} [data-value='calculation']`);
        
        if(this.isHTMLButtonElement(elementButtons)){

            if(id > 9 && id < 14)
            {
                if (!this.isLashCharIsNum) {
                    return;
                }
                this.calc.mathExpression += " " + elementButtons.value + " ";
                this.isLashCharIsNum = false;
            }
            else
            {
                if (id === 14 && !this.isDotPossible) {
                    return;
                }
                
                if (id === 14 && this.isDotPossible) {
                    this.isDotPossible = false;
                }

                this.calc.mathExpression += elementButtons.value;
                this.isLashCharIsNum = true;
                this.isDotPossible = true;
    
            }
            
        }

        if (this.isDivElem(elementShow)) {
            elementShow.innerHTML = this.calc.mathExpression;
        }

    }

    initializeActions(): void{
        for (let index = 0; index < this.listWithId.length; index++) {
            let obj: Actions = {
                id : this.listWithId[index],
                value : index
            };
            this.dictionary.push(obj);
            
        }
    }

    initializeField(): void{
        let calculatorDiv: HTMLDivElement = document.createElement("div");
        calculatorDiv.className = "js-calculator-" + this.calcNo;

        let calculatorHtml: string = `<div class="container" >
        <div class="row calculator-${this.calcNo}">
            <div class="col-lg-12 nopadding">
                <div data-value="calculation" class="form-control"></div>
            </div>
        </div>
        <div class="row calculator-${this.calcNo}">
            <div class="col-lg-4 nopadding">
            <button data-value="C" class="btn btn-success btn-block extraButtons">AC</button>
            </div>
            <div class="col-lg-4 nopadding">
            <button data-value="+-" class="btn btn-success btn-block extraButtons">+-</button>
            </div>  
            <div class="col-lg-4 nopadding">
            <button data-value="X" class="btn btn-success btn-block extraButtons">X</button>
            </div>     
        </div>
        <div class="row calculator-${this.calcNo}">
            <div class="col-xs-3 nopadding">
                <button data-value="one" class="btn btn-primary btn-block btn_font" value="1">1</button>
            </div>
            <div class="col-xs-3 nopadding">
                <button data-value="two" class="btn btn-primary btn-block btn_font" value="2">2</button>
            </div>
            <div class="col-xs-3 nopadding">
                <button data-value="three" class="btn btn-primary btn-block btn_font" value="3">3</button>
            </div>
            <div class="col-xs-3 nopadding">
                <button data-value="add" class="btn btn-success btn-block btn_font" value="+">+</button>
            </div>
        </div>
            <div class="row calculator-${this.calcNo}">
                <div class="col-xs-3 nopadding">
                    <button data-value="four" class="btn btn-primary btn-block btn_font" value="4">4</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="five" class="btn btn-primary btn-block btn_font" value="5">5</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="six" class="btn btn-primary btn-block btn_font" value="6">6</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="minus" class="btn btn-success btn-block btn_font" value="-">-</button>
                </div>
            </div>
            <div class="row calculator-${this.calcNo}">
                <div class="col-xs-3 nopadding">
                    <button data-value="seven" class="btn btn-primary btn-block btn_font" value="7">7</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="eight" class="btn btn-primary btn-block btn_font" value="8">8</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="nine" class="btn btn-primary btn-block btn_font" value="9">9</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="multiply" class="btn btn-success btn-block btn_font" value="*">*</button>
                </div>
            </div>
            <div class="row calculator-${this.calcNo}">
                <div class="col-xs-3 nopadding">
                    <button data-value="dot" class="btn btn-primary btn-block btn_font" value=".">.</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="zero" class="btn btn-primary btn-block btn_font" value="0">0</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="equal" class="btn btn-primary btn-block btn_font" value="=">=</button>
                </div>
                <div class="col-xs-3 nopadding">
                    <button data-value="divide" class="btn btn-success btn-block btn_font" value="/">/</button>
                </div>
            </div>
    </div>
    <hr>`;

        calculatorDiv.innerHTML = calculatorHtml;

        let content: HTMLDivElement = document.querySelector(`.content`)!;
        content.appendChild(calculatorDiv);
    }

    action(id: number): void{
        let elem: Element | null = document.querySelector(`.js-calculator-${this.calcNo} [data-value='calculation']`);
        if (elem instanceof HTMLDivElement) {
            if ((id > 9 && id < 16 && this.avoidOperators)) {
                console.log('hi')
                return;
            }

            if (id <= 9) {
                this.avoidOperators = false;
                this.isDotPossible = true;
            }
            
            if (id < 15) {
                this.dataBinding(id)
            }

            switch (id) {
                case 15:
                    let result: number = this.calc.evaluate(this.calc.mathExpression);
                    this.calc.mathExpression = result.toString();
                    
                    elem.innerHTML = result.toString();
                    break;
                case 16:
                    elem.innerHTML = "";
                    this.calc.mathExpression = "";
                    break;
                case 17:
                    if(this.calc.mathExpression.charAt(this.calc.mathExpression.length - 3) === " ")
                    {
                        this.calc.mathExpression = this.calc.mathExpression.slice(0, this.calc.mathExpression.length - 3);
                    }
                    else
                    {
                        this.calc.mathExpression = this.calc.mathExpression.slice(0, this.calc.mathExpression.length - 1);
                    }
                    elem.innerHTML = this.calc.mathExpression;
                    break;
                case 18:
                    if (this.isLashCharIsNum) {
                        return;
                    }
                    //this.isDotPossible = true;
                    this.calc.mathExpression += "-";
                    this.avoidOperators = true
                    this.dataBinding(id);
                    break;
                default:
                    break;
            }
        }
    }

    isHTMLButtonElement(elem: Element | null): elem is HTMLButtonElement {
        return (elem as HTMLButtonElement).value !== undefined;
    }

    isDivElem(elem: Element | null): elem is HTMLDivElement{
        return (elem as HTMLDivElement).dataset.value !== undefined;
    }
}