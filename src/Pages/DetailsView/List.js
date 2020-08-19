import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import config from '../../config'
import ListCard from './ListCard'
import './List.css'

const List = () => {
  
    const locations = useLocation();
    const typeid = locations.state.id; 
    const [pointsofinterest, setPointsofinterest] = useState([])

    const getPointsofinterest = async () => {
        const res = await fetch(`${config.baseUrl}/pointsofinterest/${typeid}`);
        const data = await res.json();
        // console.log(data)
        return data
    }
    // getPointsofinterest()
    useEffect(() => {
        (async () => {
            const data = await getPointsofinterest()
            // console.log(data)
            setPointsofinterest(data.pointsofinterest)
        })();
    }, [])

    // console.log(pointsofinterest)

    return (
        <div className="list-container">
            {pointsofinterest.map((point) => (
                <ListCard key={point.id} point={point}/>
            ))}
        </div>
    )
}

export default List; 