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

    const {tokenId} = req.body;
    console.log(tokenId);
    
    const URL = `https://api-eu1.tatum.io/v3/blockchain/auction/approve`;

    const response = await fetch(
        URL,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'x-api-key': `${process.env.TATUM_API_KEY}`
            },
            body: JSON.stringify({
              chain: 'CELO',
              feeCurrency: 'CELO',
              contractAddress: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
              spender: '0xA66D972f55BDE3Ab8683e7eFc4f84f7221323ED2',
              tokenId: `${tokenId}`,
              isErc721: true,
              signatureId: '17a54cc4-0cde-42f4-8ce3-7fdb3f17a153'
            })
          }
    )
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))

}