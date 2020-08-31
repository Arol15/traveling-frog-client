import React from 'react';
import {useHistory} from 'react-router-dom';
import '../Dashboard/CollectionCard.css'


const CollectionCard = ({collection: {type}, collection: {id}, collection: {image}}) => {

    // const onClick = (e) => {
    //     console.log(e.target.value)

    // }
    // console.log(props)
    let history = useHistory()
    const redirectToPlaces = () => {
        history.push(`/types/${id}`, {id})
      }

    return (
        <div onClick={redirectToPlaces} className='card-container'> 
            <div className="card-container-img">
                <img src={image} alt='park'></img>
            </div>
            <div className='card-title'>
                {type} 
            </div>
        </div>
    )
}

export default CollectionCard; 