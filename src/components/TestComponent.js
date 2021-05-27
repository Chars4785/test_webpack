import React, { useState } from 'react';


export default function TestComponent(){
    const [ value, setValue] = useState(0)

    return(
        <div>
            {value}!!!!!
        </div>
    )
}