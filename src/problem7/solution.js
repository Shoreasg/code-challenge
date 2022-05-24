const Balances = require('../models/balances')
const Trades = require('../models/trades')


router.get("/GetList",async (req,res)=>
{
	const {swth,usdc,tmz} = req.query; // this query allow you to enter currency value on the fly
	let swthTotal;
	let usdcTotal;
	let tmzTotal;
	let result = []
	const trades= await Trades.find({block_height: {$gte: 730000}}) // find address who recently make a trade
	const balances = await Balances.find({address: trades.address}) // find the balance of the user who recently make a trade
	if(trades.denom === "swth") // if the trade denomn = swth
	{
		swthTotal = (req.query.swth * trades.amount) - (req.query.swth * balance.amount) // calculate the total balance left for the user
		if(swthTotal <= 500) // if total is at least 500
		{
			result.push(trades.address)
		}
	}	
	else if(trades.denom === "usdc"// if the trade denomn = usdc
	{
		usdcTotal = (req.query.usdc * trades.amount) - (req.query.usdc * balance.amount) // calculate the total balance left for the user
		 if(usdcTotal <= 500) // if total is at least 500
		{
			result.push(trades.address)
		}
	}
	else if(trades.denom === "tmz") // if the trade denomn = tmz
	{
		tmzTotal = (req.query.swth * trades.amount) - (req.query.tmz * balance.amount) // calculate the total balance left for the user
		if(tmzTotal <= 500) // if total is at least 500
		{
			result.push(trades.address)
		}
	}

	res.send(200).json(results)
)