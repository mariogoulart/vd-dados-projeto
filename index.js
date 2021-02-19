//Define as margens
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 100, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

//Define a svg
const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

 //cria o grupo svg 
const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

//X label - Mes
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Mês")

//Y label - Valor
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Valor ($)")

// arquivo com dividendos recebidos em reias por mes
d3.csv("data/dividendos.csv").then(data => {
  data.forEach(d => {
    d.valor = Number(d.valor)
})

// band scale - largura das barras 
  const x = d3.scaleBand()
    .domain(data.map(d => d.mes))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)

// Escala linear  - altura barras
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.valor)])
    .range([HEIGHT, 0])
        
// Nome dos meses - rotulos meses   
  const xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

// Escala e valor - rotulos valor     
  const yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat(d => d + " R$")
  g.append("g")
    .call(yAxisCall)

// Seleciona todos os retangulos  
  const rects = g.selectAll("rect")
    .data(data)
 
// Retangulos de cada valor por mes    
  rects.enter().append("rect")
    .attr("y", d => y(d.valor))
    .attr("x", (d) => x(d.mes))
    .attr("width", x.bandwidth)
    .attr("height", d => HEIGHT - y(d.valor))
    .attr("fill", "green")
})