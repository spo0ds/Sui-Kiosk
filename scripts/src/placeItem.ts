import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as dotenv from 'dotenv';
import getExecStuff from '../utils/execStuff';
import { packageId, Kiosk, KioskOwnerCap } from '../utils/packageInfo';
dotenv.config();

async function placeItem() {
    const { keypair, client } = getExecStuff();
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${packageId}::kiosk::place_item`,
        arguments: [
            tx.object(KioskOwnerCap),
            tx.object(Kiosk),
            tx.object("0x98c039dd029d7c5d0b4bb89f00a9ab9d4b98d4506605cc677ba10f2a809df67c"),
        ],
        typeArguments: [`${packageId}::minter::NFT`]
    });

    const result = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
    });

    console.log({ result });
}

placeItem();