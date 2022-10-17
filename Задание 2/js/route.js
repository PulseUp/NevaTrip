
times_a=['2021-08-21T18:00:00Z','2021-08-21T18:30:00Z','2021-08-21T18:45:00Z','2021-08-21T19:00:00Z','2021-08-21T19:15:00Z','2021-08-21T21:00:00Z'];
times_b=['2021-08-21T18:30:00Z','2021-08-21T18:45:00Z','2021-08-21T19:00:00Z','2021-08-21T19:15:00Z','2021-08-21T19:35:00Z','2021-08-21T21:50:00Z','2021-08-21T21:55:00Z'];

let times__bb=[]
for (let u = 0; u < times_b.length; u++){
    let m = +new Date(times_b[u])
    times__bb.push(m - 10800000); //вычитание 10800000 означает чтобы значение часового пояса стали по UMT 0:00, т.к. в задании указано именно время по МСК

}
let times__aa=[]
for (let u = 0; u < times_a.length; u++){
    let m = +new Date(times_a[u])
    times__aa.push(m - 10800000);
}

document.getElementById("route").onchange=function() {
    document.getElementById("time").disabled = false;
    document.getElementById("time").innerHTML = "<option value='0'>Выберите время отправки</option>";
    timeab=this.value;
    fetch('http://ip-api.com/json')
        .then( res => res.json())
        .then(response => {
            let timezone = response.timezone;

    if (timeab == 1) {
        for (let i = 0; i < times_b[i+1].length; i++) {

            let la = new Date(times__aa[i]);
            latime = new Date(la).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ')
            document.getElementById("time").innerHTML += '<option value="' + (i + 1) + '">' + latime + '</option>';
            document.getElementById("timeab").style.display='none';
        }
    } else if (timeab == 2){
        for (let i = 0; i < times_b[i].length; i++) {

                    let lb = new Date(times__bb[i]);
                    lbtime = new Date(lb).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ')
            document.getElementById("time").innerHTML += '<option value="' + (i + 1) + '">' + lbtime + '</option>';
            document.getElementById("timeab").style.display='none';
        }
    }
    else if (timeab == 3){
        for (let i = 0; i < times_b[i+1].length; i++) {

                    let lab = new Date(times__aa[i]);
                    labtime = new Date(lab).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ')
            document.getElementById("time").innerHTML += '<option value="' + (i + 1) + '">' + labtime + '</option>';
            document.getElementById("timeab").style.display='block';
            document.getElementById("time").onchange=function() {
                document.getElementById("time__ab").disabled = false;
                document.getElementById("time__ab").innerHTML = "<option value='0'>Выберите время обратной отправки</option>";
                let i = document.getElementById("time").value
                let p = 0;
                let d = -1
                if (i<times_b.length+1){
                    for (p; p<times_b.length+1; p++, d++){
                    if (times__aa[i-1]+3000000 <= times__bb[p]){
                                let l = new Date(times__bb[p]);

                                ltime = new Date(l).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ')
                        document.getElementById("time__ab").innerHTML += '<option value="' + (d + 1) + '">' + ltime + '</option>';
                    }}
                  }
                else{
                    document.getElementById("time__ab").disabled = true;
                }
            }
        }
    }})
}


function summ() {
    let people = document.getElementById("summa").value;
    let punkt = document.getElementById("route").value;
    let i = document.getElementById("time").value;
    let c = document.getElementById("time__ab").value;
    fetch('http://ip-api.com/json')
        .then( res => res.json())
        .then(response => {
            let timezone = response.timezone;
    if (punkt == "0" || i==0 || people == 0)
            alert("Ошибка! Вы не выбрали маршрут/Не указали количество людей/Не выбрали время ")
        else if (punkt == "1") {
            let summa = people * 700;
            let timer_prib= times__aa[i-1]+3000000;
            let timer = times__aa[i-1];
        timerical = new Date(timer).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
        timerical__prib = new Date(timer_prib).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
        document.getElementById("result__div").style.display='block';
        document.getElementById("result").innerHTML =
            `<p> Вы выбрали ${people} билет(а) по маршруту из A в B стоимостью ${summa} р.</p>
            <p> Это путешествие займет у вас 50 минут. </p>
            <p> Теплоход отправляется в ${timerical}, а прибудет в ${timerical__prib}. </p>`

        } else if (punkt == "2") {
            let summa = people * 700;
            let timer_prib= times__bb[i-1]+3000000;
            let timer = times__bb[i-1];
            timerical = new Date(timer).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
            timerical__prib = new Date(timer_prib).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
            document.getElementById("result__div").style.display='block';
            document.getElementById("result").innerHTML =
            `<p> Вы выбрали ${people} билет(а) по маршруту из A в B стоимостью ${summa} р.</p>
            <p> Это путешествие займет у вас 50 минут. </p>
            <p> Теплоход отправляется в ${timerical}, а прибудет в ${timerical__prib}. </p>`

        } else if (punkt == "3") {
            let summa = people * 1200;
            let timer__a = times__aa[i-1];
            timerical__a = new Date(timer__a).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
            let timer_prib__a= times__aa[i-1]+3000000;
            timerical__prib__a = new Date(timer_prib__a).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
            let timer__b = times__bb[c];
            timerical__b = new Date(timer__b).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
        let timer_prib__b= times__bb[c]+3000000;
            timerical__prib__b = new Date(timer_prib__b).toLocaleTimeString('ru',{timeZone : timezone}).match(/\d{2}:\d{2}|[AMP]+/g).join(' ');
            document.getElementById("result__div").style.display='block';
            document.getElementById("result").innerHTML =
                `<p>Вы выбрали ${people} билет(а) по маршруту из A в B и обратно в А стоимостью ${summa} р. </p> 
                <p> Это путешествие займет у вас 1 час 40 минут.</p> 
                <p> Теплоход отправляется в пункт А в ${timerical__a}, а прибудет в пункт В ${timerical__prib__a}.</p>
                <p> Обратно в пункт А  теплоход отравится в ${timerical__b} и прибудет в ${timerical__prib__b}.</p>`
        }
        })
    }

