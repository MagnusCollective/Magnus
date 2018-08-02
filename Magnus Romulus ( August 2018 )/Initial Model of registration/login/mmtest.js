/* This Java Script helps in attaining the Address from Metamask web extension */

var version = web3.version.api;
	if (web3.isConnected()) {
                var con = "Connected";
            }
	else {
		var con = "Not Connected";
	}
	
	if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } 
		
	
var account = web3.eth.accounts[0];

/* "send_address function" pushes the address acquired in Metamask to the HTML WebUI */	
	function send_address() {
				
			var accountInterval = setInterval(function() {
              if (web3.eth.accounts[0] !== account) {
                account = web3.eth.accounts[0];
                document.getElementById("mmaddress").innerHTML = account;
				console.log(account);
			}
			}, 100);
				
		
	}