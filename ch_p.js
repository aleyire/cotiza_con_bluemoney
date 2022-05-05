const child_process = require('child_process')
const arg = process.argv.slice(2) //*
const nombre_archivo = arg[0] //*
const extension = arg[1] //*
const indicador = arg[2] //*
const pesos = Number.parseFloat(arg[3]) //* el argumento 3 es un número con decimales

child_process.exec(
  `node script.js ${nombre_archivo} ${extension} ${indicador} ${pesos}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`Mensaje: ${stdout}`)
  }
)
