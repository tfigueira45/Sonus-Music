
var playButtom = document.getElementById('playButtom')
var cron
var time = document.getElementById('time')
var img = document.getElementById('img')
var soundButtom = document.getElementById('soundButtom')
let count = 0
var som = document.getElementById('som')
var ipt = document.createElement('input')
var tak = document.getElementById('tak')
var m = document.getElementById('m')
var audio = document.getElementById('audio')
var nextButtom = document.getElementById('nextButtom')
var titulo = document.getElementById('titulo')
var isRandom = false
var isPlaying = false
var alreadyPlayed = []

function mudarSVG(){
    if(isPlaying == false){
        playButtom.innerHTML = "<svg width='25' height='28' viewBox='0 0 25 28' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M22.5 9.66987C25.8333 11.5944 25.8333 16.4056 22.5 18.3301L7.50001 26.9904C4.16667 28.9149 0 26.5093 0 22.6603V5.33975C0 1.49075 4.16667 -0.914883 7.5 1.00962L22.5 9.66987Z' fill='#D9D9D9'/></svg>"
    }else{
        playButtom.innerHTML = "<svg width='25' height='28' viewBox='0 0 27 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='10' height='40' rx='3' fill='#D9D9D9'/><rect x='17' width='10' height='40' rx='3' fill='#D9D9D9'/></svg>"
    }
}



function save(){
    setInterval(() => {localStorage.setItem('currentTime',audio.currentTime)},1000)
    
}
function load_data(){
    if(localStorage.getItem('count')==undefined){
        count = 0 
        localStorage.setItem('count',count)
    }else{
        count = Number(localStorage.getItem('count'))
        localStorage.setItem('count',count)
    }
    if(localStorage.getItem('inf')=='ccaa'){
        inf = ccaa
    }else{
        inf = internacionais
    }
    
}

function load_Track(index){
    localStorage.setItem('count',index)
    localStorage.setItem('inf',inf[0].array)
    audio.src = 'musics/' + inf[index].path
    audio.play()
    m.innerText = inf[count].title +' • ' + inf[count].artist
    titulo.innerText = inf[count].title +' • ' + inf[count].artist
    console.log(index)
    alreadyPlayed.push(Object({playlist:inf[0].array,número:count}))
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
    
}
function load_currentTime(){
    audio.currentTime = localStorage.getItem('currentTime')
}
function reset(){
    time.value = 0
}
function valor(){
    var duraçao = Math.trunc(audio.duration)
    time.max = duraçao
}
function duration(){
    document.getElementById('audio').play()
    time.value = audio.currentTime
}
function starttime() {
    cron = setInterval(() => {duration();}, 1000)
}
function pausetime(){
    clearInterval(cron)
}
function play_track() {
    isPlaying = true
    audio.play()
    starttime()
    mudarSVG()
    playButtom.onclick = pause_track
    
}
function pause_track(){
    isPlaying = false
    audio.pause()
    pausetime()
    mudarSVG()
    playButtom.onclick = play_track
}

function start_track(){
    isPlaying = true
    load_data()
    load_currentTime()
    starttime()
    mudarSVG()
    playButtom.onclick = pause_track
    load_Track(count)
    
}



function du(){
    audio.currentTime = time.value
    if(audio.onpause){
        starttime()
    }
}
function criar(){
    var div = document.createElement('div')
    som.appendChild(div)
    div.style.background = 'rgba(35, 35, 45)'
    div.style.width = '28px'
    div.style.height = '140px'
    div.style.position = 'fixed'
    div.style.bottom = '50px'
    if(Number(window.innerHeight) <= 570 || Number(window.innerWidth) <= 370){
        div.style.left = '10px'
        ipt.style.left = '-42px'
        ipt.style.bottom = '110px'
    }else{
        div.style.bottom = '70px'
        div.style.right = '122px'
        ipt.style.right = '70px'
        ipt.style.bottom = '130px'
    }
    div.style.borderRadius = '10px'
    div.id = 'divipt'
    ipt.id = 'ipt'
    ipt.type = 'range'
    ipt.value = audio.volume*100
    ipt.onchange = volume
    ipt.style.position = 'fixed'
    ipt.style.transform = 'rotate(-90deg)'
    div.appendChild(ipt)
    soundButtom.onclick = excluir
}
function excluir(){
    var div = document.getElementById('divipt')
    som.removeChild(div)
    soundButtom.onclick = criar
}

function volume(){
    audio.volume = ipt.value/100
}
function next(){
    if(count < inf.length - 1 && isRandom === false){
        count++;
    }else if(count < inf.length - 1 && isRandom === true){
        count = Number.parseInt(Math.random() * inf.length);
    }else{
        count = 0;
    }
    load_Track(count);
    
}

