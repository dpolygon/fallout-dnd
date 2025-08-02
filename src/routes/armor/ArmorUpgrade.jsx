import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './ArmorUpgrade.css'

export default function ArmorUpgrade() {
    const { upgradeId } = useParams()
    const navigate = useNavigate()
    const [upgrade, setUpgrade] = useState(null)
    const isPowerArmor = location.pathname.includes('/power_armor/')

    function handleBack() {
        navigate(-1)
    }

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

    if (!upgrade || !upgrade.ranks) return <div>Loading...</div>;


    return (
        <div style={{ padding: '10rem 0 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                    <div onClick={handleBack} className='backbutton'>&#x2B05;</div>
                    <h2>{upgrade.name}</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <img src='/cap.png' style={{ height: '25px' }}></img>
                    <h2>{upgrade.name === 'Super Mutant Fitting' ? "1/2 base armor" : upgrade.base_cost} caps</h2>
                </div>
            </div>
            <h3>{upgrade.description}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                {Object.entries(upgrade.ranks).map(([ranknum, rank]) => {
                    var keys = Object.keys(rank)
                    const excludedKeys = ["effect", "craft"];
                    const filtered_keys = keys.filter(key => !excludedKeys.includes(key));

                    return (
                        <div key={ranknum} className='rank-card'>
                            <div>
                                <div style={{ minHeight: '5rem' }}>
                                    <h3>Rank {ranknum}</h3>
                                    <h5>{rank.effect}</h5>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem' }}>
                                    {filtered_keys.map((key) =>
                                        <div style={{ textAlign: 'center' }}>
                                            <h4>{key}:</h4>
                                            <h5>{rank[key]}</h5>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {rank.craft?.materials &&
                                (<div style={{ minHeight: '15rem' }}>
                                    <div style={{ display: 'inline', textAlign: 'center' }}>
                                        <h3>required</h3>
                                        <div style={{}}>
                                            <h5>dc: {rank.craft?.dc}</h5>
                                            {rank.craft?.materials && Object.entries(rank.craft.materials).map(([name, amount]) =>
                                                <h5 style={{ justifyItems: 'start' }}>{name}: x{amount}</h5>
                                            )}
                                        </div>
                                    </div>
                                    <h3>time: <h5 style={{ display: 'inline' }}>{upgrade.time}</h5></h3>
                                </div>)
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}