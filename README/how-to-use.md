# How 2 PoE
The app allows users to data (currently jump images) to ipfs and commit the ipfs hash to the ethereum blockchain.  The contract is deployed to the Rinkeby network and the UI is hosted on Github Pages (https://phzietsman.github.io/proof-o-existence/ui).

Users make **Claims** in the applications. These claims can then be upvoted (endorsed) or downvoted by other users of the application. The number of up/down votes a claim receives serves as an indication of the trustworthiness of a claim.   

## Prerequisites 
To use the application you will the following:
* A browser with Metamask installed (Chrome, Firefox, Brave, Opera) OR the coinbase wallet app (Toshi)
* Metamask or the mobile wallet needs to be connected to Rinkeby
* A funded account on Rinkeby

### Funding a Rinkeby account 
Rinkeby accounts can by funded using faucets (https://faucet.rinkeby.io/). Tweet your account address and copy the link to the tweet on faucet. Your account will then be credited with the selected amount of Ether.

### Switching Metamask to Rinkeby
![execute](./metamask-comments.png?raw=true)

## Using PoE
### Signup
During signup you will be asked to give your account a name, your twitter handle, mastodon handle and upload an profile picture.  None of these are mandatory, but it will make it easier for other users to find you on the app.

![execute](./signup.png?raw=true)

After clicking the submit button, your **bio** will be sync to the infura ipfs gateway and depending on the size of the image and your internet connection this might take some time.  Once syncing is complete, a Metamask popup will ask you to approve a transaction. This step will now commit your ipfs bio to the blockchain. **Note** sometimes the Metamask popup does not open, keep and eye for a notification on the Metamask icon.

![execute](./metamask-notif.png?raw=true)

Once you have Confirmed the transaction, wait a few seconds for the transaction to be included in a block before trying to log in.

### Login

After registering you will be able to login. The account icon on the top righthand corner will get your credentials from Metamask and log you in. 

![execute](./login.png?raw=true)

### Creating a Claim
Once logged in you will see three tabs, **About**, **Claims** and **All Claims**. Click on the **Claims** tab, this will show you all you claims.

![execute](./claim-empty.png?raw=true)

To add a claim, click the *plus* button on at the bottom of the page. This will open the new claim popup:

![execute](./new-claim.png?raw=true)

Complete the form, choose a image and click **OK**. Similarly to registering, the claim will be loaded to ipfs and there after a Metamask popup will ask you te confirm the transaction. Once the transaction has been included in a block, you can click the refresh button and your claims will be reloaded. You should now see your first claim.

![execute](./first-claim.png?raw=true)

## Other Stuff
### Search and Refresh
The **Search** and **Refresh** buttons is context sensitive, if you are in your Claims it will only search through your own claims, if you are on the **All Claims** page, it will search through all the claims ever made and the same applies to the *Refresh* button.

![search and refresh](./mobile-view.png?raw=true)

When the search bar is closed it will show all the claims again.
![search](./search.png?raw=true)

### Loader
On the top righthand corner a loader will occasionally show, this indicates that the app is either trying to fetch data or busy syncing with ipfs.

![Enhance your calm](./loader.png?raw=true)


 




## Bugs / Enhancements
A list of known bugs and enhancements can be found here (https://github.com/phzietsman/proof-o-existence/issues) 