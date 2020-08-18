import React from 'react';
import {useHistory} from 'react-router-dom';
import '../Dashboard/CollectionCard.css'


const CollectionCard = ({collection: {type}, collection: {id}}) => {

    // const onClick = (e) => {
    //     console.log(e.target.value)

    // }
    let history = useHistory()
    const redirectToPlaces = () => {
        history.push('/types')
      }

    return (
        <div onClick={redirectToPlaces} className='card-container'> 
            <div className="card-container-img">
                <img src="https://i.pinimg.com/originals/6f/cd/66/6fcd66a405936566e17938daf8c82cb1.jpg" alt='park'></img>
            </div>
            <div>
                {type} 
            </div>
        </div>
    )
}

export default CollectionCard; 