function back(){
    count--
    console.log(count)
    audio.src = 'musics/' + inf[count].path
    audio.play()
    reset()
    valor()
    m.innerText =inf[count].title +' • ' + inf[count].artist
    titulo.innerText = inf[count].title +' • ' + inf[count].artist
    document.getElementById('ul'+(count+1)).style.color = 'darkcyan'
    document.getElementById('ul'+count).style.color = 'blue'
    document.getElementById('artistUl'+(count+1)).style.color = 'darkcyan'
    document.getElementById('artistUl'+count).style.color = 'blue'
    localStorage.setItem('count',count)
}




function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    load_data()
    count = Math.floor(Math.random() * inf.length);
    load_Track(count)
    isRandom = true;
    document.querySelector('svg.alSVG').style.fill = "#137aaa"
}
function pauseRandom(){
    isRandom = false;
    document.querySelector('svg.alSVG').style.fill = "#D9D9D9"

}



var loopButtom = document.getElementById('loopButtom')
var loopSVG = document.querySelector('svg.loopSVG')

function loop(){
    audio.loop = true
    loopSVG.style.fill = "#137aaa"
    loopButtom.onclick = dloop
}
function dloop(){
    audio.loop = false
    loopSVG.style.fill = "#D9D9D9"
    loopButtom.onclick = loop
}
function display_lyric(){
    document.querySelector('svg.lyricSVG').style.fill = "#137aaa"
    var lyricDiv = document.createElement('div')
    lyricDiv.id = 'lyricDiv'
    lyricDiv.style.height = (window.innerHeight - propriedades2.height+2) + 'px'
    lyricDiv.innerHTML= inf[count].Lyrics
    document.body.appendChild(lyricDiv)
}
var controls = document.getElementsByClassName('controls-box')

var lista = document.getElementById('lista')
var propriedades = lista.getBoundingClientRect()
var propriedades2 = tak.getBoundingClientRect()
let musics = document.getElementById('musics')
var num = []
var btn = document.getElementById('btn')

function criarLIs(dados){
    var ch = document.getElementById('c')
    ch.oninput = selectAll
    ch.hidden = false
    for (let index = 0; index < dados.length; index++) {
        function imgPlay(){
            isPlaying = true
            localStorage.setItem('count',count)
            if(localStorage.getItem('inf')=='ccaa'){
                inf = ccaa
            }else{
                inf = internacionais
            }
            count = Number(imagem.id)
            console.log(count)
            audio.src = 'musics/' + inf[count].path
            starttime()
            audio.play()
            reset()
            valor()
            alreadyPlayed.push(Object({playlist:inf[0].array,número:count}))
            m.innerText = inf[count].title +' • ' + inf[count].artist
            titulo.innerText = inf[count].title +' • ' + inf[count].artist
            playButtom.onclick = pause_track
            mudarSVG()
            localStorage.setItem('count',count)
            document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
            document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'
            document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
            document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'

            
        }
        let div = document.createElement('div')
        let imagem = document.createElement('img')
        let ul = document.createElement('ul')
        let artistUl = document.createElement('ul')
        let inpCheck = document.createElement('input')
        artistUl.id = 'artistUl' + index + dados[0].array
        ul.id = 'ul' + index + dados[0].array
        imagem.id = index
        imagem.onclick = imgPlay
        imagem.src = dados[index].img
        imagem.style.position = 'relative'
        imagem.style.top = '6px'
        div.className = 'divPlay'
        div.style.height = '50px'
        div.style.position = 'relative'
        div.style.left = '20px'
        ul.innerText = dados[index].title
        ul.style.position = 'relative'
        ul.style.top = '-58px'
        ul.style.left = '40px'
        artistUl.style.position = 'relative'
        artistUl.style.left = Number(window.innerHeight) <= 570 || Number(window.innerWidth) <= 370?'40px':'400px'
        artistUl.style.top = Number(window.innerHeight) <= 570 || Number(window.innerWidth) <= 370?'-81px':'-110px'
        artistUl.style.fontSize = Number(window.innerHeight) <= 570 || Number(window.innerWidth) <= 370?'12pt':'17pt'
        artistUl.innerText = dados[index].artist
        inpCheck.type = 'checkbox'
        inpCheck.className = 'checkbox'
        inpCheck.id = 'checkbox'+index
        inpCheck.value = index
        var menu = document.createElement('span')
        function l(){
            if(inpCheck.checked == true){
                document.getElementById('c').checked = true
                document.getElementById('c').oninput = desactSelectAll
                num.push(inpCheck.value)
                menu.className = 'material-symbols-outlined'
                menu.innerHTML = 'more_horiz'
                menu.style.position = 'relative'
                menu.style.left = '50px'
                menu.style.top = '-1640px'
                menu.style.cursor = 'pointer'
                musics.appendChild(menu)
            }else{
                document.getElementById('c').checked = false 
                document.getElementById('c').oninput = selectAll
                num.pop(inpCheck.value)
                musics.removeChild(menu)
            }
            localStorage.setItem(inpCheck.id,inpCheck.value)
            localStorage.setItem('num',num)
        }
        inpCheck.oninput = l
        inpCheck.style="height: 20px;width: 20px;position : relative; left: -4px;top: -2px"
        document.getElementById('info').appendChild(div)
        div.appendChild(inpCheck)
        div.appendChild(imagem)
        div.appendChild(ul)
        div.appendChild(artistUl)  
    }
}

