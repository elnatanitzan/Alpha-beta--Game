const $board = document.getElementById('board'),
    $voice = document.getElementById('voice'),
    numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
    $audioTag = document.getElementById('audio'),
    photosUrl = [
        { id: 1, url: "./photos/1.jpg", },
        { id: 2, url: "./photos/2.png", },
        { id: 3, url: "./photos/3.jpg", },
        { id: 4, url: "./photos/4.jpg", },
        { id: 5, url: "./photos/5.jpg", },
        { id: 6, url: "./photos/6.jpg", },
        { id: 7, url: "./photos/7.jpg", },
        { id: 8, url: "./photos/8.jpg", },
        { id: 9, url: "./photos/9.jpeg", },
        { id: 10, url: "./photos/10.jpg", },
        { id: 11, url: "./photos/11.jpg", },
        { id: 12, url: "./photos/12.jpg", },
        { id: 13, url: "./photos/13.jpg", },
        { id: 14, url: "./photos/14.jpg", },
        { id: 15, url: "./photos/15.jpg", },
        { id: 16, url: "./photos/16.png", },
        { id: 17, url: "./photos/17.jpg", },
        { id: 18, url: "./photos/18.jpg", },
        { id: 19, url: "./photos/19.jpg", },
        { id: 20, url: "./photos/20.jpg", },
        { id: 21, url: "./photos/21.jpg", },
        { id: 22, url: "./photos/22.jpg", },
    ],

    soundsUrls  = {
        male: {
            find: './audio/male/find.mp3',
            correct: './audio/male/correct.mp3',
            wrong: './audio/male/wrong.mp3',
            0: './audio/male/1.mp3',
            1: './audio/male/2.mp3',
            2: './audio/male/3.mp3',
            3: './audio/male/4.mp3',
            4: './audio/male/5.mp3',
            5: './audio/male/6.mp3',
            6: './audio/male/7.mp3',
            7: './audio/male/8.mp3',
            8: './audio/male/9.mp3',
            9: './audio/male/10.mp3',
            10: './audio/male/11.mp3',
            11: './audio/male/12.mp3',
            12: './audio/male/13.mp3',
            13: './audio/male/14.mp3',
            14: './audio/male/15.mp3',
            15: './audio/male/16.mp3',
            16: './audio/male/17.mp3',
            17: './audio/male/18.mp3',
            18: './audio/male/19.mp3',
            19: './audio/male/20.mp3',
            20: './audio/male/21.mp3',
            21: './audio/male/22.mp3'
        },
        female: {
            find: './audio/female/find.mp3',
            correct: './audio/female/correct.mp3',
            wrong: './audio/female/wrong.mp3',
            0: './audio/female/1.mp3',
            1: './audio/female/2.mp3',
            2: './audio/female/3.mp3',
            3: './audio/female/4.mp3',
            4: './audio/female/5.mp3',
            5: './audio/female/6.mp3',
            6: './audio/female/7.mp3',
            7: './audio/female/8.mp3',
            8: './audio/female/9.mp3',
            9: './audio/female/10.mp3',
            10: './audio/female/11.mp3',
            11: './audio/female/12.mp3',
            12: './audio/female/13.mp3',
            13: './audio/female/14.mp3',
            14: './audio/female/15.mp3',
            15: './audio/female/16.mp3',
            16: './audio/female/17.mp3',
            17: './audio/female/18.mp3',
            18: './audio/female/19.mp3',
            19: './audio/female/20.mp3',
            20: './audio/female/21.mp3',
            21: './audio/female/22.mp3'
        }   
    };

const playSound = (voice, sound) => {
    $audioTag.src = soundsUrls[voice][sound];
    $audioTag.play();
};

const genderVoice = (voice, sound) => {
    $audioTag.src = soundsUrls[voice][sound];
    $audioTag.play();
}

const playSounds = (number) => {
    playSound($voice.value, 'find');

    setTimeout(() => {
        playSound($voice.value, number);
    }, 4300)
}

const selectedAnswer = ($event) => {
    const isLiElement = $event.target.localName === "li";
    if (!isLiElement) { return false; }

    const currentSelectedAnswer = $event.target.dataset.id;
    const correctAnswer = $board.dataset.answer;

    const isPlayButton = $event.target.dataset.id === 'play-sound';

    if (isPlayButton) {
        return playSounds(correctAnswer);
    }
  
    if (currentSelectedAnswer === correctAnswer) {
        $board.classList.add('correct');
        genderVoice($voice.value, 'correct');

        setTimeout(() => {
            $board.classList.remove('correct');
            createLevel();
        }, 3000);

    } else {
        $board.classList.add('wrong');
        genderVoice($voice.value, 'wrong');

        setTimeout(() => {
            playSound($voice.value, currentSelectedAnswer);
        }, 3500);

        setTimeout(() => {
            playSound($voice.value, 'find');
        }, 5500);

        setTimeout(() => {
            playSound($voice.value, correctAnswer);
        }, 10000);

        setTimeout(() => {
            $board.classList.remove('wrong');
        }, 6000);
    }
}

const shuffle = (numberArray) => {
    let counter = numberArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = numberArray[counter];
        numberArray[counter] = numberArray[index];
        numberArray[index] = temp;
    }
    return numberArray;
} 

const createLevel = () => {
    $board.innerHTML = '';
    const random = Math.floor(Math.random() * 22);
    $board.dataset.answer = random;
    playSounds(random);
    const randomNumbers = shuffle(numbers);
    
    randomNumbers.forEach((number) => {
        const liElement = document.createElement('li');
        liElement.dataset.id = number;
        liElement.style.backgroundImage = "url(" + `${photosUrl[number].url}` + ")";
        liElement.style.backgroundPosition = "center"
        liElement.style.backgroundSize = "cover"
        $board.appendChild(liElement)
    });

    const playButton = document.createElement('li');
    playButton.classList.add('play-sound');
    playButton.dataset.id = 'play-sound';
    $board.appendChild(playButton);
}

createLevel();
$board.addEventListener('click', selectedAnswer);