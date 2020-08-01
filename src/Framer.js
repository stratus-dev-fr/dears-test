module.exports = {
    container: {
        animate: {
            transition: {
                staggerChildren: .25
            }
        }
    },

    item: {
        initial: {
            opacity: 0,
            scaleY: 0,
            x: 75
        },

        animate: { 
            opacity: 1,
            scaleY: 1,
            x: 0,

            transition: {
                duration: 1,
                ease: 'backOut'
            }
        },

        exit: {
            opacity: 0,
            scaleY: 0,

            transition: {
                duration: 1.5,
                ease: 'backIn'
            }
        },

        transition: {
            duration: 1.5,
            ease: 'backOut'
        }
    },

    containerLetters: {
        animate: {
            transition: {
                staggerChildren: .1
            }
        }
    },

    letter: {
        initial: {
            opacity: 0,
            rotateY: 90
        },

        animate: {
            color: 'white',
            opacity: 1,
            rotateY: 0
        },

        exit: {
            opacity: 0,

            transition: {
                duration: 1.5
            }
        },

        transition: {
            duration: 1.5,
            ease: 'backIn'
        }
    }
}