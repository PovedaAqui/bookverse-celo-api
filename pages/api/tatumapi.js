export default async (req, res) => {
    const chain = 'ETH';
    const address = '0x8926d4fDF7D1Ca0bB7d803f143fE2036245c57be';
    const URL = `https://api-eu1.tatum.io/v3/nft/address/balance/${chain}/${address}`;
    const response = await fetch(
        URL,
        {
            method: 'GET',
            headers: {
              'x-api-key': `${process.env.TATUM_API_KEY}`
            }
          }
    );
  
    const data = await response.text();
    res.status(200).json({ data: data})
    console.log(data);
}