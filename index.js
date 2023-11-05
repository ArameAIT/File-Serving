import http from "node:http"
import url from "node:url"
import path from "node:path"
import { isFileExists, mimeTypes } from "./lib.js"
import fs from "node:fs/promises"
const server = http.createServer(async (req, res) => {
    const method = req.method
    const serverUrl = url.parse(req.url, true)
    if (method == "GET") {
        if (serverUrl.pathname == "/") {
            res.writeHead(302, {
                "Location": "index.html"
            })
            res.end()
        } else {
            try {

                const filePath = path.resolve("public", serverUrl.pathname.slice(1))
                const isFileFunc = await isFileExists(filePath)
                if (isFileFunc) {
// 
                    const fileData = await fs.readFile(filePath)
                    res.writeHead(200, {
                        "Content-Type":  mimeTypes(serverUrl.pathname.split(".")[1]),
                        "Content-Length": Buffer.byteLength(fileData)
                    })
                    res.write(fileData)
                    res.end()
                    return
                }
            }
            catch (err) {
                console.log(err);
            }
            const errorText = "404 not found"
            res.writeHead(404, {
                "Content-Type": "text/plain",
                "Content-Length": Buffer.byteLength(errorText)
            })
            res.write(errorText)
            res.end()
        }
    }
}).listen(3001, () => {
    console.log("Server is listening in 3001 port");
})