import { TransactionBlock } from '@mysten/sui.js/transactions';
import * as dotenv from 'dotenv';
import getExecStuff from '../utils/execStuff';
import { packageId, Kiosk, TransferPolicyId } from '../utils/packageInfo';
dotenv.config();

async function buyItem() {
    const { keypair, client } = getExecStuff();
    const tx = new TransactionBlock();

    const coin = tx.splitCoins(tx.gas, [tx.pure(1_0_000_000)]);

    tx.moveCall({
        target: `${packageId}::kiosk::buy_listed_item`,
        arguments: [
            tx.object(Kiosk),
            tx.pure.address("0x98c039dd029d7c5d0b4bb89f00a9ab9d4b98d4506605cc677ba10f2a809df67c"),
            coin,
            tx.object(TransferPolicyId),
        ],
        typeArguments: [`${packageId}::minter::NFT`]
    });

    const result = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
    });

    console.log({ result });
}

buyItem();