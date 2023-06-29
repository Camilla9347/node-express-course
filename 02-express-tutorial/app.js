const http = require('http')
const {readFileSync} = require('fs')

//get all files
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const HomeImage = readFileSync('./navbar-app/logo.svg')
const HomeLogic = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req,res)=>{
    //console.log(req.method)
    //console.log(req.url)
    const url = req.url
    console.log(url)
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/html'}) // i tell you what my response is // media type
        res.write(homePage)
        res.end()
    //styles
    } else if(url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'}) // i tell you what my response is // media type
        res.write(homeStyles)
        res.end()
    // image/logo
    } else if(url === '/logo.svg'){
        res.writeHead(200, {'content-type': 'image/svg+xml'}) // i tell you what my response is // media type
        res.write(HomeImage)
        res.end()
    } else if(url === '/browser-app.js'){
        res.writeHead(200, {'content-type': 'text/javascript'}) // i tell you what my response is // media type
        res.write(HomeLogic)
        res.end()
    } else {
        res.writeHead(404, {'content-type': 'text/html'}) // i tell you what my response is // media type
        res.write('<h1> Page not found </h1>')
        res.end() 
    }
       
})
server.listen(4550)
