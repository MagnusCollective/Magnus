pragma solidity ^0.4.16;
contract Magnus_reg_test {
 
 
 //Declaration of arrays and variables required.
 
 address[] private arr; 
 address[] private arr1; 
 uint[] private actor_type_arr;
 uint[] private actor_type_arr1;
 address private t;
 uint private s;
 address private owner = [xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx];
 uint[] private actortypes = [11,22,33,44];//representation of actors (11=Human,22=AI,33=IOT,44=Robot)
 
 
 //Registration function that registers the address along with the type of actor they are.
 
function register(uint _actor) public {  
  if(_actor == 0)
  {
  arr.push(msg.sender);
  uint t1 = actortypes[0];
  actor_type_arr.push(t1);
 }
 if(_actor == 1)
  {
  arr.push(msg.sender);
  uint t2 = actortypes[1];
  actor_type_arr.push(t2);
 }
 if(_actor == 2)
  {
  arr.push(msg.sender);
  uint t3 = actortypes[1];
  actor_type_arr.push(t3);
 }
 if(_actor == 3)
  {
  arr.push(msg.sender);
  uint t4 = actortypes[1];
  actor_type_arr.push(t4);
 }
}

 //Function to delete the list of registered actors(owner only function).
 
 function clear() public { //decreases counter by 1
  if(msg.sender == owner)
  {
  delete arr;
 }
 }
 
 //If an actor wants to remove himself from magnus then he could use the below function.
 
 function remove_mem() public { //decreases counter by 1
 delete arr1;
  for(uint i=0; i<arr.length ;i++){
      
    if (arr[i] != msg.sender)
    {
        t = arr[i];
        s = actor_type_arr[i];
        arr1.push(t);
        actor_type_arr1.push(s);
    }
 }
 delete arr;
 arr = arr1;
 actor_type_arr = actor_type_arr1;
 }
 
// function to display the list of actors registered along with their actor-type code.

 function members() public constant returns (address[], uint[]) {
  return (arr, actor_type_arr);
    } 
    
    
    
}    