var player;
var isPlaying = 0;
const SLOW_PLAYBACK_RATE = 0.25;
const NORMAL_PLAYBACK_RATE = 1;
var AVAILABLE_PLAYBACK_RATES;
const NORMAL_PLAYBACK_RATE_INDEX = 3;
const DEFAULT_SLOW_PLAYBACK_RATE = 0.5;
var currentPbRateIndex;
var SLOW_PLAYBACK_RATE_INDEX = NORMAL_PLAYBACK_RATE - 2;
var currentPartIndex = 3;
var currentPbRate = 0.5;
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
    },
    {
        start: '33',
        end: '37',
        lyrics: "I'm too hot (hot damn) Called a police and a fireman",
        translation: "Sou muito quente (quente para caramba) Chame a polícia e um bombeiro"
    },
    {
        start: '37',
        end: '42',
        lyrics: "I'm too hot (hot damn) Make a dragon wanna retire, man",
        translation: "Faço um dragão querer se aposentar, cara"
    },
    {
        start: '41',
        end: '44',
        lyrics: "I'm too hot (hot damn) Say my name, you know who I am",
        translation: "Diga meu nome, você sabe quem sou"
    },
    {
        start: '44',
        end: '50',
        lyrics: "I'm too hot (hot damn) And my band 'bout that money Break it down",
        translation: "Sou muito quente (quente para caramba) E minha banda faturou esse dinheiro Manda ver"
    },
    {
        start: '50',
        end: '55',
        lyrics: 'Girls hit you "hallelujah" (whoo) Girls hit you "hallelujah" (whoo)',
        translation: 'Garotas te mandam um "aleluia" (whoo) Garotas te mandam um "aleluia" (whoo)'
    },
    {
        start: '54',
        end: '62',
        lyrics: "Girls hit you \"hallelujah\" (whoo) 'Cause uptown funk gon' give it to you 'Cause uptown funk gon' give it to you 'Cause uptown funk gon' give it to you",
        translation: "Garotas te mandam um \"aleluia\" (whoo) Pois o funk da classe alta vai te dar Pois o funk da classe alta vai te dar Pois o funk da classe alta vai te dar"
    },
    {
        start: '62',
        end: '73',
        lyrics: "Saturday night and we in the spot Don't believe me, just watch (come on!)",
        translation: "Sábado à noite e estamos na área Não acredite em mim, apenas observe (venha!)"
    },
    {
        start: '73',
        end: '81',
        lyrics: "Don't believe me, just watch(x5) Hey, hey, hey, oh!",
        translation: "Não acredite em mim, apenas observe(x5) Ei, ei, ei, oh!"
    },
    {
        start: '81',
        end: '92',
        lyrics: "Stop! Wait a minute Fill my cup, put some liquor in it",
        translation: "Pare! Espere um minuto Encha meu copo, coloque um pouco de licor"
    },
    {
        start: '92',
        end: '96',
        lyrics: "Take a sip, sign a check Julio! Get the stretch!",
        translation: "Dê um gole, assine um cheque Julio! Pegue a limousine!"
    },
    {
        start: '96',
        end: '99.8',
        lyrics: "Ride to Harlem, Hollywood, Jackson, Mississippi",
        translation: "Dirija até o Harlem, Hollywood, Jackson, Mississippi"
    },
    {
        start: '99.8',
        end: '104',//44
        lyrics: "If we show up, we gon' show out Smoother than a fresh dry skippy",
        translation: "Se nós aparecermos, vamos nos exibir Mais suaves que aquele drinque recém feito"
    },
    {
        start: '104',
        end: '108',//48
        lyrics: "I'm too hot (hot damn) Called a police and a fireman",
        translation: "Sou muito quente (quente para caramba) Chame a polícia e um bombeiro"
    },
    {
        start: '108',
        end: '112.5',//52
        lyrics: "I'm too hot (hot damn) Make a dragon wanna retire man",
        translation: "Sou muito quente (quente para caramba) Faço um dragão querer se aposentar, cara"
    },
    {
        start: '112.5',
        end: '116.5',//56
        lyrics: "I'm too hot (hot damn) Say my name, you know who I am",
        translation: "Sou muito quente (quente para caramba) Diga meu nome, você sabe quem sou"
    },
    {
        start: '116.5',
        end: '123',//3
        lyrics: "I'm too hot (hot damn)",
        translation: "Sou muito quente (quente para caramba)"
    },
    {
        start: '123',
        end: '125',//5
        lyrics: "And my band 'bout that money Break it down",
        translation: "E minha banda faturou esse dinheiro Manda ver"
    },
    {
        start: '125',
        end: '131.6',//11
        lyrics: "Girls hit you \"hallelujah\" (whoo) (x3)",
        translation: "Garotas te mandam um \"aleluia\" (whoo) (x3)"
    },
    {
        start: '131.6',
        end: '137.8',//17
        lyrics: "'Cause uptown funk gon' give it to you (x3)",
        translation: "Pois o funk da classe alta vai te dar (x3)"
    },
    {
        start: '137.8',
        end: '148',//28
        lyrics: "Saturday night and we in the spot Don't believe me, just watch (come on!)",
        translation: "Sábado à noite e estamos na área Não acredite em mim, apenas observe (venha!)"
    },
    {
        start: '148',
        end: '156',//36
        lyrics: "",
        translation: ""
    },
    {
        start: '156',
        end: '167.3',//47
        lyrics: "Don't believe me, just watch (x4) Hey, hey, hey, oh!",
        translation: "Não acredite em mim, apenas observe (x4) Ei, ei, ei, oh!"
    },
    {
        start: '167.3',
        end: '171',//51
        lyrics: "Uptown funk you up (x2)",
        translation: "Funk da classe alta te embala (x2)"
    },
    {
        start: '171',
        end: '175.5',//55
        lyrics: "Before we leave Imma tell y'all a lil' something",
        translation: "Antes de irmos Lhes direi uma coisinha"
    },
    {
        start: '175.5',
        end: '179.5',//59
        lyrics: "Uptown funk you up (x2)",
        translation: "Funk da classe alta te embala (x2)"
    },
    {
        start: '179.5',
        end: '183.5',//3
        lyrics: "Uptown funk you up (x2)",
        translation: "Funk da classe alta te embala (x2)"
    },
    {
        start: '183.5',
        end: '191.5',//11
        lyrics: "I said Uptown funk you up (x4)",
        translation: "Eu disse Funk da classe alta te embala (x4)"
    },
    {
        start: '191.5',
        end: '200',//20
        lyrics: "Come on! Dance, jump on it If you sexy, than flaunt it If you freaky, than own it Don't brag about it, come show me",
        translation: "Venha! Dance, embarque nessa Se você for sexy, então mostre Se você for doidinha, então assuma Não fique se gabando, venha me mostrar"
    },
    {
        start: '200',
        end: '206.5',//26
        lyrics: "Come on! Dance, jump on it If you sexy, than flaunt it Well, it's saturday night and we in the spot",
        translation: "Venha! Dance, embarque nessa Se você for sexy, então mostre Bem, é sábado à noite e estamos na área"
    },
    {
        start: '206.5',
        end: '215',//35
        lyrics: "Don't believe me, just watch (come on)",
        translation: "Não acredite em mim, apenas observe (venha)"
    },
    {
        start: '215',
        end: '223',//43
        lyrics: "Don't believe me, just watch",
        translation: "Não acredite em mim, apenas observe"
    },
    {
        start: '223',
        end: '234',
        lyrics: "Don't believe me, just watch (x4)",
        translation: "Não acredite em mim, apenas observe (x4)"
    },
    {
        start: '223',
        end: '234',
        lyrics: "Uptown funk you up Uptown funk you up (say what?)",
        translation: "Funk da classe alta te embala Funk da classe alta te embala (disse o quê?)"
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

    refreshTexts();
    refreshSpeedText();
    loop();

    var i = 0;
    AVAILABLE_PLAYBACK_RATES.forEach(function(pbRate) {
        if(pbRate == NORMAL_PLAYBACK_RATE) {
            NORMAL_PLAYBACK_RATE_INDEX = i;
        }
        if(pbRate == DEFAULT_SLOW_PLAYBACK_RATE) {
            currentPbRateIndex = i;
        }
        i++;

    });
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
    
    if(player.getCurrentTime() >= (songPartsMap[currentPartIndex].end - 0.65)) {
        next(false);
        console.log('next');
    }
    
    loop();
}

