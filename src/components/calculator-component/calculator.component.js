import './calculator-component.css';
import {useState} from "react";

export const CalculatorComponent = () => {
    const [barns, setBarns] = useState(1);
    const [res, setRes] = useState(0);
    const [barnsTemp, setBarnsTemp] = useState([1]);
    const [desiredTemp, setDesiredTEmp] = useState([1]);

    const handleBarnsChange = (val) => {
        val.preventDefault();
        const value = +val.target.value;
        setBarns(value);

        const currentTempInit = [];
        const desiredTempInit = [];
        for (let i = 0; i < value; i++) {
            currentTempInit.push(barnsTemp[i] !== undefined ? barnsTemp[i] : 0);
            desiredTempInit.push(desiredTemp[i] !== undefined ? desiredTemp[i] : 0);
        }
        setBarnsTemp(currentTempInit);
        setDesiredTEmp(desiredTempInit);
    }

    const handleBarnCurrentTempChange = (val, index) => {
        val.preventDefault();
        const value = +val.target.value;

        const newBarnsCurrentTemp = [...barnsTemp];
        newBarnsCurrentTemp[index] = value;
        setBarnsTemp(newBarnsCurrentTemp)
    }

    const handleBarnDesiredTempChange = (val, index) => {
        val.preventDefault();
        const value = +val.target.value;

        const newBarnsDesiredTemp = [...desiredTemp];
        newBarnsDesiredTemp[index] = value;
        setDesiredTEmp(newBarnsDesiredTemp)
    }

    const calculateTemp = () => {
        const doneBarns = [];

        const checkDoneBarns = () => {
            barnsTemp.forEach((val1, index) => {
                desiredTemp.forEach((val2, index2) => {
                    if (val2 === val1) {
                        doneBarns.push(index2);
                    }
                });
            })
        };

        checkDoneBarns();
    }

    return (
        <div className={'calculator-component'}>
            <h1>Jhon's barns temperature</h1>
            <hr/>
            <div className={'calculator-form'}>
                <label htmlFor="barnsNumber">How many barns ?: </label>
                <input id={'barnsNumber'} name={'barnsNumber'} value={barns} min={1} onChange={handleBarnsChange} placeholder={'Please enter number of barns ex: 5...'} type="number"/>
                <h2>What's the current temperature? : </h2>
                <div className={'barns-temperature'}>
                    {
                        barnsTemp.map((barnTemp, index) => (
                            <div className={'temp-input'} key={index}>
                                <label htmlFor={'temp-of-barn-' + index}>{'Barn ' + (index + 1) + ':' } </label>
                                <input id={'temp-of-barn-' + index} name={'temp-of-barn-' + index} value={barnTemp} onChange={(value) => {
                                    handleBarnCurrentTempChange(value, index);
                                }} placeholder={'ex: 6'} type="number"/>
                            </div>
                        ))
                    }
                </div>

                <h2>What's the desired temperature? : </h2>
                <div className={'barns-temperature'}>
                    {
                        desiredTemp.map((barnTemp, index) => (
                            <div className={'temp-input'} key={index}>
                                <label htmlFor={'temp-of-barn-' + index}>{'Barn ' + (index + 1) + ':' } </label>
                                <input id={'temp-of-barn-' + index} name={'temp-of-barn-' + index} value={barnTemp} onChange={(value) => {
                                    handleBarnDesiredTempChange(value, index);
                                }} placeholder={'ex: 6'} type="number"/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className={'set-btn'} onClick={calculateTemp}>Set temperature</button>
            <div className={'result'}>
                <h2>Iterations number: </h2>
                <h1>{res}</h1>
            </div>

        </div>
    )
}
