const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const server = require( 'http' ).Server( app );

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
		var rand = Math.floor( Math.random() * 9 );
		if( rand == 8 || rand == 6 || rand == 4 ) {
			res.status( 500 ).json( { status: 'error' } );
		} else {
			res.status( 200 ).json( { status: 'idle' } );
		}
		console.log( "reported status" );
	}, 500 );
});

// Pause a game
app.post( '/pause', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		res.status( 200 ).json( { status: 'paused' } );
		console.log( "Paused, status now paused" );
	}, 500 );
});

// Resume a game
app.post( '/resume', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		res.status( 200 ).json( { status: 'running' } );
		console.log( "Resumed, status now resumed" );
	}, 500 );
});

// Stop the current game and reset to 
app.post( '/reset', ( req, res ) => {
	// Set a timeout so this delays just to see
	setTimeout(function(){
		res.status( 200 ).json( { status: 'idle' } );
		console.log( "Reset, status now idle" );
	}, 500 );
});


// Health Check
// server needs enpoint for health check with respond with "degraded" if something is wrong and dashboard will recieve a text message back of a status message