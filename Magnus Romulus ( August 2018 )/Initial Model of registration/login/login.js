
/*This code is under development.*/

function _loginchk(aaddress) {
	
	
	//Initializing variables
	
	var actor_address = aaddress;
	
		var _testContract = web3.eth.contract(abi);
	
		var _test = _testContract.at('xxxxxxxxxxxxxxxContractAddressxxxxxxxxxxxxxxxx');
	
	
	
		if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
		
		web3.eth.defaultAccount = web3.eth.accounts[0];
		
		test = web3.eth.defaultAccount;
		
		
		
		var version = web3.version.api;
	    console.log(version); 
		
		//calling the contract function register.
		_test.loginchk(aaddress , function(err, transactionHash) {
  if (!err)
	  console.log(transactionHash);
	  var res1 = transactionHash.toString();  
      //var res2 =transactionHash[1].toString();
	  console.log(res1)
	  var res2 = new BigNumber(res1);
	  var a2 = new BigNumber(0);
	  console.log(a2);
	  var m = res2.comparedTo(a2);
	  console.log(m)
	  if(m >= 1)
	  {
		  window.location.href = './dashboard/dashboard.html';
	  }
	  else
	  {
		  window.location.href = './dashboard/dashboard_notamember.html';
	  }
});
	
	
}