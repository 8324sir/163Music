$(function(){
    $.get('./song.json').then(function(response){
        let items = response
        items.forEach(function(i){
            let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}"> 
                    <h3>${i.name}</h3>
                    <p>${i.sginfo}</p>
                    <svg class="play" aria-hidden="true">
                        <use xlink:href="#icon-play-circle"></use>
                    </svg>
                </a>
            </li>
            `)
            $('#laMusic').append($li) 
        })
        $('#laMusicloading').remove()
    })
    
    //监听事件
    $('.home-nav').on('click','ol.tab-items > li',function(e){
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        //console.log($li)
        let index = $li.index()
        //console.log(index)
        $li.trigger('tabChange',index)
        $('.tab-content > li').eq(index).addClass('active').siblings().removeClass('active')
    })

    $('.home-nav').on('tabChange',function(e,index){
        let $li = $('.tab-content > li').eq(index)
        if($li.attr('data-downloaded') === 'yes'){
            return
        }
        if(index === 1){
            $.get('./topsong.json').then(function(response){
                $li.attr('data-downloaded','yes')
            })
        }
        if(index === 2){
            $.get('./search.json').then(function(response){
                $li.attr('data-downloaded','yes')
            })
        }
    })
})