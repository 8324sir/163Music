$(function(){
    $.get('/lyric.json').then(function(object){
        let {lyric} = object
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
    })
    let audio = document.createElement('audio')
    audio.src = 'http://otpfh1rxr.bkt.clouddn.com/%E5%B2%81%E6%9C%88%E7%A5%9E%E5%81%B7-%E9%87%91%E7%8E%9F%E5%B2%90'
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
})