import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ArmorDetail.css'

export default function ArmorDetail() {
    const { armorId } = useParams()
    const navigate = useNavigate()
    const [armor, setArmor] = useState([])
    const [upgrades, setUpgrades] = useState([])
    const isPowerArmor = location.pathname.includes('/power_armor/')

    function handleBack() {
        navigate(-1)
    }

    const getArmorData = async () => {
        try {
            const res = await fetch(isPowerArmor ? `http://localhost:3000/power_armor/${armorId}`
                : `http://localhost:3000/armor/${armorId}`)
            const data = await res.json()
            setArmor(data)
            console.log('armor data successfully retreived')
        } catch (error) {
            console.log(error)
        }
    }

    const getArmorUpgrades = async () => {
        try {
            const res = await fetch(isPowerArmor ? `http://localhost:3000/power_armor_upgrades`
                : `http://localhost:3000/armor_upgrades`)
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

    if (!armor || !upgrades || !armor.craft ) return <div>Loading...</div>;

    return (
        <div style={{ padding: '10rem 0 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                    <div onClick={handleBack} className='backbutton'>&#x2B05;</div>
                    <h2>{armor.name}</h2>
                </div>
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
            <h2 style={{ textAlign: 'left' }}>Upgrades</h2>
            <div className='upgrades' style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: '1rem' }}>
                {upgrades.map(upgrade =>
                    <h4 onClick={() => window.location.href = isPowerArmor ? `/power_armor/upgrade/${upgrade.name}` : `/armor/upgrade/${upgrade.name}`} className='upgradeCell' >{upgrade.name}</h4>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '2rem 0 0 0', gap: '2rem' }}>
                <div className='craftingRepairCells' style={{ width: '400px', height: 'auto', borderRadius: '32px', textAlign: 'left', padding: '2rem' }}>
                    <h2>Crafting Recipe</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'start' }}>
                        <h4 style={{ whiteSpace: 'nowrap' }}>DC: {armor.craft.dc}</h4>
                        <h4>|</h4>
                        <h4>Time Required:  {armor.craft.time}</h4>
                    </div>
                    <h4>Materials Needed: </h4>
                    {console.log(armor.craft.materials)}
                    {
                        Object.entries(armor.craft.materials).map(([name, amount]) =>
                            <h5>x{amount} {name}</h5>
                        )
                    }
                </div>
                <div className='craftingRepairCells' style={{ width: '400px', height: 'auto', borderRadius: '32px', textAlign: 'left', padding: '2rem' }}>
                    <h2>Repair Decay</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'start' }}>
                        <h4 style={{ whiteSpace: 'nowrap'}}>DC: {armor.repair.dc}</h4>
                        <h4>|</h4>
                        <h4>Time Required: {armor.repair.time}</h4>
                    </div>
                    <h4>Materials Needed:</h4>
                    {
                        typeof armor.repair.materials === 'string' ?
                            (<h5>{armor.repair.materials}</h5>)
                            :
                            (Object.entries(armor.repair.materials).map(([name, amount]) =>
                                <h5>x{amount} {name}</h5>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}
