import React from 'react'
import './Armor.css'

import { useState, useEffect } from 'react'

export default function Armor() {
    const [powerArmorData, setPowerArmorData] = useState([])
    const [armorData, setArmorData] = useState([])

    const getPowerArmorData = async () => {
        try {
            var res = await fetch('http://localhost:3000/power_armor')
            const data = await res.json()
            setPowerArmorData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getArmorData = async () => {
        try {
            var res = await fetch('http://localhost:3000/armor')
            const data = await res.json()
            setArmorData(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getArmorData()
        getPowerArmorData()
    }, [])

    

    return (
        <div style={{margin: '10rem 0 0 0'}}>
            <h2>Armor</h2>
            <ul style={{padding: '0'}}>
                {armorData.map(armor =>
                    <li onClick={() => window.location.href = `/armor/${armor.name}`} style={{cursor: 'pointer', listStyleType: 'none'}} key={armor.name}>
                        {armor.name}
                    </li>
                )}
            </ul>
            <h2>Power Armor</h2>
            <ul style={{padding: '0'}}>
                {powerArmorData.map(armor =>
                    <li onClick={() => window.location.href = `/power_armor/${armor.name}`} style={{cursor: 'pointer', listStyleType: 'none'}} key={armor.name}>
                        {armor.name}
                    </li>
                )}
            </ul>
        </div>
    )
}