function refreshTexts() {
    $("#lyrics").text(songPartsMap[currentPartIndex].lyrics);
    $("#translation").text(songPartsMap[currentPartIndex].translation);
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
    player.setPlaybackRate(AVAILABLE_PLAYBACK_RATES[currentPbRateIndex]);
    seekPlayerToCurrentPartStart();
    player.playVideo();
}

function seekPlayerToCurrentPartStart() {
    player.seekTo(songPartsMap[currentPartIndex].start);
}

function next(button_was_pressed) {
    if(currentPartIndex + 1 < songPartsMap.length)
        currentPartIndex = currentPartIndex + 1;
    if(songPartsMap[currentPartIndex].start == '') {
        currentPartIndex = currentPartIndex - 1;
    }
    if(button_was_pressed) {
        seekPlayerToCurrentPartStart();
        playNormal();
    }
    refreshTexts();
    x();
}

function x() {
    $('#i').text(currentPartIndex);
    $('#start').text(songPartsMap[currentPartIndex].start);
    $('#end').text(songPartsMap[currentPartIndex].end);
}

function prev() {
    currentPartIndex = currentPartIndex > -1 ? currentPartIndex - 1 : 0;
    seekPlayerToCurrentPartStart();
    playNormal();
    refreshTexts();
    x();
}

