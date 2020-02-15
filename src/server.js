import express from 'express';

const app = express() 

app.get('/', (req, res) => {
  return res.json({message: 'Está funcionando'})
}) 

app.listen(3300)