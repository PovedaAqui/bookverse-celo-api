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

    const {chain, address, operation, feeCurrency, contractAddress, 
            nftAddress, seller, listingID, tokenID, price} = req.body;
    
    const URL = `https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/${operation}`;

    //TODO
    //let params = {};
    //Insert logic to set the value of params properly based on operation's value

    const response = await fetch(
        URL,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
              'x-api-key': `${process.env.TATUM_API_KEY}`
            },
            body: JSON.stringify({
              chain: `${chain}`,
              feeCurrency: 'CELO',
              contractAddress: `${contractAddress}`,
              nftAddress: `${nftAddress}`,
              seller: `${seller}`,
              listingId: `${listingID}`,
              amount: '1',
              tokenId: `${tokenID}`,
              price: `${price}`,
              isErc721: true,
              fromPrivateKey: '0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2',
              nonce: 1
            })
          }
    )
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))

}