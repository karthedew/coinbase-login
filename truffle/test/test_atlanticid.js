const AtlanticId = artifacts.require('AtlanticId')

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

    before('Setup Contract', async function() {
        atlanticIdInstance = await AtlanticId.deployed()
    })

    it("Should return a message Id of 1", async () => {

        atlanticIdInstance
        // web3.AtlanticId.

        const create_message = await atlanticIdInstance.initializeMessage.call(
            'test_func', 
            '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', 
            10, 
            '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
        )
        console.log(create_message);
        assert.equal(create_message, 1);
    });
})