# Voz Universitaria: sistema de encuestas

Prototipo para el Problema 1 del proyecto de segundo corte. Incluye una interfaz navegable y lista para demostrar, consultas/registro local en navegador, administración de encuestas, escala obligatoria 0–5, consulta de respuestas y exportación CSV.

## Ejecutar la demostración

Abre `index.html` en Chrome, Edge o Firefox. No necesita instalación. Los datos de demostración se conservan en el almacenamiento local del navegador. Para reiniciar, borra los datos del sitio. Esta demostración no está conectada a Atlas.

## MongoDB Atlas

1. Crea una base `universitaria_encuestas` y un usuario con permisos de lectura/escritura limitados a esa base.
2. En Network Access autoriza solo las IP requeridas para tu entorno. Evita `0.0.0.0/0` para producción.
3. En mongosh conectado al cluster, ejecuta `mongo_setup.js`. Crea `surveys` y `responses`, índices y documentos de ejemplo.
4. En Appsmith crea un datasource MongoDB con el URI del cluster y selecciona esa base. No pongas credenciales en el HTML ni publiques el URI.

## Construcción sugerida en Appsmith

Crea una aplicación con páginas `Responder`, `Administrar` y `Respuestas`. Widgets: Select para servicio/encuesta, Text widgets para preguntas, Radio Group con opciones numéricas 0,1,2,3,4,5, Input opcional para matrícula, Table para respuestas y botones de crear/activar/guardar/exportar. Configura queries: `ListSurveys` (find en surveys), `CreateSurvey` (insertOne), `ToggleSurvey` (updateOne), `SaveResponse` (insertOne), `ListResponses` (find con sort createdAt descendente). Vincula los widgets a las queries y configura refresco después de guardar. En el formulario valida que todos los radios estén contestados y que cada valor esté entre 0 y 5.

### Documento de respuesta

```json
{
  "surveyId": "s1", "surveyName": "Evaluación de Biblioteca",
  "service": "Biblioteca", "respondent": "A001234",
  "answers": [{"questionId":"q1", "question":"¿Cómo calificas la atención?", "value":5}],
  "createdAt": "ISODate(...)"
}
```

La configuración de Appsmith requiere una cuenta y credenciales de Atlas; por eso aquí se entrega el diseño de queries y widgets, no un enlace publicado.
