import React, { useState, useEffect, useReducer } from 'react'

import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3, Tools, VideoRecorder, ShaderMaterial, Axis, Space, MotionBlurPostProcess, CannonJSPlugin } from '@babylonjs/core'

import * as cannon from 'cannon'

import { GoogleLogin, GoogleLogout } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import { motion, useCycle } from 'framer-motion'
import { Scroll, Frame } from 'framer'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

export default function Test () {
    const [isConnectedGoogle, setIsConnectedGoogle] = useState(false)
    const [isConnectedFacebook, setIsConnectedFacebook] = useState(false)
    
    const [data, setData] = useState(undefined)

    const [animate, cycle] = useCycle({ scale: 1, rotate: 90 }, { scale: 1.25, rotate: 0 })

    const stateValue = { initial: 0 }
    const [reducer, reduce] = useReducer(reducerCounter, stateValue)

    function reducerCounter (value, action) {
        switch (action) {
            case 'add':
                return { initial: value.initial + 1 }
        
            case 'remove':
                return { initial: value.initial - 1 }
        }
    }

    useEffect(() => {
        // Babylon

        window.CANNON = cannon

        let x = 0
        let y = 2

        const canvas = document.getElementById('babylon')
        
        const engine = new Engine(canvas, true)
        const scene = new Scene(engine)
        const camera = new ArcRotateCamera('camera', 1, 1, 1, new Vector3(0, 5, -10), scene)

        scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin())

        camera.setTarget(new Vector3.Zero())
        camera.attachControl(canvas, false)

        const blur = new MotionBlurPostProcess('blur', scene, 1, camera)

        blur.motionStrength = 2
        blur.motionBlurSamples = 16

        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

        const sphere = new MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene)

        sphere.position.x = x
        sphere.position.y = y

        const ground = new MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, scene)

        engine.runRenderLoop(() => {
            scene.render()

            sphere.position.x = x * .008
            sphere.position.y = y * .008

            ground.rotation.y += .05
        })

        window.addEventListener('mousemove', (e) => {
            x = e.clientX - (window.innerWidth / 2)
            y = e.clientY - (window.innerHeight / 2)
        })

        window.addEventListener('resize', () => {
            engine.resize()
        })
        
        /*
        scene.render()
        Tools.CreateScreenshot(engine, camera, 400)

        if (VideoRecorder.IsSupported(engine)) {
            const recorder = new VideoRecorder(engine)

            recorder.startRecording('test.webm')

            setTimeout(() => {
                recorder.stopRecording()
            }, 1000)
        }
        */

        // Google

        if (data) {
            if (isConnectedGoogle) {
                setIsConnectedGoogle(data.profileObj)
            } else if (isConnectedFacebook) {
                console.log(data)
            }
        }

        // Stagger

        gsap.to(['header.test h6'], {
            x: 100,
            duration: .3,
            stagger: {
                from: 'start',
                each: .1,
                repeat: -1,
                yoyo: true
            }
        })

        // ScrollTrigger

        gsap.registerPlugin(ScrollTrigger)

        const timeline = gsap.timeline()

        timeline.fromTo(['#first'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#first'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })
        
        timeline.fromTo(['#second'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#second'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })

        timeline.fromTo(['#third'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#third'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })

        timeline.fromTo(['#fourth'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#fourth'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })

        timeline.fromTo(['#fifth'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#fifth'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })

        timeline.fromTo(['#sixth'], { display: 'none', y: -window.innerHeight, opacity: 0 }, { display: 'block', y: 0, opacity: 1 })
        timeline.fromTo(['#sixth'], { display: 'block', y: 0, opacity: 1 }, { display: 'none', y: window.innerHeight, opacity: 0, position: 'absolute' })

        ScrollTrigger.create({
            animation: timeline,
            trigger: '#container',
            start: 'top 25%',
            end: window.innerHeight + ' 0',
            scrub: .5,
            pin: true,
            markers: true
        })
    }, [data])

    return (
        <>
            <motion.header className='test'>
                <h1>Counter : {reducer.initial}</h1>

                <div>
                    <button onClick={() => reduce('add')}>+1</button>
                    <button onClick={() => reduce('remove')}>-1</button>
                </div>
            </motion.header>

            <motion.header className='test'>
                <canvas id='babylon'></canvas>
            </motion.header>

            <motion.header className='test'>
                {data ?
                    <>
                        {isConnectedGoogle ?
                            <>
                                <h1>Welcome, {data.profileObj.name}</h1>

                                <img src={data.profileObj.imageUrl} />
                                <p>{data.profileObj.email}</p>

                                <GoogleLogout
                                    clientId="1000826296470-9kv2fm511ps6an60so0mel1vtsj6s6ph.apps.googleusercontent.com"
                                    onLogoutSuccess={() => {
                                        setIsConnectedGoogle(false)
                                        setData(undefined)
                                    }}
                                />

                                <h6>1</h6>
                                <h6>2</h6>
                                <h6>3</h6>
                                <h6>4</h6>
                                <h6>5</h6>
                            </>

                            :

                            <>
                                {isConnectedFacebook ?
                                    <>
                                        <h1>Welcome, {data.name}</h1>
                                        <img src={data.picture.data.url} />
                                    </>

                                    :

                                    <h1>ERROR</h1>
                                }
                            </>
                        }
                    </>

                    :

                    <>
                        <h1>Log in</h1>

                        <GoogleLogin
                            clientId="1000826296470-9kv2fm511ps6an60so0mel1vtsj6s6ph.apps.googleusercontent.com"
                            onSuccess={(e) => {
                                setIsConnectedGoogle(true)
                                setData(e)
                            }}
                            isSignedIn={true}
                        />

                        <FacebookLogin
                            appId="222868338793347"
                            fields="name,email,picture"
                            onClick={(e) => console.log(e)}
                            callback={(e) => {
                                setIsConnectedFacebook(true)
                                setData(e)
                            }}
                        />
                    </>
                }
            </motion.header>

            <motion.header className='test-scroll'>
                <div id='container'>
                    <div id="first">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/710031543535534100/1024px-Unofficial_JavaScript_logo_2.svg.png'></img>
                    </div>

                    <div id="second">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/710031511377936394/logo512.png'></img>
                    </div>

                    <div id="third">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/710032041969713193/07ca4afbde70ce0c995b3f63e9c04ceb.png'></img>
                    </div>

                    <div id="fourth">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/710034727926628452/logo-man-1.png'></img>
                    </div>

                    <div id="fifth">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/734020160129728532/framer-motion.png'></img>
                    </div>
                    
                    <div id="sixth">
                        <img src='https://cdn.discordapp.com/attachments/573915112440594432/734688494877933568/5gdpZtDv_400x400.jpg'></img>
                    </div>
                </div>
            </motion.header>

            <motion.header className='test'>
                <Scroll width={128} height={128} radius={30} animate={animate} onTap={() => cycle()} background='#0f0f0f'>
                    <Frame width={128} height={50} radius={10} background='red' />
                    <Frame width={128} height={50} radius={10} background='green' />
                    <Frame width={128} height={50} radius={10} background='blue' />
                </Scroll>
            </motion.header>
        </>
    )
}