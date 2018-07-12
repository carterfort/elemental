let ChartComponent = {
    props: ['element'],
    template: `
            <div class="chart">
                Display the chart data here
            </div>
            `,
    data() {
        return {
            chart: false
        }
    },
    mounted() {
        this.chart = this.myChart
    },
    computed: {
        myChart() {
            return Highcharts.chart(this.$el, {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: this.element.name + " (" + this.element.symbol + ")"
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: false
                    }
                },
                yAxis: {
                    title : {
                        text : "KJ/mol"
                    },
                    type: 'logarithmic'
                },
                series: [{
                    name: this.element.name,
                    data: this.element.data,
                    tooltip: {
                        pointFormatter() {
                            return `Electrons Removed : ${this.x}<br/>KJ/mol: ${this.y.toLocaleString()}`
                        }
                    }
                }],
                credits: {
                    enabled: false
                }
            });
        }
    }
}

new Vue({
    el: '#app',
    components: {
        ChartComponent
    },
    data() {
        return {
            elementSearch: ''
        }
    },
    computed: {
        elements() {
            return elements.filter(e => {
                if (this.elementSearch) {
                    let search = this.elementSearch.toLowerCase();
                    return e.name.includes(search) || e.symbol.includes(search)
                }

                return true;
            })
        }
    }
})