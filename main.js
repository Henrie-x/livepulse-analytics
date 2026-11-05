    const currentReading = document.getElementById("currentReading");
    const averageReading = document.getElementById("averageReading");
    const peakReading = document.getElementById("peakReading");
    const readingCount = document.getElementById("readingCount")
    const pauseBtn = document.getElementById("pauseBtn")
    const trendLine = document.getElementById("trendLine")
    const currentPoint = document.getElementById("currentPoint")
    const statusText = document.getElementById("statusText")
    const readingPoints = document.getElementById("readingPoints")
    
    let readings = [120, 135, 128, 150, 142, 165]
    let timer;
    let isPaused = false
    //readings.push(180)
    
    
    function updateDashboard() {
        readingPoints.innerHTML = "";
        const simulation = Math.floor(Math.random() * 101) + 100
        readings.push(simulation)
        readings = readings.slice(-10);
        
        const minReading = Math.min(...readings);
        const maxReading = Math.max(...readings);
        const range = maxReading - minReading;
        
        const latest = readings[readings.length - 1]
        const lastIndex = readings.length - 1
        
        const latestPercentage = range === 0 ? 0.5 : (latest - minReading) / range;
        
        const cx = lastIndex * (600 / (readings.length - 1))
        const cy = 180 - (latestPercentage * 160);
        
        const sumRead = readings.reduce((acc, curr) => acc + curr, 0)
        const average = Math.round(sumRead / readings.length)
        const peak = Math.max(...readings);
        
        let points = readings.map((reading, index) => {
            let x = index * (600 / (readings.length - 1))
            const percentage = range === 0 ? 0.5 : (reading - minReading) / range;
            
            const y = 180 - (percentage * 160);
            
            return `${x},${y}`
        }).join(" ")
        
        
        const circles = readings.map((reading,index) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg","circle")
            
            const x = index * (600 / (readings.length - 1));
            const percentage = range === 0 ? 0.5 : (reading - minReading) / range;
            const y = 180 - (percentage * 160);
            
            circle.setAttribute("cx",x)
            circle.setAttribute("cy",y)
            circle.setAttribute("r",3)
            circle.setAttribute("fill","#7d9cff")
            
            readingPoints.appendChild(circle)
        })
        
        //console.log(points)
        
        trendLine.setAttribute("points",points)
        currentPoint.setAttribute("cx",cx)
        currentPoint.setAttribute("cy",cy)
        currentReading.textContent = latest
        averageReading.textContent = average
        peakReading.textContent = peak
       readingCount.textContent = `${readings.length} readings`
    }
    
    
    updateDashboard();
    
    function startUpdates() {
        timer = setInterval(() => {
            updateDashboard()
        }, 1000)
    }
    
    startUpdates()
    
    pauseBtn.addEventListener("click",() => {
        if(isPaused) {
            startUpdates()
            pauseBtn.textContent = "Pause";
            statusText.textContent = "Live updates active"
            isPaused = false
        }else {
            clearInterval(timer)
            pauseBtn.textContent = "Resume";
            statusText.textContent = "Updates paused"
            isPaused = true
        }
    })
