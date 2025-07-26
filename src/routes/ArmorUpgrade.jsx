import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import './ArmorUpgrade.css'

export default function ArmorUpgrade() {
    const { upgradeId } = useParams()
    const [upgrade, setUpgrade] = useState(null)
    const isPowerArmor = location.pathname.includes('/power_armor/')

    const getUpgradeData = async () => {
        try {
            const res = await fetch(isPowerArmor ? `http://localhost:3000/power_armor_upgrades/${upgradeId}`
                : `http://localhost:3000/armor_upgrades/${upgradeId}`)
            const data = await res.json()
            setUpgrade(data)
            console.log('armor data successfully retreived')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUpgradeData()
    }, [upgradeId])

    if (!upgrade) return <div>Loading...</div>;


    return (
        <div style={{ padding: '7rem 0 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{upgrade.name}</h2>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <img src='/cap.png' style={{ height: '25px' }}></img>
                    <h2>{upgrade.name === 'Super Mutant Fitting' ? "1/2 base armor" : upgrade.base_cost} caps</h2>
                </div>
            </div>
            <h3>{upgrade.description}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                {upgrade.ranks && Object.entries(upgrade.ranks).map(([ranknum, rank]) => {
                    var keys = Object.keys(rank)
                    var filtered_keys = keys.filter(key => key !== "effect")

                    return (
                        <div key={ranknum} className='rank-card'>
                            <div>
                                <h3>Rank {ranknum}</h3>
                                <h5>{rank.effect}</h5>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem' }}>
                                {filtered_keys.map((key) =>
                                    <div style={{ textAlign: 'center' }}>
                                        <h5>{key}:</h5>
                                        <h5>{rank[key]}</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}