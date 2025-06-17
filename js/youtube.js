var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = [];
var currentPlayingIndex = -1;

// This function is called when YouTube API is ready
function onYouTubeIframeAPIReady() {
    // Get all YouTube iframe elements
    var iframes = document.querySelectorAll('.video-container iframe');
    
    // Initialize each iframe as a YouTube player
    iframes.forEach(function(iframe, index) {
        players[index] = new YT.Player(iframe.id, {
            events: {
                'onStateChange': function(event) {
                    // When a video starts playing (state = 1)
                    if (event.data === YT.PlayerState.PLAYING) {
                        // If there's already a video playing, pause it
                        if (currentPlayingIndex !== -1 && currentPlayingIndex !== index) {
                            players[currentPlayingIndex].pauseVideo();
                        }
                        // Update the currently playing video index
                        currentPlayingIndex = index;
                    }
                }
            }
        });
    });
}