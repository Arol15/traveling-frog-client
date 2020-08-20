import React from 'react';
import {useHistory} from 'react-router-dom';
import './ListCard.css'

const ListCard = ({point}) => {
    // console.log(point)
    let history = useHistory()
    const redirectToForm = () => {
        history.push(`/pointofinterest/${point.id}`)
      }

    return (
        <div onClick={redirectToForm} className='listcard-container'> 
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