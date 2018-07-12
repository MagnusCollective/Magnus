
/* "eng function" represents the engine which is called from the web UI during the registration process. 
	Plese note that this is still under development*/
	
function eng(aaddress, atype) {
	
	
	//Initializing variables
	
	var actor_address = aaddress;
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
	var _test = _testContract.at('0x217CA0Ee71E2f3FC8d426AA8A2c8B4DBCaD83568');
	
	
	
		if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
		
		web3.eth.defaultAccount = web3.eth.accounts[0];
		
		console.log(web3.eth.defaultAccount);
		console.log(actor_address);
		console.log(actor_type);
		console.log(_test);
		
		
		var val2 = $("#actor_address").val()
		//console.log(val);
		console.log(val2);
		
		//calling the contract function register.
		_test.register(actor_t, val2);
}

eng();
