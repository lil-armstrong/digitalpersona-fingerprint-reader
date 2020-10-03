import { FingerprintReader, SampleFormat } from '@digitalpersona/devices'
import { BioSample, FingerPosition } from '@digitalpersona/core';
import { EnrollmentContext, FingerprintsEnroll } from '@digitalpersona/enrollment';

/* Digitalpersona Devices API */

class reader {
	constructor(options = undefined) {
		try {
			console.log( `Initializing reader` );

			if ( !options )
				console.log( 'Missing options. Using default WebSdk options' );
			this.deviceReady = false;
			this.webSdkOptions = options;
			this.reader = new FingerprintReader( this.webSdkOptions );
			this.reader.on( "DeviceConnected", this.onDeviceConnected );
			this.reader.on( "SamplesAcquired", this.onSamplesAcquired );
			this.reader.on( "AcquisitionStarted", this.onAcquisitionStarted );
			this.reader.on( "AcquisitionStopped", this.onAcquisitionStopped );
			this.reader.on( "QualityReported", this.onQualityReported );
			this.reader.on( "ErrorOccurred", this.onReaderError );
			this.reader.on( "ConnectionFailed", this.onConnectionError );
			this.reader.on( "DeviceDisconnected", this.onDeviceDisconnected );
			console.log( `Device initialization complete` );

		} catch ( error ) {
			this.handleError( error )
		}
	}

	onDeviceConnected(event) {
		this.deviceReady = true;
		console.log( 'Device is connected' )
	}

	onDeviceDisconnected(event) {
		console.log( 'Device is disconnected' )
	}

	onQualityReported(event) {
		console.log( 'Showing quality report' )
	}

	onConnectionError(event) {
		this.handleError( event, 'Connection Error' )
	}

	onReaderError(event) {
		this.handleError( event )
	}

	/**
	 * When fingerprint acquisition mode is activated successfully*/
	async onAcquisitionStarted(event) {
		/*Waiting for a finger*/
		console.log( 'Fingerprint reading activated successfully', event )
	}

	/*On successful scan*/
	async onSamplesAcquired(event) {
		console.log( 'Fingerprint sample acquired' );
		this.samples = event.samples;
		this.notifyOnToken( this.samples )
	}

	/*When fingerprint acquisition mode is deactivated*/
	async onAcquisitionStopped(event) {
		console.log( 'Fingerprint reading stopped', event );
	}

	notifyOnToken(token) {
		this.token = token;
		console.log( { token } )
	}

	getToken() {
		return this.token;
	}

	async submitFingerprints(context, samples, pos) {
		try {
			const api = new FingerprintsEnroll( context );
			await api.enroll( pos, samples );
		} catch ( error ) {
			this.handleError( error );
		}
	}

	handleError(error, title = '  ') {
		console.error( title ?? title, error )
	}

	async startReading() {
		try {
			if ( !this.deviceReady )
				throw new Error( 'Device is not Loaded' );
			/*Set fingerprint activation mode to true*/
			await this.reader.startAcquisition( SampleFormat.Intermediate );
		} catch ( err ) {
			this.handleError( err );
		}
	}

	async stopReading() {
		try {
			await this.reader.stopAcquisition()
		} catch ( err ) {
			this.handleError( err )
		}
	}

	destroy() {
		this.reader.off();
		delete this.reader;
	}
}

export default reader;
