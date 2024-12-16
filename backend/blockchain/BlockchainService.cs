using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;

namespace backend.blockchain;

public class BlockchainService : IBlockchainService{
    
    private Web3? web3;

    private Contract contract;

    private Function transferFunction;

    public BlockchainService(IConfiguration configuration){
        string url = configuration.GetValue<string>("Blockchain:url");
        string privateKey = configuration.GetValue<string>("Blockchain:privateKey");
        string contractAddress = configuration.GetValue<string>("Blockchain:contractAddress");
        string abi = configuration.GetValue<string>("Blockchain:abi");
        var account = new Account(privateKey);
        web3 = new Web3(account, url);
        contract = web3.Eth.GetContract(abi, contractAddress);
        transferFunction = contract.GetFunction("transfer");
    }

    public async void TransferTokens(string receiver, int amount){
        // var tokenAmount = Web3.Convert.ToWei(amount);
        // var gas = await transferFunction.EstimateGasAsync(web3.TransactionManager.Account.Address, null, null, receiver, amount);
        var gas = new HexBigInteger(35382);
        var receiptAmountSend = await transferFunction.SendTransactionAsync(web3.TransactionManager.Account.Address, gas, null, null, receiver, amount);
        Console.WriteLine(receiptAmountSend.ToString());
    }
}