import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async (req, res) => {

    // Run cors
    await cors(req, res)

    const contractAddress = '0xA66D972f55BDE3Ab8683e7eFc4f84f7221323ED2';
    const {id} = req.body;
    // console.log(id);
    const URL = `https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/CELO/${contractAddress}/listing/${id}`;
    const response = await fetch(
        URL,
        {
            method: 'GET',
            headers: {
              'x-api-key': `${process.env.TATUM_API_KEY}`
            }
          }
    )
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))
}