pragma solidity 0.8.14;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TokenBalance {

    struct Results
    {
        address token;
        uint balance;
    } // this is like creating an object

    function tokenBalance(address _tokenAddress, address _walletAddress) public view  returns (uint) { //this function get the user wallet and a token address and check the balance
        return IERC20(_tokenAddress).balanceOf(_walletAddress);
    }

    function getBalances(address _user, address[] memory _tokensAddresses) public view returns(Results[] memory)
    {
        //this function gets the user and a list of token and their balances

        Results[] memory result;

        for(uint i = 0; i < _tokensAddresses.length; i++) //for each tokenaddress
        {
            result[i] = Results({token: _tokensAddresses[i], balance: tokenBalance(_tokensAddresses[i], _user)}); //map accordingly
        }
           return result;
    }

}

