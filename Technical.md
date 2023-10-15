
## Technical Reference Guide

    1. App loads the index.html
        - CDN Files
            - CDN CSS 
                * Loads the bootstrap CSS files [bootstrap.min.css, bootstrap.icon-large.min.css]
                * Icon images [bootstrap-glyphicons - `bootstrap.icon-large.min.css` ]
            - CSN JS
                * Loads bootstrap js [`bootstrap.min.js`]
                * Loads jquery js [`jquery.min.js`]
                * Loads `angular.js`
                * Loads `jquery.knob.min.js`
        - App CSS files
            * Loads the App css file [css/bgms.css]
        - App angular javascript 
            - [bgm.js, playGameAudio.js, playGameYt.js]
        - DIV Container
            - Navigation Bar DIV container
            - Main Container DIV
---
    2. Angular configuration - bgms.js
        - bgmService: back end service
        - Router Configuration:  routeProvider [Every navigation link should have templateUrl & Controller configured]
        - Controller configuration [bgmController, audioController]
---
