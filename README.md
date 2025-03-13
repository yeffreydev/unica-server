nombrar la migracion inicial
npx prisma migrate dev --name init

guards auth, por ejemplo para ingresar a rutas que requieren autenticacion como el perfil de un usuario

[ ] crear cuenta para cada usuario.
[ ] al crearse un usuario, crearle una cuenta.

///
Run the following command to create a draft migration that you can edit before applying to the database:

npx prisma migrate dev --name rename-migration --create-only

Edit the draft migration as shown, changing DROP / DELETE to a single RENAME COLUMN:

Save and apply the migration:

npx prisma migrate dev

///

///

3. Respaldar datos y aceptar el reset (si es seguro perder los datos)

Si puedes permitirte perder los datos actuales:

Respalda la base de datos Exporta los datos actuales con un comando como:
pg_dump -U <usuario> -d <base_de_datos> -f backup.sql
Acepta el reset Responde "y" al prompt para resetear el esquema.
Restaura los datos (opcional) Si necesitas los datos de vuelta, edita el archivo backup.sql para ajustarlo al nuevo esquema y luego reintrodúcelo:
psql -U <usuario> -d <base_de_datos> -f backup.sql

///
