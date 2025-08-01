import React, { useEffect, useRef, useState } from 'react'
import './navbar.css'
import { NavLink, useLocation } from 'react-router-dom'
import { HiBars2 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";


export default function Navbar() {

  const menuRef = useRef(null); // Ref for detecting outside click
  const [active, setActive] = useState(false)
  const handleClick = () => {
    setActive(!active)
    console.log('that tickled')
  }

  // Close when clicking outside navbar 
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [active]);

  const getRouteTitle = (pathname) => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/armor') || pathname.startsWith('/power_armor')) return 'Armor';
    if (pathname.startsWith('/weapons')) return 'Weapons';
    if (pathname.startsWith('/contact')) return 'Contact';
    if (pathname.startsWith('/about')) return 'About Us';
    return 'Fallout App'; // fallback
  };

  const pageTitle = getRouteTitle(location.pathname);


  return (
    <nav ref={menuRef} className='navbar'>
      <div className={active === false ? 'navbar-content' : 'navbar-content active'}>
        <div className='menu-items' style={{ width: '100%' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 2rem 0rem 2rem' }}>
            <h2 className='nonselectable' style={{ cursor: 'default' }}>{pageTitle}</h2>
            <div className='nonselectable' onClick={() => window.location.href = '/'} style={{ display: 'flex', transform: 'translate(-10%)', filter: 'drop-shadow(0 0 2rem rgba(244, 254, 101, 1))', cursor: 'pointer' }}>
              <svg version="1.1" width="100" height="100" viewBox="0 0 7869 3053">
                <title>Fallout logo</title>
                <path fill="currentColor" d="M1424 1090H856l178-678h735L1875 1H698L0 2662h444l305-1161h568l107-411M2267 702c-426 0-616 138-682 388l-59 228h446s17-75 55-216c37-141 88-150 155-150 29 0 124 2 84 177-11 48-46 195-90 369-60 2-99 0-214 0-187 0-507 57-603 406-96 350-179 552-68 688 105 128 403 124 631-128l-52 198h452l412-1571c46-178-83-389-467-389zm-285 1533c-36 66-83 114-145 114-164 0-83-214-38-371 15-55 34-232 213-232l98-2-128 491zM3182 0l-698 2661h444L3626 0h-444M3787 1l-698 2661h444L4231 1h-444M3921 1798l940-1094c-23-2-48-3-73-3-426 0-613 137-679 387l-188 710zM4573 1515h575c49-180 82-326 107-425 35-148-53-298-199-342l117-407zM4485 1820h-569l-126 466c-42 162 63 352 374 384zM4019 3053l426-389c295-37 436-167 491-377l206-751zM6199 770c-21 95-361 1365-385 1451-36 73-85 128-151 128-157 0-80-226-36-383l314-1196h-443l-304 1150c-96 349-160 536-49 672 105 129 377 124 605-131l-54 201h444s459-1715 505-1893zM7641 5l-530 219-147 546h-169l-66 256h167l-240 894c-96 349-177 545-55 672 92 96 241 83 554 70l81-313h-94c-155 0-78-213-34-371l257-952h216l66-256h-212zM7793 101a77 77 0 1 0 77 77 76 76 0 0 0-74-77h-3zm1 143a66 66 0 1 1 64-67l1 1a64 64 0 0 1-63 66h-2z" />
                <path fill="currentColor" d="M7833 222l-26-39a24 24 0 0 0 22-25c0-16-9-25-29-25h-34v89h11v-39h18l25 39zm-42-48h-14v-31h20c10 0 21 2 21 15 0 15-14 16-27 16z" />
              </svg>
              <img
                src='/dnd.svg'
              />
            </div>
            <div onClick={handleClick}>
              {active === false ? <HiBars2 className='nav-buttons' /> : <IoMdClose className='nav-buttons' />}
            </div>
          </div>
        </div>
        <div className='menu-selection'>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 1 }} to='/'>
            HOME
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 2 }} to='/weapons'>
            WEAPONS
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 3 }} to='/armor'>
            ARMOR
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 4 }} to='/aid'>
            AID
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 5 }} to='/misc'>
            MISC
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 6 }} to='/junk'>
            JUNK
          </NavLink>
          <NavLink onClick={handleClick} className={active === false ? 'menu-links-closing' : 'menu-links nonselectable'} style={{ '--i': 7 }} to='/ammo'>
            AMMO
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
