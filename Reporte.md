# Reporte de práctica: Sistema de encuestas para servicios universitarios

**Asignatura:** Tópicos de Bases de Datos  
**Proyecto:** Segundo corte — Problema 1  
**Nombre de la aplicación:** Voz Universitaria  
**Tecnologías objetivo:** MongoDB Atlas y Appsmith

## 1. Descripción del problema

La institución necesita conocer la percepción de sus usuarios sobre los servicios auxiliares de biblioteca, salas de cómputo y control escolar. El sistema debe permitir administrar encuestas y preguntas, registrar calificaciones en una escala común de 0 a 5 y consultar respuestas anteriores.

## 2. Objetivo

Desarrollar una aplicación sencilla que facilite la evaluación periódica de los servicios universitarios, centralice las respuestas y permita revisar resultados para orientar acciones de mejora.

## 3. Diseño funcional

La aplicación se organiza en tres vistas. **Responder encuesta** muestra las encuestas activas, las preguntas y la escala de 0 a 5; valida que cada pregunta tenga respuesta antes de enviar. **Administrar** permite crear encuestas por servicio con varias preguntas y activar o desactivar encuestas. **Respuestas** presenta las contestaciones, su promedio y detalle, además de exportar los registros a CSV. La matrícula es opcional para permitir participación anónima.

El prototipo entregado en `index.html` funciona localmente en el navegador para demostrar el flujo. Guarda su estado en localStorage; la persistencia multiusuario se implementa conectando los widgets de Appsmith con Atlas, conforme a `README.md`.

## 4. Modelo de datos MongoDB

Se proponen dos colecciones: `surveys` y `responses`. Una encuesta embebe sus preguntas porque estas se consultan y administran junto con su encuesta. Una respuesta embebe sus calificaciones porque forman una unidad de captura y normalmente se consultan juntas. Cada respuesta conserva `surveyId`, el nombre del servicio y el nombre de la encuesta para facilitar el historial aunque cambie el título posteriormente.

`surveys`: `_id`, `service`, `name`, `active`, `questions[]` (identificador, texto y orden), `createdAt`.  
`responses`: `_id`, `surveyId`, `surveyName`, `service`, `respondent` opcional, `answers[]` (questionId, texto de pregunta, valor entero 0–5), `createdAt`.

Esta organización reduce consultas adicionales en las pantallas principales y mantiene juntas las preguntas/valores relacionados. Las respuestas se separan de encuestas para que la cantidad de respuestas pueda crecer sin inflar cada documento de encuesta. Se agregan índices por servicio/estado y por encuesta/fecha para filtrar encuestas activas y consultar historiales recientes.

## 5. Validaciones y consultas

La interfaz exige una respuesta para cada pregunta; los valores permitidos son enteros del 0 al 5. La matrícula es opcional. Las operaciones previstas en Appsmith son: listar encuestas activas, insertar encuesta, cambiar su estado, insertar respuesta y listar respuestas ordenadas por fecha descendente. `mongo_setup.js` crea colecciones, índices y datos demostrativos.

## 6. Evidencias

`index.html` contiene las vistas de responder, administrar y consultar respuestas; incluye datos iniciales de los tres servicios. Al abrirlo se puede demostrar la captura, validación, administración, consulta y exportación CSV. `mongo_setup.js` evidencia el esquema e índices propuestos. Para la evidencia final de integración deberán agregarse capturas de la app publicada en Appsmith y de documentos registrados en Atlas una vez configuradas las cuentas.

## 7. Configuración de Atlas y Appsmith

La base se denomina `universitaria_encuestas`. El script `mongo_setup.js` prepara las colecciones y datos. En Appsmith se crea un datasource MongoDB con credenciales restringidas a esta base y se construyen las tres páginas con Select, Radio Group, Input, Table y botones. El URI y las credenciales deben permanecer como configuración secreta del datasource, no en el frontend.

**Enlace de aplicación:** pendiente de publicar desde una cuenta de Appsmith conectada al cluster Atlas.

## 8. Conclusión

La solución propuesta cubre los requerimientos mínimos del Problema 1 y define una organización documental que facilita administrar preguntas y calificaciones, registrar respuestas y consultar resultados. El prototipo local permite demostrar el flujo; la persistencia compartida y el enlace final dependen de configurar Atlas y publicar la aplicación Appsmith.
