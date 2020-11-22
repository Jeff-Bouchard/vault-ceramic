import { createIDX } from './idx'
import { createCeramic } from './ceramic'
import { getAuthProvider } from './provider'
import { createDefinition, publishSchema } from '@ceramicstudio/idx-tools'
import { genKeyPairFromSeed, genKeyPairAndSeed } from 'skynet-js'
import { fromString } from 'uint8arrays'

import type { JWE } from 'did-jwt'

export const authenticate = async (): Promise<ReturnType<typeof genKeyPairFromSeed>> => {
    const [ceramic, authProvider] = await Promise.all([createCeramic(), getAuthProvider()])
    const idx = await createIDX(ceramic, { authProvider })

    // @ts-ignore
    const schemaID = await publishSchema(ceramic, { content: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'SkyDB',
        type: 'object',
    } })

    const definitionID = await createDefinition(ceramic, {
        name: 'SkyDB',
        description: 'SkyDB Seed',
        schema: schemaID.toUrl('base36'),
    })

    const seedKey = definitionID.toString()

    const getKeyPair = async (): Promise<ReturnType<typeof genKeyPairFromSeed>> => {
        let jwe = await idx.get<JWE>(seedKey)

        if (!jwe) {
            jwe = await idx.did.createJWE(fromString(genKeyPairAndSeed().seed), [idx.id])
            await idx.set(seedKey, jwe)
        }

        const decrypted = await idx.did.decryptJWE(jwe)

        return genKeyPairFromSeed(decrypted.toString())
    }

    return await getKeyPair()
}
