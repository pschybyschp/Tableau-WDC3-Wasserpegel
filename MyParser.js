import { Parser } from '@tableau/taco-toolkit/handlers'

export default class MyParser extends Parser {
  parse(fetcherResult, { dataContainer }) {
    const tableName = 'WDC'

    const containerBuilder = Parser.createContainerBuilder(dataContainer)
    const { isNew, tableBuilder } = containerBuilder.getTable(tableName)

    if (isNew) {
      tableBuilder.addColumnHeaders([ 
      {
        id: 'uuid',
        dataType: 'string',
      },
      {
        id: "shortname",
        alias: "station, short",
        dataType: 'string',
      },
      {
        id: 'longname',
        alias: 'station, long',
        dataType: 'string',
      },
      {
        id: 'km',
        dataType: 'string',
      },
      {
        id: 'agency',
        alias: 'agency',
        dataType: 'string',
      },
      {
        id: 'longitude',
        alias: 'LNG',
        columnRole: 'dimension',
        dataType: DataType.String,
      },
      {
        id: 'latitude',
        alias: 'LAT',
        columnRole: 'dimension',
        dataType: DataType.String,
      },
      {
        id: 'watershort',
        alias: 'water',
        dataType: 'string',
      },
      {
        id: 'waterlong',
        alias: 'water, long',
        dataType: 'string',
      }, 
        ])
      }

    log(fetcherResult)
    log(fetcherResult.length) 
    var anzahl = fetcherResult.length
    var longi = "";

    tableBuilder.addRows(
      fetcherResult.map((row) => {

        if (row.longitude== null) {
          longi = '';
        } else {
          longi = row.longitude;
            };


        return {
          uuid: row.uuid,
          shortname: row.shortname,
          longname: row.longname,
          km: row.km,
          agency: row.agency,
          longitude: longi,
          latitude: row.latitude,
          watershort: row.water.shortname,
          waterlong: row.water.longname,
        }
      })
    )



/*     for (var i = 0, len = anzahl; i < len; i++) {
      tableBuilder.addRow(
        {
          'uuid': fetcherResult[i].uuid,
          "shortname": fetcherResult[i].shortname,
          "longname": fetcherResult[i].longname,
          "km": fetcherResult[i].km,
          "agency": fetcherResult[i].agency,
          "longitude": fetcherResult[i].longitude,
          "latitude": fetcherResult[i].latitude,
          "watershort": fetcherResult[i].water.shortname,
          "waterlong": fetcherResult[i].water.longname
                }
      )
    }  */ 

    return containerBuilder.getDataContainer()
  }
}
