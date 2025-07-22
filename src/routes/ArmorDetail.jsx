import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ArmorDetail.css'

export default function ArmorDetail() {
    const { armorId } = useParams()
    const [armor, setArmor] = useState([])
    const [upgrades, setUpgrades] = useState([])
    const isPowerArmor = location.pathname.includes('/power_armor/')


    const getArmorData = async () => {
        try {
            const res = await fetch(isPowerArmor ? `http://192.168.0.149:3000/power_armor/${armorId}`
                : `http://192.168.0.149:3000/armor/${armorId}`)
            const data = await res.json()
            setArmor(data)
            console.log('armor data successfully retreived')
        } catch (error) {
            console.log(error)
        }
    }

    const getArmorUpgrades = async () => {
        try {
            const res = await fetch(isPowerArmor ? `http://192.168.0.149:3000/power_armor_upgrades`
                : `http://192.168.0.149:3000/armor_upgrades`)
            const data = await res.json()
            setUpgrades(data)
            console.log('armor upgrades successfully retrieved')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArmorData()
        getArmorUpgrades()
    }, [armorId])

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{armor.name}</h2>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <img src='/cap.png' style={{ height: '25px' }}></img>
                    <h2>{armor.base_cost} caps</h2>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem' }}>
                <h4>AC: {armor.ac}</h4>
                {!isPowerArmor && (<h4> DT: {armor.dt}</h4>)}
                {isPowerArmor && (<h4>DP: {armor.dp}</h4>)}
                <h4>Slots: {armor.slots}</h4>
                <h4>Load: {armor.load}</h4>
                {!isPowerArmor && (<h4> Strength Requirment: {armor.str_req}</h4>)}
                {isPowerArmor && (<h4>Power: The suit can operate continuously for up to {armor.allotted_time} minutes before needing a recharge.</h4>)}
            </div>
            <h3>{armor.description}</h3>
            <h2>Upgrades</h2>
            <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', width: '85vw', gap: '1rem' }}>
                {upgrades.map(upgrade =>
                    <div onClick={() => window.location.href = isPowerArmor ? `/power_armor/upgrade/${upgrade.name}` : `/armor/upgrade/${upgrade.name}`} className='upgradeCell' >{upgrade.name}</div>
                )}
            </div>
        </div>
    )
}
