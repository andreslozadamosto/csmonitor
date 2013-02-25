/**
 * Modulo que se encarga de instalar la aplicacion y esquema de MongoDB
 */

exports.run = function(req, res){
    // obtenemos la base de datos de prueba que creamos
    var dbCSMonitor = new mongodb.Db('csmonitor', serverMongo, {});

    // abrimos la base pasando el callback para cuando esté lista para usar
    dbCSMonitor.open(function (error, client) {
        if (error) throw error;

        client.createCollection('configuration', function(err, collection1) {
            collection1.remove();

            client.createCollection('projects', function(err, collection2) {
                collection2.remove();

                client.createCollection('files', function(err, collection3) {
                    collection3.remove();

                    collection1.insert({
                        name: 'csmonitor',
                        version: '0.1.0',
                        default_min_errors: 0,
                        commit_with_errors: false,
                        commit_with_warnings: false
                    }, function(err, data) {
                        client.close();
                        dbCSMonitor.close();
                    });
                });
            });
        });
    });
    res.send("Installed OK!");
};
