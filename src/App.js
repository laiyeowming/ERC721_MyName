import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import MyName from './build/contracts/MyName.json';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = MyName.networks[networkId]
    if(networkData) {
      const abi = MyName.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load MyName
      for (var i = 1; i <= totalSupply; i++) {
        const myname = await contract.methods.mynames(i - 1).call()
        this.setState({
          mynames: [...this.state.mynames, myname]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (myname) => {
    console.log(myname)
    this.state.contract.methods.mint(myname).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        mynames: [...this.state.mynames, myname]
      })
    })
  }

  burn = (myburnId) => {
    if (this.state.totalSupply !== 0) {
      const myname = "LaiYM #" + (this.state.totalSupply - 1)
      console.log(myburnId)
      console.log(myname)
      this.state.contract.methods.burn(myburnId).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          mynames: [...this.state.mynames, myname]
        })
      })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      mynames: []
    }
  }

  render() {
    return (
      <div>
        <div className="container p-3">
          <div className="row">
            <main role="main" className="col text-center">
              <div className="content">
                <div className="container p-3 bg-primary text-white">
                  <h1>LaiYM Token</h1>
                  <h4><span id="account">Connected to: {this.state.account}</span></h4>
                  <h4><span id="contract">Contract Address: {this.state.contract}</span></h4>
                  <h4><span id="totalSupply">Supply currently: {this.state.totalSupply}</span></h4>
                  <div class="btn-group d-grid gap-2 d-md-flex" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-danger">Pause</button>
                    <button type="button" class="btn btn-success">Unpause</button>
                  </div>
                </div>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const myname = "LaiYM #" + this.state.totalSupply
                  this.mint(myname)
                }}>
                  <div class="row justify-content-center p-2">
                    <div class="col-3">
                      <label
                        for='mynameID'>Mint this: LaiYM #{this.state.totalSupply}
                      </label>
                    </div>
                    <div class="col-3">
                      <input
                        type='submit'
                        className='btn btn-block btn-info text-white'
                        value='MINT'
                      />
                    </div>
                  </div>
                </form>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const myburnId = this.state.totalSupply - 1
                  this.burn(myburnId)
                }}>
                  <div class="row justify-content-center p-2">
                    <div class="col-3">
                      <label
                        for='myburnId'>Burn this: LaiYM #{this.state.totalSupply - 1}
                      </label>
                    </div>
                    <div class="col-3">
                      <input
                        type='submit'
                        className='btn btn-block btn-info text-white'
                        value='BURN'
                      />
                    </div>
                    </div>
                </form>
              </div>
            </main>
          </div>

          <div className="row text-center">
            { this.state.mynames.map((myname, key) => {
              return(
                <div key={key} className="col-md-3 mb-3 text-success">
                  <div>{myname}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