function makeItFaster() {
    //currentPbRateIndex = (currentPbRateIndex < AVAILABLE_PLAYBACK_RATES.length)
    //    ? currentPbRateIndex + 1 : currentPbRateIndex;

    if(currentPbRateIndex < NORMAL_PLAYBACK_RATE_INDEX - 1)
        currentPbRateIndex = currentPbRateIndex + 1;

    currentPbRate = AVAILABLE_PLAYBACK_RATES[currentPbRateIndex];
    refreshSpeedText();
    console.log('currentPbRateIndex', currentPbRateIndex);
}

function makeItSlower() {
    if(currentPbRateIndex > 0)
        currentPbRateIndex = currentPbRateIndex - 1;

    currentPbRate = AVAILABLE_PLAYBACK_RATES[currentPbRateIndex];
    refreshSpeedText();
    console.log('currentPbRateIndex', currentPbRateIndex);
}

function resetToDefaultSlowerSpeed() {
    currentPbRateIndex = NORMAL_PLAYBACK_RATE_INDEX;
    refreshSpeedText();
}

function refreshSpeedText() {
    //var speed = currentPbRate == 1 ? 'Normalx' : currentPbRate;
    $("#speed").text(currentPbRate);
}

$('#play').on('click', function() { player.playVideo()});
$('#pause').on('click', function() { player.pauseVideo()});
$('#normal').on('click', playNormal);
$('#prev').on('click', prev);
$('#next').on('click', function() { next(true) });
$('#faster').on('click', makeItFaster);
$('#slower').on('click', makeItSlower);
$('#reset-to-default-slower-speed').on('click', resetToDefaultSlowerSpeed);
$('#mute').on('click', function() { player.mute(); });

$('#slow').mousedown(function() {
    player.setPlaybackRate(currentPbRate);
});
$('#slow').mouseup(function() {
    player.setPlaybackRate(NORMAL_PLAYBACK_RATE);
});