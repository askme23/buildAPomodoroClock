window.onload = function() {
    const set_time = document.getElementById('set-time');
    const clock = document.getElementById('clock');
    const minus = document.getElementsByClassName('minus');
    const plus = document.getElementsByClassName('plus');
    const time = document.getElementsByClassName('counter')[0];
    let start = +time.getAttribute('data-start');
    let session = true;

    time.innerHTML = document.querySelector('.session .value').innerHTML + ':00';
    time.innerHTML = '0' + time.innerHTML;
   
 
    for(let i = 0; i < minus.length; i++) {
        minus[i].onclick = function() {
            const data = minus[i].getAttribute('data-title');

            if(+data === 1) {
                const value = document.querySelector('.break .value');

                if(+value.innerHTML  > 1) {
                    value.innerHTML = +value.innerHTML - 1;
                }
            } else if(+data === 2) {
                const value = document.querySelector('.session .value');

                if(+value.innerHTML > 1) {
                    value.innerHTML = +value.innerHTML - 1;

                    if(+value.innerHTML < 10) {
                        const val = value.innerHTML + ':00';
                        time.innerHTML = '0' + val;
                    } else {
                        time.innerHTML = value.innerHTML + ':00';
                    }
                }
            }
        };
    }

    for(let i = 0; i < plus.length; i++) {
        plus[i].onclick = function() {
            const data = plus[i].getAttribute('data-title');

            if(+data === 1) {
                const value = document.querySelector('.break .value');

                if(+value.innerHTML  < 60) {
                    value.innerHTML = +value.innerHTML + 1;
                }
            } else if(+data === 2) {
                const value = document.querySelector('.session .value');

                if(+value.innerHTML  < 60) {
                    value.innerHTML = +value.innerHTML + 1;
        
                    if(+value.innerHTML < 10) {
                        const val = value.innerHTML + ':00';
                        time.innerHTML = '0' + val;
                    } else {
                        time.innerHTML = value.innerHTML + ':00';
                    }
                }
            }
        };
    }

    clock.onclick = function() {
        let interval = 0;

        if(start === 0) {
            start = 1;
            time.setAttribute('data-start', start);
            interval = setInterval(startTimer, 1000, interval);
        } else if(start === 1) {
            start = 0;
            time.setAttribute('data-start', start);
            clearInterval(interval);
        }
    };

    function startTimer(interval) {
        let timer = time.innerHTML.split(':');
        let seconds = timer[1];
        let minets = timer[0];

        if(seconds === '00' && minets !== '00') {
            seconds = '59';
            if(+minets <= 10 && +minets > 0) {
                minets = +minets - 1;
                minets = '0' + minets;
            } else {
                minets = +minets - 1;
            }
        } else if(seconds === '00' && minets === '00'){
            clearInterval(interval);
            if(session == true) {
                session = false;
                document.querySelector('#clock .status').innerHTML = 'Break';

                if(+document.querySelector('.break .value').innerHTML < 10) {
                    time.innerHTML = document.querySelector('.break .value').innerHTML + ':00';
                    time.innerHTML = '0' + time.innerHTML;
                } else {
                    time.innerHTML = document.querySelector('.break .value').innerHTML + ':00';
                }

                interval = setInterval (startTimer, 1000, interval);
            } else {
                session = true;
                document.querySelector('#clock .status').innerHTML = 'Session';

                if(+document.querySelector('.session .value').innerHTML < 10) {
                    time.innerHTML = document.querySelector('.session .value').innerHTML + ':00';
                    time.innerHTML = '0' + time.innerHTML;
                } else {
                    time.innerHTML = document.querySelector('.session .value').innerHTML + ':00';
                }
            }
        } else if(+seconds <= 10 && +seconds > 0) {
            seconds = +seconds - 1;
            seconds = '0' + seconds;
        } else {
            seconds = +seconds - 1;
        }

        // console.log(minets, seconds);
        time.innerHTML = minets + ':' + seconds;
    }
};