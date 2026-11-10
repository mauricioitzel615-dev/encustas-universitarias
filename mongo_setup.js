// Ejecutar en mongosh conectado a la base universitaria_encuestas
use('universitaria_encuestas');
db.createCollection('surveys');
db.createCollection('responses');
db.surveys.createIndex({service:1,active:1});
db.responses.createIndex({surveyId:1,createdAt:-1});
db.responses.createIndex({service:1,createdAt:-1});
db.surveys.insertMany([
 { _id:'s1',service:'Biblioteca',name:'Evaluación de Biblioteca',active:true,questions:[{id:'q1',text:'¿Cómo calificas la atención recibida?',order:1},{id:'q2',text:'¿Las instalaciones se encontraron limpias y ordenadas?',order:2},{id:'q3',text:'¿El servicio estuvo disponible cuando lo necesitaste?',order:3},{id:'q4',text:'¿El tiempo de espera fue adecuado?',order:4}],createdAt:new Date() },
 { _id:'s2',service:'Salas de cómputo',name:'Evaluación de salas de cómputo',active:true,questions:[{id:'q1',text:'¿El equipo funcionó correctamente?',order:1},{id:'q2',text:'¿La conexión a internet fue estable?',order:2},{id:'q3',text:'¿El espacio estuvo limpio y ordenado?',order:3}],createdAt:new Date() },
 { _id:'s3',service:'Control escolar',name:'Evaluación de Control Escolar',active:true,questions:[{id:'q1',text:'¿Cómo calificas la atención recibida?',order:1},{id:'q2',text:'¿La información proporcionada fue clara?',order:2},{id:'q3',text:'¿El tiempo de resolución fue adecuado?',order:3}],createdAt:new Date() }
]);
// Documento de respuesta de ejemplo (cada valor debe estar entre 0 y 5)
db.responses.insertOne({surveyId:'s1',surveyName:'Evaluación de Biblioteca',service:'Biblioteca',respondent:'DEMO-001',answers:[{questionId:'q1',question:'¿Cómo calificas la atención recibida?',value:5},{questionId:'q2',question:'¿Las instalaciones se encontraron limpias y ordenadas?',value:4}],createdAt:new Date()});
