import './App.css';
import { useState } from 'react';

function App() {
    const [inputValue, setInputValue] = useState(0);
    const [firstNumber, setFirstNumber] = useState(0);
    const [theOperator, setTheOperator] = useState("");
    const [lastEqual, setLastEqual] = useState(false);

    function Button({ value, buttonClass, onButtonClick }) {
        return (
            <button className={buttonClass} onClick={onButtonClick}>{value}</button>
        )
    }
    function InputArea() {
        return (
            <div className="inputArea">{inputValue}</div>
        );
    }

    function handleDigitClick(digit) {
        if(lastEqual || inputValue === 0) {
            setInputValue(digit);
        } else {
            setInputValue(inputValue + digit.toString());
        }
        setLastEqual(false);
    }
    function handleOperatorClick(operator) {
        let result;
        if(theOperator !== "") {
            result = completeOperation();
            setFirstNumber(result);
            setInputValue(0);
            setTheOperator(operator);
            setLastEqual(true);
        }
        if(firstNumber === 0) {
            setFirstNumber(Number(inputValue));
            setTheOperator(operator);
            setInputValue(0);
        }
        setLastEqual(false);
    }
    function handleEqual() {
        if(theOperator !== "") {
            completeOperation();
        }
        setFirstNumber(0);
        setTheOperator("");
        setLastEqual(true);
    }
    function completeOperation() {
        let result;
        switch(theOperator) {
            case "+":
                result = firstNumber + inputValue;
                break;
            case "-":
                result = firstNumber - inputValue;
                break;
            case "*":
                result = firstNumber * inputValue;
                break;
            case "/":
                // TODO : Create an error state for division by zero
                if(inputValue === 0) {
                    alert("You can't divide by 0.");
                    return;
                }
                result = firstNumber / inputValue;
                break;
            default:
                break;
        }
        setInputValue(result);
        return result;
    }

    function handleClear() {
        setFirstNumber(0);
        setInputValue(0);
        setLastEqual(false);
        setTheOperator("");
    }

    return (
    <div className="app">
        <h1>Calculator</h1>
        <InputArea />
        <div className="buttonRow">
            <Button value="7" buttonClass="regular" onButtonClick={() => handleDigitClick(7)} />
            <Button value="8" buttonClass="regular" onButtonClick={() => handleDigitClick(8)} />
            <Button value="9" buttonClass="regular" onButtonClick={() => handleDigitClick(9)} />
            <Button value="+" buttonClass="operator" onButtonClick={() => handleOperatorClick("+")} />
        </div>
        <div className="buttonRow">
            <Button value="4" buttonClass="regular" onButtonClick={() => handleDigitClick(4)} />
            <Button value="5" buttonClass="regular" onButtonClick={() => handleDigitClick(5)} />
            <Button value="6" buttonClass="regular" onButtonClick={() => handleDigitClick(6)} />
            <Button value="-" buttonClass="operator" onButtonClick={() => handleOperatorClick("-")} />
        </div>
        <div className="buttonRow">
            <Button value="1" buttonClass="regular" onButtonClick={() => handleDigitClick(1)} />
            <Button value="2" buttonClass="regular" onButtonClick={() => handleDigitClick(2)} />
            <Button value="3" buttonClass="regular" onButtonClick={() => handleDigitClick(3)} />
            <Button value="*" buttonClass="operator" onButtonClick={() => handleOperatorClick("*")} />
        </div>
        <div className="buttonRow">
            <Button value="0" buttonClass="regular" onButtonClick={() => handleDigitClick(0)} />
            <Button value="C" buttonClass="special" onButtonClick={handleClear} />
            <Button value="=" buttonClass="equal" onButtonClick={handleEqual} />
            <Button value="/" buttonClass="operator" onButtonClick={() => handleOperatorClick("/")} />
        </div>
    </div>
  );
}

export default App;
