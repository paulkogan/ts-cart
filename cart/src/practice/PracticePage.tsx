import React, {useState, useRef} from 'react';

interface Props {
    label: string;
    children: string[]
}

const PracticePage:React.FC <Props> = ({label, children}) => {

    const [clickCount, setClickCount] = useState(0)
    const [disp, setDisp] = useState("got passed: "+label)

    const elRef = useRef<any>()
    

    const handleClick = () => {
        elRef.current = clickCount
        setClickCount(clickCount+1)

    }
    
    return (
        <div>
            <div>This is a Practice Page</div>
            <div>{disp} </div>
            <div id="ozy" > {children}</div>
            <div>Clickcount: {clickCount}</div>
            <div>elRef  {elRef.current} </div>

            {/* <button id="plus"  onClick = {() => setClickCount(clickCount => clickCount + 1)}> CLICK </button> */}
            <button id="plus"  onClick = {() => setClickCount(clickCount+1)}> CLICK </button>

        </div>
    )
}

export default PracticePage