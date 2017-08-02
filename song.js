$(function(){
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)

    $.get('./song.json').then(function(response){
        let songs =  response
        let song = songs.filter(function(s){
            return s.id === id
        })[0]
        let {url,lyric,name,bgimage,imgsrc} = song

        initPlayer.call(undefined,url)
        initText(name,lyric)
        initimg(bgimage,imgsrc)
        
        
    })
    //动态获取播放页面的背景图和封面图
    function initimg(bgimage,imgsrc){
        $('.page').css('background','url(' + bgimage + ') no-repeat center')
        $('.page').css('background-size','cover')
        $('.cover').attr('src',imgsrc)
    }

    //初始化播放页面的歌曲名称和歌词
    function initText(name,lyric){
        $('.song-description > h1').text(name)
        parseLyric(lyric)
    }

    //动态获取歌曲并添加播放和暂停按钮
    function initPlayer(url){
        let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay = function(){
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $('.pasue-play').on('click',function(){
            audio.pause()
            $('.disc-container').removeClass('playing')
        })
        $('.icon-play').on('click',function(){
            audio.play()
            $('.disc-container').addClass('playing')
        })
    }

    //动态添加播放页面的歌词
    function parseLyric(lyric){
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function(string,index){
            let matches = string.match(regex)
            if(matches){
                return {time: matches[1], words: matches[2]}
            }            
        })
        let $lyric = $('.lyric')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    }
})