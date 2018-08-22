const fs = require( 'fs' )

fs.watch('.',{ encoding: 'buffer' },(eventType,fileName) =>{
    console.log(eventType.toString(),fileName.toString());
});
