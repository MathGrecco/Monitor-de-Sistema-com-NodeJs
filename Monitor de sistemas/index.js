const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const folderName = "logs"
const fileName = "logs.txt"

const folderPath = path.join(__dirname, folderName)
const filePath = path.join(folderName, fileName)

if(!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
}

function logSystemInfo() {
    const now = new Date()
    const dateTime = now.toLocaleString()
    const systemInfo = `
        Data e hora: ${dateTime}
        Sistema operacional: ${os.type()}
        Versão do SO: ${os.release()}
        Arquitetura do SO: ${os.arch()}
        Info da Cpu: ${os.cpus().map(cpu => cpu.model).join(", ")}
        Memória total: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
        Memória livre: ${(os.freemem()/ 1024 / 1024).toFixed(2)} MB
        Tempo de atividade: ${(os.uptime() / 60 / 60).toFixed(2)} horas
        Usuário Atual: ${os.userInfo().username}
    `
    fs.appendFileSync(filePath, systemInfo)
    console.log(`Log gerado em ${dateTime}`)
}

setInterval(logSystemInfo, 10000)

logSystemInfo()
