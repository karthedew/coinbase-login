const AtlanticId = artifacts.require('AtlanticId')
// const assert = require("chai").assert
const truffleAssert = require('truffle-assertions')

contract('AtlanticId Function Testing', async accounts => {
    /** Full Test Variables */
    const owner = accounts[0]
    const acnt1 = accounts[1]
    const acnt2 = accounts[2]
    const acnt3 = accounts[3]
    const acnt4 = accounts[4]
    const acnt5 = accounts[5]
    const acnt6 = accounts[6]
    const acnt7 = accounts[7]
    const acnt8 = accounts[8]
    const acnt9 = accounts[9]
    var atlanticIdInstance

    /** TEST SETUP */
    before('Setup Contract', async function() {
        atlanticIdInstance = await AtlanticId.deployed()
    })

    describe("Test mint key & transfer key.", async () => {
        /**
         * Test should include pass and fail tests:
         * 
         * [Test #1 - mint_key]     : Assert  TRUE - key is created.
         * [Test #2 - mint_key]     : Assert FALSE - key is invalid type
         * [Test #3 - transfer_key] : Assert  TRUE - key is created.
         */

        /** TEST VARIABLES */
        const mint_key_true     = "asdkljf23jwj2mc4l4j4"
        const mint_key_false    = 123
        const transfer_key_true = true

        /** TEST #1 */
        it("Mint key is of correct type", async () => {
            await atlanticIdInstance.approveMint(mint_key_true, acnt1, {from: owner})
            const acnt1_mint_key = await atlanticIdInstance.getMintKey(acnt1, {from: owner})
            assert.equal(acnt1_mint_key, mint_key_true)
        })

        /** TEST #2 */
        it("Mint key is of wrong type", async () => {
            await atlanticIdInstance.approveMint(mint_key_false, acnt2, {from: owner})
            const acnt2_mint_key = await atlanticIdInstance.getMintKey(acnt2, {from: owner})
            assert.notEqual(acnt2_mint_key, mint_key_false)
        })

        /** TEST #3 */
        it("Transfer key is of correct type", async () => {
            await atlanticIdInstance.approveTransfer(acnt1, {from: owner})
            const acnt1_transfer_key = await atlanticIdInstance.getTransferKey(acnt1, {from: owner})
            assert.equal(acnt1_transfer_key, transfer_key_true)
        })
    })

    describe("Check events emitted when an NFT is minted.", async () => {

        /**
         * The Mint() method logs 3 events:
         *      [1] Transfer - Emitted when `tokenId` token is transferred from `from` to `to`.
         *                      |> Logs the "from" address, the "to" address, and the tokenId
         *      [2] Approval - Emitted when `owner` enables `approved` to manage the `tokenId` token.
         *                      |> Logs the owner address, the approved address, and the tokenId
         *      [3] Mint     - Emitted when an NFID is minted.
         *                      |> Logs the tokenId, timestamp and expiration year.
         */

        it("Check if Transfer event is emitted.", async () => {
            await atlanticIdInstance.approveMint("key4", acnt4, {from: owner})
            const acnt4_mint_instance = await atlanticIdInstance.mint(
                "acnt4.ens",
                "myUid:1892389c83u2",
                "coinbase",
                "key4",
                {
                    from: acnt4
                }
            )
            truffleAssert.eventEmitted(acnt4_mint_instance, 'Transfer', (ev) => {
                return ev.tokenId == 0
            });
        })

        it("Check if Approval event is emitted.", async () => {
            await atlanticIdInstance.approveMint("key5", acnt5, {from: owner})
            const acnt5_mint_instance = await atlanticIdInstance.mint(
                "acnt5.ens",
                "myUid:1892389c83u2",
                "coinbase",
                "key5",
                {
                    from: acnt5
                }
            )
            truffleAssert.eventEmitted(acnt5_mint_instance, 'Approval', (ev) => {
                return ev.tokenId == 1
            });
        })

        it("Check if Mint event is emitted.", async () => {
            await atlanticIdInstance.approveMint("key6", acnt6, {from: owner})
            const acnt6_mint_instance = await atlanticIdInstance.mint(
                "acnt6.ens",
                "myUid:1892389c83u2",
                "coinbase",
                "key6",
                {
                    from: acnt6
                }
            )
            truffleAssert.eventEmitted(acnt6_mint_instance, 'Mint', (ev) => {
                return ev.tokenId == 2
            });
        })
    })

    // it("Test mint creation, including Events emitted.", async () => {

    //     // web3.AtlanticId.
    //     // instance.sendCoin(accounts[1], 10, {from: accounts[0]})
    //     const create_mint_key = await atlanticIdInstance.approveMint("key1", acnt1, {from: owner})
    //     // console.log('The Create Mint Key is...')
    //     // console.log(create_mint_key)
    //     // console.log('---------------------------')

    //     const acnt1_mint_instance = await atlanticIdInstance.mint(
    //         "acnt1.ens",
    //         "myUid:1892389c83u2",
    //         "coinbase",
    //         "key1",
    //         {
    //             from: acnt1
    //         }
    //     )

    //     // console.log('The Mint for Account #1 is...')
    //     // console.log(acnt1_mint_instance)
    //     // console.log(acnt1_mint_instance.logs[2].args.tokenId.words[0])
    //     // console.log('---------------------------')

    //     truffleAssert.eventEmitted(acnt1_mint_instance, 'Mint', (ev) => {
    //         return ev.tokenId == 1
    //     });
    //     // assert.equal(create_message, 1);
    // });


    // afterEach('kill instance after each session', async () => {
    //     await atlanticIdInstance.kill({ from: owner });
    // });
})