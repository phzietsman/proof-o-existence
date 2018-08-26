[README](../README.md)

# Avoiding Common Attacks
This document describes the measures that have taken to ensure that the contracts are not susceptible to common attacks.

## Libraries vs Custom Code
It was decided to use the OpenZeppelin library where possible. Reusing code that has been tested by the Ethereum community reduces the chances of bugs and vulnerabilities being introduces into the contract.

## No Looping
The contract does not make use of any looping functions. Looping opens open contracts to Gas limit attacks, making the contract unusable. The contract was written in way that any looping is done on the client side nd not required for the contract to function. 

## Contract size
Keeping the contract very small, limits the the attack vector.

## Avoiding tx.origin
For authorization `msg.sender` was used over `tx.origin`. 

## Timestamping
The contract uses the `block.number` variable for timestamping. This is sufficient since the contract does not use the timestamps internally and it is not time sensitive and purely used to record when a claim was created. 

## Not handling funds
Other than gas costs, the contract does not handle or store any funds. This makes the contract less attractive for malicious actors.   

## No external calls
The contracts does not make any external calls, which eliminates a large portion of the known attacks on contracts. 

## Development
A VSCode Solidity plugin was used (juanblanco.solidity), which provides linting through [solhint](https://github.com/protofire/solhint).


## Testing  
[![Build Status](https://travis-ci.org/phzietsman/proof-o-existence.svg?branch=master)](https://travis-ci.org/phzietsman/proof-o-existence)    

Good test coverage ensures the contract does not fall prey to simple code bugs or logic issues, that is clear from the code, but easy to catch in testing.

Test coverage is very good and the repository was hooked up with TravisCI to run 
the tests everytime the code sis commited. This has the benfit that the code gets tested in a clean environment very often. 