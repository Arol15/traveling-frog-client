import React from 'react';
import './ListCard.css'

const ListCard = ({point}) => {
    console.log(point)
    return (
        <div className='listcard-container'> 
            <div>
                {point.title}
            </div>
            <div> 
                {point.state}
            </div>
        </div>
    )
}

export default ListCard