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
        [[0, "zero"], [".", "number"], ["=", "equal"]],
    ]

    const [screenString, updateScreenString] = useState("0")
    const [operator, updateOperator] = useState("")
    const [reg, updateReg] = useState(0)
    const [mode, updateMode] = useState("init")

    const onClickNumber = (e) => {
        e.preventDefault()
        const str = String(e.target.innerHTML)
        if(mode === "init"){
            updateScreenString(screenString => str)
            updateMode(mode => "inputNumber")
        }
        else{
            updateScreenString(screenString => screenString + str)
        }
    }

    const onClickPlus = () => {
        updateOperator(operator => "+")
        const number = parseInt(screenString, 10)
        updateReg(reg => number)
        updateMode(mode => "init")
    }

    const onClickMultiply = () => {
        updateOperator(operator => "×")
        const number = parseInt(screenString, 10)
        updateReg(reg => number)
        updateMode(mode => "init")
    }

    const onClickMinus =  () => {
        updateOperator(operator => "-")
        const number = parseInt(screenString, 10)
        updateReg(reg => number)
        updateMode(mode => "init")
    }

    const onClickDivision = () => {
        updateOperator(operator => "÷")
        const number = parseInt(screenString, 10)
        updateReg(reg => number)
        updateMode(mode => "init")
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
                                     ""}
                            />
                        )
                    })
                }
            </ButtonBox>
        </Wrapper>
    )
}

export default Calculator;