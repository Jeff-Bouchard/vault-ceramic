import Web3Modal from 'web3modal';
import { EthereumAuthProvider } from '3id-connect';
const web3modal = new Web3Modal({ network: 'mainnet', cacheProvider: true });
export async function authProvider() {
    const ethereumProvider = await web3modal.connect();
    const result = await ethereumProvider.enable();
    return new EthereumAuthProvider(ethereumProvider, result[0]);
}
//# sourceMappingURL=web3modal.js.map