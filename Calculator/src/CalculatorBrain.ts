export default class CalculatorBrain{

    public mathExpression: string = "";

    evaluate(expression: string): number
    {
        //expression = expression.slice(0, expression.length - 1);
        let tokens: string[] = expression.split(' ');

        // Stack for numbers: 'values'
        let values: number[] = [];

        // Stack for Operators: 'ops'
        let ops: string[] = [];

        for (let i = 0; i < tokens.length; i++)
        {
            // Current token is a whitespace, skip it
            if (tokens[i] == ' ')
            {
                continue;
            }

            let isNegative: boolean = false;
            if (tokens[i].includes("-") && tokens[i].match(/[0-9]/)) {
                tokens[i] = tokens[i].substring(1, tokens[i].length);
                isNegative = true;
            }
            // Current token is a number,
            // push it to stack for numbers

            if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                //console.log(element)
                let sbuf: string = "";
                //sbuf = sbuf + element;
                
                // There may be more than
                // one digits in number
                while (i < tokens.length &&
                    tokens[i] >= '0' &&
                    tokens[i] <= '9')
                {
                    if (isNegative) {
                        sbuf = sbuf + -tokens[i++];
                    }
                    else{
                        sbuf = sbuf + tokens[i++];
                    }
                    
                }
                //values.push(parseFloat(sbuf, 10));
                values.push(parseFloat(sbuf));
                
                // Right now the i points to
                // the character next to the digit,
                // since the for loop also increases
                // the i, we would skip one
                //  token position; we need to
                // decrease the value of i by 1 to
                // correct the offset.
                i--;
            }

            // Current token is an operator.
            else if (tokens[i] == '+' ||
                    tokens[i] == '-' ||
                    tokens[i] == '*' ||
                    tokens[i] == '/')
            {
                
                // While top of 'ops' has same
                // or greater precedence to current
                // token, which is an operator.
                // Apply operator on top of 'ops'
                // to top two elements in values stack
                while (ops.length > 0 &&
                    this.hasPrecedence(tokens[i],
                                    ops[ops.length - 1]))
                {
                values.push(this.applyOp(ops.pop()!, values.pop()!, values.pop()!));
                }

                // Push current token to 'ops'.
                ops.push(tokens[i]);
            }
        }

        //console.log(values)
        // Entire expression has been
        // parsed at this point, apply remaining
        // ops to remaining values
        while (ops.length > 0)
        {
            values.push(this.applyOp(ops.pop()!,
                            values.pop()!,
                            values.pop()!));
        }
        
        //console.log(values)
        // Top of 'values' contains
        // result, return it
        return values.pop()!;
    }

    hasPrecedence(op1: string, op2: string): boolean
    {
        if ((op1 == '*' || op1 == '/') &&
            (op2 == '+' || op2 == '-'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    applyOp(op: string, b: number, a: number): number
    {
        switch (op)
        {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0)
            {
                document.write("Cannot divide by zero");
            }
            return a / b;
        }
        return 0;
    }


}