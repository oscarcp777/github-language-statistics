const data = dataPrs

function loadChart (series, id, categories, dataLabels, type) {
    Highcharts.chart(id, {
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#B2DFDB', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
        chart: {
            type: type, backgroundColor: 'transparent'
        },
        title: {
            text: 'GitHub Language Statistics JavaScript and TypeScript'
        },
        subtitle: {
            text: 'Source:  https://cloud.google.com/bigquery/public-data/github'
        },
        xAxis: {
            categories
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value * 100) + '%'
                }
            }
        },
        plotOptions: {
            spline: {
                lineWidth: 3,
                states: { hover: { lineWidth: 5 } },
                marker: { enabled: false }
            },
            area: {
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            },
            series: {
                animation: {
                    duration: 200
                },
                dataLabels: {
                    enabled: dataLabels,
                    formatter: function () {
                        return (this.y * 100).toFixed(2) + '%'
                    }
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<span style="color:' + this.series.color + '">'
                    + this.series.name + '</span>: <b>'
                    + (this.y * 100).toFixed(2) + '%</b>'
            }
        },
        series: series
    })
}

function getSeriesQuarter () {
    const langs = [
        { name: 'JavaScript', data: [] },
        { name: 'TypeScript', data: [] },
        { name: 'Java', data: [] },
        { name: 'Go', data: [] },
        { name: 'Scala', data: [] }
    ]
    const totals = {}
    data.forEach(({ name, year, quarter, count }) => {
        const total = totals[`${year}-${quarter}`]
        totals[`${year}-${quarter}`] = !total
            ? parseInt(count)
            : total + parseInt(count)
    })
    data.forEach(({ name, year, quarter, count }) => {
        const lang = langs.find((lang) => lang.name === name)
        if (lang) {
            lang.data.push(parseInt(count) / parseInt(totals[`${year}-${quarter}`]))
        }
    })
    const js = langs.find((lang) => lang.name === 'TypeScript')
    const ts = langs.find((lang) => lang.name === 'JavaScript')
    const jsts = { name: 'Js and TS', data: [] }
    ts.data.forEach((element, index) => {
        jsts.data.push(element + js.data[index])
    })
    langs.push(jsts)
    return langs
}
function getSeriesYear () {
    const langs = [
        { name: 'JavaScript', data: [] },
        { name: 'TypeScript', data: [] },
        { name: 'Java', data: [] },
        { name: 'Go', data: [] }
    ]
    const totalsLang = {}
    const totals = {}
    data.forEach(({ name, year, quarter, count }) => {
        const total = totals[year]
        totals[year] = !total
            ? parseInt(count)
            : total + parseInt(count)
        const totalLang = totalsLang[`${year}-${name}`]
        totalsLang[`${year}-${name}`] = !totalLang
            ? parseInt(count)
            : totalLang + parseInt(count)
    })
    console.log(totalsLang)
    data.forEach(({ name, year, quarter, count }) => {
        const lang = langs.find((lang) => lang.name === name)
        if (lang && quarter === '2') {
            const num = totalsLang[`${year}-${name}`]
            lang.data.push((parseInt(num) / parseInt(totals[year])))
        }
    })
    const js = langs.find((lang) => lang.name === 'TypeScript')
    const ts = langs.find((lang) => lang.name === 'JavaScript')
    const jsts = { name: 'Js and TS', data: [] }
    ts.data.forEach((element, index) => {
        jsts.data.push(element + js.data[index])
    })
    langs.push(jsts)
    return langs
}
console.log(getSeriesQuarter())
console.log(getSeriesYear())
const categories = [
    '2-2012', '3-2012', '4-2012',
    '1-2013', '2-2013', '3-2013',
    '4-2013', '1-2014', '2-2014',
    '3-2014', '4-2014', '1-2015',
    '2-2015', '3-2015', '4-2015',
    '1-2016', '2-2016', '3-2016',
    '4-2016', '1-2017', '2-2017',
    '3-2017', '4-2017', '1-2018',
    '2-2018', '3-2018', '4-2018',
    '1-2019', '2-2019', '3-2019',
    '4-2019', '1-2020', '2-2020'
]
const categories2 = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
]
loadChart(getSeriesQuarter(), 'container', categories, false, 'spline')
loadChart(getSeriesYear(), 'container2', categories2, true, 'area')
