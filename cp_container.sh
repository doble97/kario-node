ruta_sql="./bbdd/bbdd_2.sql"
if [ -f $ruta_sql ]
then
    podman container cp $ruta_sql kario:/app.sql
    echo `podman container exec kario mysql -u root -p'alumno2021' -e 'source app.sql'`
else
    echo 'No existe el fichero'
fi
