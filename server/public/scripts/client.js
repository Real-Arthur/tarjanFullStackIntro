$( document ).ready( onReady );

function onReady(){
    getSongs();
    $( '#addSongButton' ).on( 'click', addSong );
    $(document).on('click', '.deleteSongBtn', deleteSong);
    $(document).on('click', '.rankUpBtn', moveSongUp);
    $(document).on('click', '.rankDownBtn', moveSongDown);
} // end onReady

function deleteSong() {
    // let songID = 'ribbit';  // to do
    let songID = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/songs/${songId}`
    }).then(function(response) {
        console.log('deleted', response);
        // to do refresh page aka get that data
        getSongs();
    }).catch(function(err) {
        console.log('error', err);
        alert('red light')
    })
}

function addSong(){
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    } // end object to send
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX POST
} // end addSong

function getSongs(){
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response ); 
        // display songs on DOM 
        let el = $( '#songsOut' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append( `<li>
            ${ response[i].rank }
            ${ response[i].track }
            ${ response[i].artist }
            ${ response[i].published.split( 'T' )[0] }
            <button class="deleteSongBtn" data-id="${response[i].id}">Scrap It</button>
            <button class="rankUpBtn" data-id="${response[i].id}">Up</button>
            <button class="rankDownBtn" data-id="${response[i].id}">Down</button>
            </li>`)
        } // end for
    }).catch( function( err ){
        alert( 'error!' );
        console.log( err );
    }) // end AJAX GET
} // end getSongs()

function moveSongUp() {
    let songID = $(this).data('id');
    console.log('In Rank Up', songID);
    $.ajax({
        method: 'PUT',
        url: `/songs/${songID}`,
        data: {
            direction: 'up'
        }
    }).then(function(response) {
        console.log('response from RankUp',response);
    }).catch( function( err ){
        alert( 'error on rank up!' );
        console.log( err );
    })
}
function moveSongDown() {
    let songID = $(this).data('id');
    console.log('In Rank Down', songID);
}