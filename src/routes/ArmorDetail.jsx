import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ArmorDetail() {
    const { armorId } = useParams()
    const [armor, setArmor] = useState([])
    const isPowerArmor = location.pathname.includes('/power_armor/')


    const getArmorData = async () => {
        try {
            const res = await fetch(isPowerArmor    ? `http://localhost:3000/power_armor/${armorId}`
                                                    : `http://localhost:3000/armor/${armorId}`)
            const data = await res.json()
            setArmor(data)
            console.log('armor data successfully retreived')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getArmorData()
    }, [armorId])

    return (
        <div style={{padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{armorId}</h2>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                    <img src='/cap.png' style={{height: '25px'}}></img>
                    <h2>{armor.base_cost} caps</h2>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center', gap: '1rem'}}>
                <h4>AC: {armor.ac}</h4>
                {!isPowerArmor && (<h4> DT: {armor.dt}</h4>)}
                {isPowerArmor && (<h4>DP: {armor.dp}</h4>)}
                <h4>Slots: {armor.slots}</h4>
                <h4>Load: {armor.load}</h4>
                {!isPowerArmor && (<h4> Strength Requirment: {armor.str_requirement}</h4>)}
                {isPowerArmor && (<h4>Power: The suit can operate continuously for up to {armor.allotted_time} minutes before needing a recharge.</h4>)}
            </div>
            <h3>{armor.description}</h3>
        </div>
    )
}
