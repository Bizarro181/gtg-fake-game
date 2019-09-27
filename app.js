const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const server = require( 'http' ).Server( app );

let paused = false;

// Register middleware
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

server.listen( 2021 );

// Start a game, dashboard sends teamId, teamName, and members
app.post( '/start', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		res.status( 200 ).json( { status: 'running' } );	
		console.log( "Team " + req.body.teamId );
		console.log( "Team Name " + req.body.teamName );
		console.log( "Members " + req.body.members );
	}, 500 );
});

// Query game for status
app.post( '/status', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		console.log( "redirected to dump" );
		res.redirect( '/dump' );
	}, 500 );
});

// Pause a game
app.post( '/pause', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		let status;
		paused = !paused;
		if( paused ) {
			status = "paused";
		} else {
			status = "running";
		}
		res.status( 200 ).json( { status: status } );
		console.log( "Toggled to " + status );
	}, 500 );
});

// get a dump
app.post( '/dump', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		var rand = Math.floor( Math.random() * 9 );
		if( rand == 8 || rand == 6 || rand == 4 ) {
			res.status( 500 ).json( { status: 'error' } );
		} else {
			res.status( 200 ).json( { status: 'idle' } );
		}
		console.log( "Dumped" );
	}, 500 );
});

// Stop the current game and reset to 
app.post( '/kill', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		res.status( 200 ).json( { status: 'idle' } );
		console.log( "Killed, status now idle" );
	}, 500 );
});


// Health Check (this can probably happen in dump now)
// server needs enpoint for health check with respond with "degraded" if something is wrong and dashboard will recieve a text message back of a status message