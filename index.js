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
})