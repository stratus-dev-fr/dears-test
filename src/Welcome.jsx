import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import * as THREE from 'three'

import Framer from './Framer'

export default function Welcome () {
    const [load, setLoad] = useState(false)

    useEffect(() => {
        // THREE


        let clearColor = '#0f0f0f'
        let sphereColor = '#f5f5f5'


        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        
        camera.position.z = 50

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(clearColor)


        const geometry = new THREE.SphereGeometry(10, 70, 20)
        const material = new THREE.PointsMaterial({ color: sphereColor, size: .25 })
        const mesh = new THREE.Points(geometry, material)

        scene.add(mesh)

        const light = new THREE.PointLight({ color: 0x00ff00 }, 1, 500)

        light.position.set(0, 10, 10)

        scene.add(light)

        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        const bloomPass = new UnrealBloomPass()

        bloomPass.exposure = 1
        bloomPass.threshold = 0
        bloomPass.strength = .5
        bloomPass.radius = 0

        composer.addPass(renderPass)
        composer.addPass(bloomPass)


        const animate = () => {
            requestAnimationFrame(animate)

            if (mesh) {
                mesh.rotation.x += .01
                mesh.rotation.y += .015
            }

            composer.render()
        }

        animate()


        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)

            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })

        if (document.getElementById('three')) {
            document.getElementById('three').appendChild(renderer.domElement)
        }


        if (!load) {
            setLoad(true)
        }
    })

    return (
        <>
            {load ?
                <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='content'>
                    <motion.div id='three'></motion.div>

                    <div></div>

                    <motion.div variants={Framer.container} initial='initial' animate='animate' exit='exit' transition='transition' className='navbar'>
                        <motion.img variants={Framer.item} src='./assets/images/logo.png'></motion.img>

                        <motion.ul>
                            <Link to='/Projects' className='direction'>
                                <motion.li variants={Framer.item}>Projects</motion.li>
                            </Link>

                            <Link to='/About' className='direction'>
                                <motion.li variants={Framer.item}>About</motion.li>
                            </Link>

                            <Link to='/Test' className='direction'>
                                <motion.li variants={Framer.item}>Test</motion.li>
                            </Link>
                        </motion.ul>

                        <div></div>
                        <div></div>
                    </motion.div>
                </motion.header>

                :

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: 'backInOut' }}>
                    <h1>Loading...</h1>
                </motion.div>
            }
        </>
    )
}