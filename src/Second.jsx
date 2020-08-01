import React from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

import Framer from './Framer'

export default function Second () {    
    return (
        <motion.header variants={Framer.container} initial='initial' animate='animate' exit='exit' transition='transition' className='projects content'>
            <div></div>

            <motion.div variants={Framer.containerLetters} initial='initial' animate='animate' exit='exit' transition='transition' className='word'>
                <motion.p variants={Framer.letter}>H</motion.p>
                <motion.p variants={Framer.letter}>e</motion.p>
                <motion.p variants={Framer.letter}>l</motion.p>
                <motion.p variants={Framer.letter}>l</motion.p>
                <motion.p variants={Framer.letter}>o</motion.p>
                <motion.p variants={Framer.letter}> </motion.p>
                <motion.p variants={Framer.letter}>W</motion.p>
                <motion.p variants={Framer.letter}>o</motion.p>
                <motion.p variants={Framer.letter}>r</motion.p>
                <motion.p variants={Framer.letter}>l</motion.p>
                <motion.p variants={Framer.letter}>d</motion.p>
            </motion.div>

            <motion.div variants={Framer.container} initial='initial' animate='animate' exit='exit' transition='transition' className='navbar'>
                <Link to='/'>
                    <motion.img variants={Framer.item} src='./assets/images/logo.png'></motion.img>
                </Link>

                <motion.ul>
                    <Link to='/Projects' className='direction'>
                        <motion.li variants={Framer.item}>Projects</motion.li>
                    </Link>

                    <Link to='/About' className='direction'>
                        <motion.li variants={Framer.item}>About</motion.li>
                    </Link>
                </motion.ul>

                <div></div>
                <div></div>
            </motion.div>
        </motion.header>
    )
}