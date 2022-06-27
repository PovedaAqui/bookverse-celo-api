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

    const {address, operation, contractAddress, tokenId, price} = req.body;
    
    const URL = `https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/${operation}`;

    const min = 1;
    const max = 100000000000000;
    const listingId = min + Math.random() * (max - min);
    console.log(listingId);


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
              contractAddress: '0xC2aCe1c1393d11Ff49966E19F73Da59D3E4c3B15',
              nftAddress: `${contractAddress}`,
              seller: `${address}`,
              listingId: `${listingId}`,
              amount: '1',
              tokenId: `${tokenId}`,
              price: `${price}`,
              isErc721: true,
              signatureId: '17a54cc4-0cde-42f4-8ce3-7fdb3f17a153',
              nonce: 1
            })
          }
    )
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))

}