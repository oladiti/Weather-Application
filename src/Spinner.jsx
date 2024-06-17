
import React from 'react'

function Spinner() {
    return (
        <div className='flex justify-center items-center'>
            <div className='loader ease-linear rounded-full border-4 border-t-4 border-red-500 h-14 w-14' ></div>
        </div>
    )
}

export default Spinner