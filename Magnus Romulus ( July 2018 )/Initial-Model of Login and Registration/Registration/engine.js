
/* "eng function" represents the engine which is called from the web UI during the registration process.*/
	
function eng(aaddress, atype) {
	
	
	//Initializing variables
	
	var actor_address = aaddress;
	var test;
	var actor_type = atype;
	var actor_t = 0;
	var Human = 0;
	var AI = 1;
	var Robot = 2;
	var IOT = 3;
	
	// str_compare function used to compare strings.
	function str_compare (first, second)
{

   var regex = new RegExp('^' + first+ '$', 'i');
   if (regex.test(second)) 
   {
        return true;
   }
   else 
   {
        return false;
   }
   return false;
}
	
	if(str_compare(actor_type,"Human"))
	{
		actor_t = 0;
	}
	else if(str_compare(actor_type,"AI"))
	{
		actor_t = 1;
	}
	else if(str_compare(actor_type,"Robot"))
	{
		actor_t = 2;
	}
	else if(str_compare(actor_type,"IOT"))
	{
		actor_t = 3;
	}
	
	console.log(actor_t);
	
	//ABI for the Contract
	var _testContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [],
		"name": "clear",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_actor",
				"type": "uint256"
			},
			{
				"name": "_actor_add",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "remove_mem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "members",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
	
	//contract address
	var _test = _testContract.at('***************************************************');
	
	
	
		if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
		
		web3.eth.defaultAccount = web3.eth.accounts[0];
		
		test = web3.eth.defaultAccount;
		
		console.log(web3.eth.defaultAccount);
		console.log(actor_address);
		console.log(actor_type);
		console.log(_test);
		console.log(test);
		
		var version = web3.version.api;
	    console.log(version); 
		
		//calling the contract function register and passing the required arguments.
		_test.register(actor_t, actor_address , function(err, transactionHash) {
  if (!err)
    console.log(transactionHash); // "Transaction hash"
});
}

eng();
