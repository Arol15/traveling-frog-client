import React from 'react';


const CollectionCard = ({collection: {type}, collection: {id}}) => {

    return (
        <div className='card-container'> 
            <div>
                Here is a background image
            </div>
            <div>
                {type} 
            </div>
            <div>
                {id}
            </div>


        </div>
    )
}

export default CollectionCard; 