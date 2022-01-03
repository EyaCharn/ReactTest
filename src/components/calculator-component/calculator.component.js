import './calculator-component.css';
import {useState} from "react";

export const CalculatorComponent = () => {
    const [barns, setBarns] = useState(1);
    const [res, setRes] = useState(0);
    const [barnsTemp, setBarnsTemp] = useState([1]);
    const [preferredTemp, setPreferredTEmp] = useState([1]);
    const [difference, setDifference] = useState([0]);

    const handleBarnsChange = (val) => {
        val.preventDefault();
        const value = +val.target.value;
        setBarns(value);

        const currentTempInit = [];
        const preferredTempInit = [];
        const differenceInit = [];
        for (let i = 0; i < value; i++) {
            currentTempInit.push(barnsTemp[i] !== undefined ? barnsTemp[i] : 0);
            preferredTempInit.push(preferredTemp[i] !== undefined ? preferredTemp[i] : 0);
            differenceInit.push(0);
        }
        setBarnsTemp(currentTempInit);
        setPreferredTEmp(preferredTempInit);
        setDifference(differenceInit);
    }

    const handleBarnCurrentTempChange = (val, index) => {
        val.preventDefault();
        const value = +val.target.value;

        const newBarnsCurrentTemp = [...barnsTemp];
        newBarnsCurrentTemp[index] = value;
        setBarnsTemp(newBarnsCurrentTemp);

        const newDifference = [...difference];
        newDifference[index] = preferredTemp[index] - value;
        setDifference(newDifference);
    }

    const handleBarnPreferredTempChange = (val, index) => {
        val.preventDefault();
        const value = +val.target.value;

        const newBarnsPreferredTemp = [...preferredTemp];
        newBarnsPreferredTemp[index] = value;
        setPreferredTEmp(newBarnsPreferredTemp);

        const newDifference = [...difference];
        newDifference[index] = value - barnsTemp[index];
        setDifference(newDifference);
    }

    const calculateTemp = () => {
        let diffCopy = [...difference];
        let iterations = 0;

        while (diffCopy.length) {
            const lastDiff = diffCopy.length - 1;
            if (diffCopy[lastDiff] === 0) {
                diffCopy.splice(lastDiff, 1);
                continue;
            }

            const isPositive = diffCopy[lastDiff] > 0;
            let tChange = 1;

            while (tChange < diffCopy.length) {
                if (diffCopy[lastDiff - tChange] === 0) {
                    break;
                }

                if ((diffCopy[lastDiff - tChange] > 0) !== isPositive) {
                    break;
                }

                tChange++;
            }

            iterations++;

            for (let i = 0; i < tChange; i++) {
                diffCopy[lastDiff - i] = diffCopy[lastDiff - i] > 0 ? diffCopy[lastDiff - i] - 1 : diffCopy[lastDiff - i] + 1;
            }
        }

        setRes(iterations);
    }

    return (
        <div className={'calculator-component'}>
            <h1>Jhon's barns temperature</h1>
            <hr/>
            <div className={'calculator-form'}>
                <h2>How many barns? :</h2>

                <label htmlFor="barnsNumber">Banrs number: </label>
                <input id={'barnsNumber'} name={'barnsNumber'} value={barns} min={1} className={'barns-number-input'} onChange={handleBarnsChange}
                       placeholder={'Please enter number of barns ex: 5...'} type="number"/>

                <h2>What's the preferred temperature? : </h2>
                <div className={'barns-temperature'}>
                    {
                        preferredTemp.map((barnTemp, index) => (
                            <div className={'temp-input'} key={index}>
                                <label htmlFor={'temp-of-barn-' + index}>{'Barn ' + (index + 1) + ':'} </label>
                                <input id={'temp-of-barn-' + index} name={'temp-of-barn-' + index} value={barnTemp}
                                       onChange={(value) => {
                                           handleBarnPreferredTempChange(value, index);
                                       }} placeholder={'ex: 6'} type="number"/>
                            </div>
                        ))
                    }
                </div>

                <h2>What's the current temperature? : </h2>
                <div className={'barns-temperature'}>
                    {
                        barnsTemp.map((barnTemp, index) => (
                            <div className={'temp-input'} key={index}>
                                <label htmlFor={'temp-of-barn-' + index}>{'Barn ' + (index + 1) + ':'} </label>
                                <input id={'temp-of-barn-' + index} name={'temp-of-barn-' + index} value={barnTemp}
                                       onChange={(value) => {
                                           handleBarnCurrentTempChange(value, index);
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
