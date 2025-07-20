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
            <ul>
                {armorData.map(armor =>
                    <li key={armor.name}>
                        {armor.name} – AC: {armor.ac}, DT: {armor.dt}, {armor.description}
                    </li>
                )}
            </ul>
            <h2>Power Armor</h2>
            <ul>
                {powerArmorData.map(armor =>
                    <li key={armor.name}>
                        {armor.name} – AC: {armor.ac}, DP: {armor.dp}, {armor.description}
                    </li>
                )}
            </ul>
        </div>
    )
}
