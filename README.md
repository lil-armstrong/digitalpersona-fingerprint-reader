### Digital Persona Fingerprint JS Plugin

> Setup<br>

1. In your `index.html` add the following scripts:
<html>
    <head>
        <title>Test</title>
    </head>
    
    <body>
        <!-- Other client side code -->
        
        <script src="https://cdn.jsdelivr.net/npm/@digitalpersona/authentication@0.2.6/dist/es5.bundles/index.umd.min.js" crossorigin></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/@digitalpersona/devices@0.2.6/dist/es5.bundles/index.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@digitalpersona/enrollment@0.2.9/dist/es5.bundles/index.umd.min.js" crossorigin></script>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=Symbol%2Cfetch%2CString.prototype.endsWith%2CObject.assign%2CArray.prototype.findIndex%2CArray.prototype.includes"></script>
        <script type="text/javascript" src="./src/websdk/websdk.client.js"></script>
        <script type="module" src="build/bundle.js"></script>
        
        <script type="module">
            window.addEventListener( 'DOMContentLoaded', function () {
            // Check if the device has been connected
            let reader = new fpController( {
            debug: true,
            version: 1
            } );
            // Other codes to access the api
        </script>
 
 
DigitaPersona Core API<br>
[![](https://data.jsdelivr.com/v1/package/npm/@digitalpersona/core/badge)](https://www.jsdelivr.com/package/npm/@digitalpersona/core)

DigitaPersona Devices API<br> 
[![](https://data.jsdelivr.com/v1/package/npm/@digitalpersona/devices/badge)](https://www.jsdelivr.com/package/npm/@digitalpersona/devices)

DigitaPersona Enrollment API<br>
[![](https://data.jsdelivr.com/v1/package/npm/@digitalpersona/enrollment/badge)](https://www.jsdelivr.com/package/npm/@digitalpersona/enrollment)

DigitaPersona Authentication<br>
[![](https://data.jsdelivr.com/v1/package/npm/@digitalpersona/authentication/badge)](https://www.jsdelivr.com/package/npm/@digitalpersona/authentication)

