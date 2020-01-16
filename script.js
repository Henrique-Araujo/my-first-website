var player;
var isPlaying = 0;
var SLOW_PLAYBACK_RATE = 0.25;
var NORMAL_PLAYBACK_RATE = 1;
var AVAILABLE_PLAYBACK_RATES = [];
var NORMAL_PLAYBACK_RATE_INDEX = 3;
var currentPlaybackRateIndex = NORMAL_PLAYBACK_RATE_INDEX;
var SLOW_PLAYBACK_RATE_INDEX = NORMAL_PLAYBACK_RATE - 2;
var CURRENTPARTINDEX = 0;
var songPartsMap = [
    {
        start: '15',
        end: '20',
        lyrics: "This hit, that ice cold Michelle Pfeiffer, that white gold",
        translation: "Este sucesso, aquele gelo Michelle Pfeiffer, aquele ouro branco"
    },
    {
        start: '21',
        end: '25',
        lyrics: "This one for them hood girls Them good girls straight masterpieces",
        translation: "Essa é para as garotas das quebradas Para as garotas boas, obras primas de verdade"
    },
    {
        start: '25',
        end: '29',
        lyrics: "Stylin', wilin', livin' it up in the city",
        translation: "Estilosas, transcendentes Vivendo ao máximo na cidade"
    },
    {
        start: '29',
        end: '33',
        lyrics: "Got Chucks on with Saint Laurent Got kiss myself, I'm so pretty",
        translation: "Estou usando tênis Chuck Taylor com Saint Laurent Tenho que me beijar, sou tão bonito"
    }
];

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'OPf0YbXqDm0',
        events: {
            onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
}

function initialize() {
    player.playVideo();
    isPlaying = 1;
    AVAILABLE_PLAYBACK_RATES = player.getAvailablePlaybackRates();

    var i = 0;
    AVAILABLE_PLAYBACK_RATES.forEach(function(pbRate) {
        if(pbRate == 1) {
            NORMAL_PLAYBACK_RATE_INDEX = AVAILABLE_PLAYBACK_RATES[i];
            NORMAL_PLAYBACK_RATE = pbRate;
        }
        i++;

    });

    refreshTexts();
    refreshSpeedText();

    loop();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        alert(1);
    }
}

function loop() {
    setTimeout(check, 1000);
}

function check() {
    //console.log('checking', isPlaying, player.getPlayerState());
    
    if(player.getCurrentTime() >= (songPartsMap[CURRENTPARTINDEX].end - 0.65)) {
        next(false);
        console.log('next');
    }
    
    loop();
}

function refreshTexts() {
    $("#lyrics").text(songPartsMap[CURRENTPARTINDEX].lyrics);
    $("#translation").text(songPartsMap[CURRENTPARTINDEX].translation);
}

function playPause() {
    if(player.getPlayerState() == 1) {
        player.pauseVideo();
        isPlaying = false;
    }
    else {
        player.playVideo();
        isPlaying = true;
    }
    console.log('player state', player.getPlayerState(), ' ', 'isPlaying', isPlaying);
}

function playNormal() {
    refreshSpeedText();
    player.setPlaybackRate(NORMAL_PLAYBACK_RATE);
    seekPlayerToCurrentPartStart();
    player.playVideo();
}

function playSlow() {
    refreshSpeedText();
    player.setPlaybackRate(AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex]);
    seekPlayerToCurrentPartStart();
    player.playVideo();
}

function seekPlayerToCurrentPartStart() {
    player.seekTo(songPartsMap[CURRENTPARTINDEX].start);
}

function next(button_was_pressed) {
    if(CURRENTPARTINDEX + 1 < songPartsMap.length)
        CURRENTPARTINDEX = ++CURRENTPARTINDEX;
    if(button_was_pressed) {
        seekPlayerToCurrentPartStart();
        playNormal();
    }
    refreshTexts();
}

function prev() {
    CURRENTPARTINDEX = CURRENTPARTINDEX - 1 > 0 ? --CURRENTPARTINDEX : 0;
    console.log('CURRENTPARTINDEX', CURRENTPARTINDEX);
    seekPlayerToCurrentPartStart();
    playNormal();
    refreshTexts();
}

function makeItFaster() {
    //currentPlaybackRateIndex = (currentPlaybackRateIndex < AVAILABLE_PLAYBACK_RATES.length)
    //    ? currentPlaybackRateIndex + 1 : currentPlaybackRateIndex;

    if(currentPlaybackRateIndex < NORMAL_PLAYBACK_RATE_INDEX)
        currentPlaybackRateIndex = currentPlaybackRateIndex - 1;

    var nextPbRate = AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex];
    refreshSpeedText();
    console.log('currentPlaybackRateIndex', currentPlaybackRateIndex);
}

function makeItSlower() {
    currentPlaybackRateIndex = (currentPlaybackRateIndex > 0)
        ? currentPlaybackRateIndex - 1 : 0;

    var nextPbRate = AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex];

    player.setPlaybackRate(nextPbRate);
    console.log('currentPlaybackRateIndex', currentPlaybackRateIndex);
}

function resetToDefaultSlowerSpeed() {
    currentPlaybackRateIndex = NORMAL_PLAYBACK_RATE_INDEX;
    refreshSpeedText();
}

function refreshSpeedText() {
    var speed = (AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex] == NORMAL_PLAYBACK_RATE)
        ? 'Normal' : AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex];
    $("#speed").text(speed);
}

$('#play-pause').on('click', playPause);
$('#normal').on('click', playNormal);
$('#prev').on('click', prev);
$('#next').on('click', function() { next(true) });
$('#faster').on('click', makeItFaster);
$('#slower').on('click', makeItSlower);
$('#reset-to-default-slower-speed').on('click', resetToDefaultSlowerSpeed);

$('#slow').mousedown(function() {
    player.setPlaybackRate(AVAILABLE_PLAYBACK_RATES[currentPlaybackRateIndex]);
});
$('#slow').mouseup(function() {
    player.setPlaybackRate(NORMAL_PLAYBACK_RATE);
    currentPlaybackRateIndex = NORMAL_PLAYBACK_RATE_INDEX;
});