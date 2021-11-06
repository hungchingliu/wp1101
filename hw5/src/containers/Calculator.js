import Wrapper from "../components/Wrapper";
import Screen from "../components/Screen";
import ButtonBox from "../components/ButtonBox";
import Button from "../components/Button";
import React, {useState} from "react";
const Calculator = () => {
    const buttonValues = [
        [["C", "control"], ["+/-", "control"], ["%", "control"], ["÷", "operator"]],
        [[7, "number"], [8, "number"], [9, "number"], ["×", "operator"]],
        [[4, "number"], [5, "number"], [6, "number"], ["-", "operator"]],
        [[1, "number"], [2, "number"], [3, "number"], ["+", "operator"]],
        [[0, "zero"], [".", "point"], ["=", "equal"]],
    ]

    const [screenString, updateScreenString] = useState("0")
    const [operator, updateOperator] = useState("")
    const [reg, updateReg] = useState(0)
    const [mode, updateMode] = useState("init")
    const [count, updateCount] = useState(false)

    const onClickNumber = (e) => {
        e.preventDefault()
        const str = String(e.target.innerHTML)
        if(mode === "init"){
            const number = parseFloat(str)
            if(!isNaN(number)){
                updateScreenString(screenString => number)
            }
            updateMode("inputNumber")
        }
        else{
            const number = parseFloat(screenString + str)
            if(!isNaN(number)){
                updateScreenString(screenString => number)
            }
        }
    }

    const onClickPlus = () => {
        var number
        if((mode === "inputNumber" || mode === "inputDecimal") && operator !== ""){
            number = evaluate()
        }
        else{
            number = parseFloat(screenString)
        }
        updateOperator(operator => "+")
        updateReg(reg => number)
        updateMode("init")
        
    }

    const onClickMultiply = () => {
        
        var number
        if((mode === "inputNumber" || mode === "inputDecimal") && operator !== ""){
            number = evaluate()
        }
        else{
            number = parseFloat(screenString)
        }
        updateOperator(operator => "×")
        updateReg(reg => number)
        updateMode("init")
    
    }

    const onClickMinus =  () => {
       

        var number
        if((mode === "inputNumber" || mode === "inputDecimal") && operator !== ""){
            number = evaluate()
        }
        else{
            number = parseFloat(screenString)
        }
        updateOperator(operator => "-")
        updateReg(reg => number)
        updateMode("init")
        
    }

    const onClickDivision = () => {
        


        var number
        if((mode === "inputNumber" || mode === "inputDecimal") && operator !== ""){
            number = evaluate()
        }
        else{
            number = parseFloat(screenString)
        }
        updateOperator(operator => "÷")
        updateReg(reg => number)
        updateMode("init")
        
    }

    const onClickPoint = (e) =>{
        
        if(mode === "init"){    
            updateScreenString("0.")
            updateMode("inputDecimal")
        }
        else if (mode === "inputNumber"){
            updateScreenString(screenString => screenString + ".")
            updateMode("inputDecimal")
        }
        return
    }
    const onClickEqual = () => {
        
        evaluate()
        updateOperator("")
        updateMode("init")
    }

    const evaluate = () =>{
        var number1 = reg
        var number2 = parseFloat(screenString)
        
        console.log(String(number1) + operator + String(number2))
        switch(operator){
            case "+":
                number1 += number2
                break;
            case "-":
                number1 -= number2
                break;
            case "×":
                number1 *= number2
                break;
            case "÷":
                number1 /= number2
                break;
            default:
                number1 = number2
                break;
        }
        if(isNaN(number1))
            updateScreenString(screenString => number1.toString)
        else
            updateScreenString(screenStrig => number1.toFixed(3))
        
        return number1
    }

    const onClickClear = () => {
        updateScreenString("0")
        updateReg(0)
        updateOperator("")
        updateMode("init")
    }

    const onClickPlusMinus = () => {
        var number = parseFloat(screenString)
        number *= -1
        updateScreenString(screenString => number)
            
    }

    const onClickPercent = () =>{
        var number = parseFloat(screenString)
        number *= 0.01
        updateScreenString(screenString => number.toFixed(3))
    }
    return (
        <Wrapper>
            <Screen value={screenString} />
            <ButtonBox>
                {
                    buttonValues.flat().map((button, i) => {
                        return (
                            <Button key={i}
                            className={button[1]}
                            value={button[0]}
                            onClick={button[1] === "number"?onClickNumber:
                                     button[1] === "zero"?onClickNumber:
                                     button[1] === "point"?onClickPoint:
                                     button[1] === "equal"?onClickEqual:
                                     button[0] === "+/-"?onClickPlusMinus:
                                     button[0] === "%"?onClickPercent:
                                     button[0] === "C"?onClickClear:
                                     button[0] === "+"?onClickPlus:
                                     button[0] === "-"?onClickMinus:
                                     button[0] === "×"?onClickMultiply:
                                     button[0] === "÷"?onClickDivision:""}
                            />
                        )
                    })
                }
            </ButtonBox>
        </Wrapper>
    )
}

export default Calculator;