import { EthereumAuthProvider } from '3id-connect'
import Web3Modal from 'web3modal'

export const web3modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
})

export async function getAuthProvider(): Promise<EthereumAuthProvider> {
    const ethProvider = await web3modal.connect()
    const accounts = await ethProvider.enable()

    return new EthereumAuthProvider(ethProvider, accounts[0])
}
