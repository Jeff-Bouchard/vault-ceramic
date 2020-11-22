import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { CERAMIC_URL } from './constants'

export async function createCeramic(): Promise<Ceramic> {
    return new Ceramic(CERAMIC_URL)
}
