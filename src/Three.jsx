import React, { useEffect, useState } from 'react'

import { TweenMax } from 'gsap'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { MMDPhysics } from 'three/examples/jsm/animation/MMDPhysics'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'

import * as THREE from 'three'

export default function Three () {
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const script = document.createElement('script')

        script.src = 'https://github.com/kripken/ammo.js'

        const scene = new THREE.Scene()
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
        const controls = new OrbitControls(camera, renderer.domElement)

        camera.position.z = 5

        renderer.setClearColor('#f0f0f0')
        renderer.setSize(window.innerWidth, window.innerHeight)


        const light = new THREE.PointLight(0xffffff, 1)

        light.position.set(-15, 20, 10)

        scene.add(light)
        

        let physics

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)

        physics = new MMDPhysics(cube)

        scene.add(cube)

        /*
        const loader = new GLTFLoader()
        const draco = new DRACOLoader()

        const directory = './scene.gltf'

        draco.setDecoderPath(directory)

        loader.setDRACOLoader(draco)

        let model

        loader.load(directory, (e) => {
            scene.add(e.scene)

            e.scene.position.y = -.6

            model = e.scene

            setLoad(true)
        }, undefined, (e) => {
            console.error(`ERROR : ${e}`)
        })
        */


        const animation = () => {
            requestAnimationFrame(animation)

            if (physics) {
                //physics.update()
            }

            camera.updateMatrix()

            renderer.render(scene, camera)
        }

        animation()

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)

            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })

        const div = document.getElementById('test')

        if (load) {
            div.appendChild(renderer.domElement)
        }
    })

    return (
        <>
            {load ?
                <div id='test'></div>

                :

                <h1>Loading...</h1>
            }
        </>
    )
}