namespace backend.blockchain;

public interface IBlockchainService{
    public void TransferTokens(string receiver, int amount); 
}