function css(){
    controls.style.position = 'fixed'
    controls.style.top = String(window.innerHeight-71+8) + 'px'
   
    
}

var h1 = document.getElementById('h1')
function resize(){
    
    h1.style.fontFamily = "'Caveat', cursive"
    var p1 = document.getElementById('p1')
    p1.style.position  = 'relative'
    p1.style.left = '100px'
    p1.style.top = '45px'
    musics.appendChild(h1)
    if(Number(window.innerHeight) <= 570 || Number(window.innerWidth) <= 370){
        body.removeChild(lista)
        tak.removeChild(m)
        
        
        
        document.getElementById('p1').style.position = 'relative'
        document.getElementById('p1').style.top = '25px'
        document.getElementById('p1').style.fontSize = '14pt'
        document.getElementById('alButtom').style.right = '3px'
        document.getElementById('alButtom').style.bottom = '10px'
        document.getElementById('loopButtom').style.right = '30px'
        document.getElementById('loopButtom').style.bottom = '10px'
        document.getElementById('soundButtom').style.left = '-200px'
        document.getElementById('soundButtom').style.bottom = '6px'
       
        time.style.width = window.innerWidth+'px'
        h1.style.position = 'relative'
        h1.style.left = '20px'
        h1.style.top = '-1630px'
    
    }
}
function retornar(){
    musics.innerHTML = " <div id='int'><a onclick='select()' id='l1'>Internacionais</a><br><br><a onclick='select2()' id='l2'>CCAA</a></div><h1 id='h1'></h1><input type='checkbox'  id='c' hidden style='height: 20px;width: 20px;position : relative; left: 16px;top: 95px' oninput='selectAll()' ><p id='p1'></p><br><div id='info'></div>"
    resize()
}
var inf

function select(){
    var int = document.getElementById('int')
    musics.removeChild(int)
    inf = internacionais
    criarLIs(inf)
    p1.innerText  = 'Música'
    h1.innerText= 'Internacionais'
    h1.style.top = '-1630px'
    var voltar = document.createElement('button')
    voltar.style.position = 'fixed'
    voltar.style.top = '3px'
    voltar.innerText = '⬅Voltar'
    voltar.style.background = 'rgba(18, 18, 22, 1)'
    voltar.style.color = 'darkcyan'
    voltar.style.borderColor = 'rgba(18, 18, 22, 1)'
    voltar.onclick = retornar
    musics.appendChild(voltar)
    localStorage.setItem('inf','internacionais')
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-2)].número+internacionais[0].array).style.color = 'darkcyan'
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-1)].número+internacionais[0].array).style.color = 'blue'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-2)].número+internacionais[0].array).style.color = 'darkcyan'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-1)].número+internacionais[0].array).style.color = 'blue'
}

function select2(){
    var int = document.getElementById('int')
    musics.removeChild(int)
    inf = ccaa
    criarLIs(inf)
    p1.innerText  = 'Música'
    h1.innerText= 'Músicas Da ccaa'
    h1.style.top = '-270px'
    var voltar = document.createElement('button')
    voltar.style.position = 'fixed'
    voltar.style.top = '3px'
    voltar.innerText = '⬅Voltar'
    voltar.style.background = 'rgba(18, 18, 22, 1)'
    voltar.style.color = 'darkcyan'
    voltar.style.borderColor = 'rgba(18, 18, 22, 1)'
    voltar.onclick = retornar
    musics.appendChild(voltar)
    localStorage.setItem('inf','ccaa')
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
    document.getElementById('ul'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-2)].número+inf[0].array).style.color = 'darkcyan'
    document.getElementById('artistUl'+alreadyPlayed[(alreadyPlayed.length-1)].número+inf[0].array).style.color = 'blue'
}

function restore3(){
    load_data()
    m.innerText = inf[count].title +' • ' + inf[count].artist
    
}

document.body.onresize = css;
window.onloadeddata = css,setTimeout(resize,200),setTimeout(restore3,2000)

function selectAll(){
    for(var p = 0; p < inf.length; p++){
        document.getElementById('checkbox'+p).checked = true
    }
    document.getElementById('c').oninput = desactSelectAll
}

function desactSelectAll(){
    for(var p = 0; p < inf.length; p++){
        document.getElementById('checkbox'+p).checked = false
    }
    document.getElementById('c').oninput = selectAll
}
