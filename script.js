// (1). Recibir por la línea de comando los siguientes argumentos: a) Nombre del archivo, b) Extensión del archivo, c) Indicador económico, d) Cantidad de pesos a convertir.
const arg = process.argv.slice(2)
const nombre_archivo = arg[0] 
const extension = arg[1]
const indicador = arg[2]
const pesos = Number.parseFloat(arg[3])

// (2). Consultar la API con el módulo https y almacenar la respuesta en una variable.
const https = require('https')
const fs = require('fs') 

https
  .get('https://mindicador.cl/api', (resp) => {
    let data = '' 
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end' , () => {
      const body = JSON.parse(data)
      const valor = body[indicador].valor 
      const fecha = body[indicador].fecha 
      const total = (pesos / valor).toFixed(2) 

      // (3). Crear un archivo con el módulo fs cuyos datos están formados por los argumentos recibidos por línea de comando y su contenido basado en el template de la descripción.
      fs.readFile('archivo.txt', 'utf8', (err, data) => {
        fs.writeFile(
          `${nombre_archivo}.${extension}`,
          `A la fecha: ${fecha}, fué realizada la cotización con los siguientes datos: Cantidad de pesos a convertir: ${pesos} pesos, Convertido a ${indicador} da un total de: ${total} dolares`,
          'utf8',
          () => {
            console.log('Datos ingresados con éxito')
          }
        )
      })
    })
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message)
  })
