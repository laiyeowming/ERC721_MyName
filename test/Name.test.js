const MyName = artifacts.require('MyName')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('MyName', (accounts) => {
    let contract

    before(async () => {
      contract = await MyName.deployed()
    })
    
    describe('deployment', async () => {
      it("deploy successfully", async () => {
        const address = contract.address;
        assert.notEqual(address,'')
        assert.notEqual(address,0x0)
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)
      })

      it('has a name', async () => {
        const name = await contract.name()
        assert.equal(name, 'LaiYM')
      })
  
      it('has a symbol', async () => {
        const symbol = await contract.symbol()
        assert.equal(symbol, 'LYM')
      })
    })

    describe('empty burn', async () => {
      it('burns with no tokenId', async () => {
        const result = await contract.burn('1').should.be.rejected
        //SUCCESS
      })
    })

    describe('minting', async () => {
      it('creates a new token', async () => {
        const result = await contract.mint('LaiYM #0')
        const totalSupply = await contract.totalSupply()

        //SUCCESS
        assert.equal(totalSupply, 1)
        const event = result.logs[0].args
        assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
        assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
        assert.equal(event.to, accounts[0], 'to is correct')

        //FAILURE
        await contract.mint('LaiYM #0').should.be.rejected;
      })
    })

    describe('indexing', async () => {
      it('lists names', async () => {
        // Mint 2 more tokens
        await contract.mint('LaiYM #1')
        await contract.mint('LaiYM #2')
        const totalSupply = await contract.totalSupply()
  
        let myname
        let result = []
  
        for (var i = 1; i <= totalSupply; i++) {
          myname = await contract.mynames(i - 1)
          result.push(myname)
        }
  
        let expected = ['LaiYM #0', 'LaiYM #1', 'LaiYM #2']
        assert.equal(result.join(','), expected.join(','))
      })
    })

    describe('burning', async () => {
      it('burns a new token', async () => {
        await contract.burn('2')
        const totalSupply = await contract.totalSupply()
        //SUCCESS
        assert.equal(totalSupply, 2)
        //FAILURE:
        await contract.burn('3').should.be.rejected;
      })
    })

    describe('pausing and unpausing', async () => {
      it('pause', async () => {
        await contract.pause();
        await contract.mint('LaiYM #2').should.be.rejected;
        await contract.burn('1').should.be.rejected;
      })
      it('unpause', async () => {
        await contract.unpause();
        await contract.mint('LaiYM #2');
        await contract.burn('3');
        const totalSupply = await contract.totalSupply()
        assert.equal(totalSupply, 2)
      })
    })

});