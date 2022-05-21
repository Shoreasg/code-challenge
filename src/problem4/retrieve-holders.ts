const Web3 = require('web3')
const web3 = new Web3("https://bsc-dataseed.binance.org/") //provider from BSC

const tokenContract: string = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c" //OLD SWTH contract

const addresses: string[] = ["1", "0x0020c5222a24e4a96b720c06b803fb8d34adc0af", "0xfe808b079187cc460f47374580f5fb47c82b87a5"] //List of address to look for

const abi: any = [{ //ABI interface of contract
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}]


const SWTH = new web3.eth.Contract(abi, tokenContract) //create contract object to auto convert all calls into low level ABI calls over RPC for me.

addresses.forEach(async (address: string) => { //check the balance of holder by going through each address.
    await SWTH.methods.balanceOf(address).call((err: any, result: number) => {
        let finalResult = result * 10
        if(err)
            console.log(err)
        else    
        console.log(`${address} ${web3.utils.fromWei(finalResult.toString(), "Gwei")}`)
    })
})