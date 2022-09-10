const rand = () => { return Math.floor(Math.random() * 10) }
const statistic = document.querySelector('.statistics')
let startIterat;
const counter = {
    total: 0,
    Zero: 0,
    One: 0,
    Two: 0,
    Three: 0,
    Four: 0,
    Five: 0,
    Six: 0,
    Seven: 0,
    Eight: 0,
    Nine: 0,
}



const labels = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Count of pseudo-random integer from 0 to 9.',
        backgroundColor: 'rgb(72, 220, 77)',
        borderColor: 'rgb(72, 220, 77)',
        color: '#FFF1',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
};

//chart  linar config 

const myChart = new Chart(
    document.getElementById('myChart'),
    {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#FFFFFF'
                    }
                }
            },

            scales: {
                y: {
                    ticks: {
                        color: "#FFFFFF",
                        textStrokeColor: "#FFFFFF"
                    }
                },
                x: {
                    ticks: {
                        color: "#FFFFFF",
                        textStrokeColor: "#FFFFFF"
                    }
                }
            }
        }
    });
//chard config end

//horizontal chart config
const horChart = new Chart(
    document.getElementById("horChart"),
    {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Count of pseudo-random integer from 0 to 9.",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            legend: { display: false },
            title: {

                display: true,
                text: "Count of pseudo-random integer from 0 to 9."
            },
            scales: {
                y: {
                    ticks: {
                        color: "#FFFFFF",
                        textStrokeColor: "#FFFFFF"
                    }
                },
                x: {
                    ticks: {
                        color: "#FFFFFF",
                        textStrokeColor: "#FFFFFF"
                    }
                }
            }
        }
    });
//horizontal chart config end

//radar chart config
// const radarChart = new Chart(
//     document.getElementById('radarChart'),
//     {
//         type: 'radar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Count of pseudo-random integer from 0 to 9.',
//                 data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//                 fill: true,
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 borderColor: 'rgb(255, 99, 132)',
//                 pointBackgroundColor: 'rgb(255, 99, 132)',
//                 pointBorderColor: '#fff',
//                 pointHoverBackgroundColor: '#fff',
//                 pointHoverBorderColor: 'rgb(255, 99, 132)'
//             }]
//         },
//         options: {
//             elements: {
//                 line: {
//                     borderWidth: 3
//                 }
//             },
//             scales: {
//                 y: {
//                     ticks: {
//                         color: "#FFFFFF",
//                         textStrokeColor: "#FFFFFF"
//                     }
//                 },
//                 x: {
//                     ticks: {
//                         color: "#FFFFFF",
//                         textStrokeColor: "#FFFFFF"
//                     }
//                 }
//             }
//         },
//     });
//radar chart end 
function updateChart(chart, data) {
    chart.data.datasets[0].label = `Count of pseudo-random integer from 0 to 9. Count of iteration ${data.total}`
    chart.data.datasets[0].data = getArr(data)
    chart.update()
}

function getArr(data) {
    let final = []
    for (let key in data) {
        if (key == 'total') {
            continue
        }
        final.push(data[key])
    }
    return final
}

function formTable(data) {
    let finalHTML = ''
    for (let key in data) {
        if (key == 'total') {
            finalHTML += `<tr><td>Total iteration</td><td>${data[key]}</td></tr>`
            continue;
        }
        finalHTML += `<tr><td>${key}: </td><td>${data[key]}</td></tr>`
    }

    return `<table>${finalHTML}</table>`
}

function start() {
    if (startIterat) {
        return console.log(`allready started`)
    }
    startIterat = setInterval(function () {
        if (counter.total % 100 === 0) {
            updateChart(myChart, counter)
            updateChart(horChart, counter)
            //updateChart(radarChart, counter)
            //statistic.innerHTML = formTable(counter)
        }
        let result = rand()
        counter.total++
        switch (result) {
            case 0:
                counter.Zero++
                break;
            case 1:
                counter.One++
                break;
            case 2:
                counter.Two++
                break;
            case 3:
                counter.Three++
                break;
            case 4:
                counter.Four++
                break;
            case 5:
                counter.Five++
                break;
            case 6:
                counter.Six++
                break;
            case 7:
                counter.Seven++
                break;
            case 8:
                counter.Eight++
                break;
            case 9:
                counter.Nine++
                break;
        }
    }, 20)
}
function stop() {
    clearInterval(startIterat)
    return startIterat = false
}

function changeChart() {
    let charts = document.querySelectorAll('.chart')
    console.log(charts)
    for (let i = 0; i < charts.length; i++) {
        (Array.prototype.indexOf.call(charts[i].classList, "chartHidden") === -1) ? charts[i].classList.add('chartHidden') : charts[i].classList.remove('chartHidden');
    }
}

function clear(obj) {
    clearInterval(startIterat)
    for (let key in obj) {
        obj[key] = 0
    }
    updateChart(myChart, obj)
    updateChart(horChart, obj)
   // updateChart(radarChart, obj)
    statistic.innerHTML = formTable(obj)
    return startIterat = false
}


const btnStart = document.querySelector('.btn-start')
btnStart.onclick = () => { start() }
const btnStop = document.querySelector('.btn-end')
btnStop.onclick = () => { stop() }
const btnClear = document.querySelector('.btn-clear')
btnClear.onclick = () => { clear(counter) }
const btnChangeChard = document.querySelector('.btn-switch')
btnChangeChard.onclick = () => { changeChart() }

