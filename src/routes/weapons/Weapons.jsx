import React, { useEffect, useState } from 'react'

export default function Weapons() {
    const [weaponsData, setWeaponsData] = useState([])

    async function getWeaponsData() {
        try {
            const res = await fetch()
            const data = res.json
            setWeaponsData(data)
            console.log('retrieved weapons data')
        } catch(error) {
            console.log('some issues occured when trying to get weapons data', error)
        }
    }

    useEffect( () => {
        getWeaponsData()
    }, [])

    return (
        <div>
            
        </div>
    )
}
