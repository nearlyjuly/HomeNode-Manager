# Installation and setup for first use
Run npm i (this will take a long time)
followed by npm run setup. This will create your Sqlite3 database in your root folder.

# To start the DID manager
npm run did
then visit localhost:8080 to see the options

You can use a test DWN provided by TBD https://developer.tbd.website/ or set up a local version with https://github.com/nearlyjuly/Home_Node

# How to send and receive messages using a protocol

1. Create two DIDs with at least one of them with the address of your chosen DWN.
2. Once they are anchored (this may take some time) enter one of them as a tenant in your DWN. You can skip this if you are using a TBD DWN.
3. Use the "Configure a protocol" option to create a 'letterbox' for the second DID. To do this, enter the ID for the first DID and a prefix for your letterbox protocol. So if you give the name "Test" then the protocol will be generated with the name "Test-letterbox".
4. Check it has been installed by using the "See your installed Protocols" option. It may take a little while if you're using a TBD DWN as they are used a lot.
5. Now use the "Send a Letter" option to write FROM the second DID TO the first DID. So the DID ID this time will be for the second DID. The DID string for the first DID can be retrieve using the "See your stored DID names and ID numbers" link further up the page.
6. If everything has worked ok then you can now use the "Read Letters" option to read any letter sent by the second DID to the first DID. So the DID ID will go back to being that of the first DID, and the protocol name is the full "Test-letterbox" name that was generated in step 3. Use the "See your installed Protocols" if you need to see the name again.

(This is working draft so it will change quite a bit in the next few months.)
