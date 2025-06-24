console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('ASSETS/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Aaoge tum Kabhi", filepath: "ASSETS/1.mp3", coverPath: "ASSETS/aaoge tum kabhi.jpg"},
    {songName: "Choo lo", filepath: "ASSETS/2.mp3", coverPath: "ASSETS/choo lo.jpg"},
    {songName: "Choomantar", filepath: "ASSETS/3.mp3", coverPath: "ASSETS/choomantar.jpg"},
    {songName: "Paaro", filepath: "ASSETS/4.mp3", coverPath: "ASSETS/paro.jpg"},
    {songName: "Tu hai ke nahi", filepath: "ASSETS/5.mp3", coverPath: "ASSETS/tu hai ke nahi.jpg"},
    {songName: "Tu jo hain", filepath: "ASSETS/6.mp3", coverPath: "ASSETS/tu jo hai.jpg"},
    {songName: "Tum se hi", filepath: "ASSETS/7.mp3", coverPath: "ASSETS/tum se hi.jpg"},
]


//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        const currentSongIcon = document.getElementById(songIndex + 1);
      
         if (currentSongIcon) {
            currentSongIcon.classList.remove('fa-play-circle');
            currentSongIcon.classList.add('fa-pause-circle');
        }

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

         const currentSongIcon = document.getElementById(songIndex + 1); // Assuming 1-based IDs for icons
         if (currentSongIcon) {
            currentSongIcon.classList.remove('fa-pause-circle');
            currentSongIcon.classList.add('fa-play-circle');
         }
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //Update the Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
    
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100 ;
})


const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
     })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        const clickedElement = e.target;
        songIndex = parseInt(clickedElement.id) -1 ;

                    makeAllPlays();
             clickedElement.classList.remove('fa-play-circle');
            clickedElement.classList.add('fa-pause-circle');
    
        audioElement.src = songs[songIndex].filepath;
         masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        });
    });

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex === songs.length-1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filepath;
      masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
         gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = songs.length - 1; // Wrap around to the last song
    }
    else{
        songIndex -= 1;
    }
     audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
     gif.style.opacity = 1;
});