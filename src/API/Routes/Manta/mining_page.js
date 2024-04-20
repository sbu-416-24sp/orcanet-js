import express from 'express';

const mining = express.Router();

mining.get('/', async (req, res) => {
   let statusCode = 200;
   let message = '';
   const { param1, param2 } = req.body;
   try {
      message = 'Message'
   } catch (error) {
       statusCode = 500;
       message = "Error";
   }

   res.status(statusCode).send(message);
});

export default mining;