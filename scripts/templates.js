export const indexPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DID Manager</title>
  </head>
  <body>
  <div>
    <hr />
    Before using for the first time make sure to run "npm run setup".
    This only needs to be done once, or only when you've deleted a previous database.
    </div>
    <div>
    <hr />
      <h4>Create a new DID</h4>
      <form method="post" action="/create" name="CreateDid">
        Enter a name for your own reference<br />
        <input type="text" name="didName" /><br />
        Enter the hosting address for your DWN <br />
        <input type="text" name="nodeAddress" /><br />
        <input type="submit" value="Submit" /><br />
      </form>
      <hr />
      <a href="/seedids">See your stored DID names and ID numbers</a>
      <hr />
      <h4>Configure a protocol</h4>
      <form method="post" action="/protocol" name="addProtocol">
        Enter your DID ID number (use the link above to find the ID)<br />
        <input type="number" name="idChoice" /><br />
        Enter a prefix for your protocol E.g. the name of the person you want to receive messages from<br />
        <input type="text" name="prefixText" /><br />
        <input type="submit" value="Submit" /><br />
      </form>
      <hr />
      <h4>See your installed Protocols</h4>
      <form method="post" action="/protocolquery" name="seeProtocol">
        Enter your DID ID number<br />
        <input type="number" name="idChoice2" /><br />
        <input type="submit" value="Submit" /><br />
      </form>
      <hr />
      <h4>Send a Letter</h4>
      <form method="post" action="/sendletter" name="sendletterform">
        1.The DID ID number you want to send a letter FROM <br />
        <input type="number" name="sendfrom" /><br />
        2.The DID string of the person you are sending a letter TO<br />
        <input type="text" name="sendto" /><br />
        3. The protocol name E.g. June-letterbox<br />
        <input type="text" name="letterbox" /><br />
        4. Letter text you want to send<br />
        <textarea id="lettertext" name="lettertext" ></textarea><br />
        <input type="submit" value="Submit" /><br />
      </form>
      <hr />
      <h4>Read Letters</h4>
      <form method="post" action="/readletters" name="readletters">
        1.The DID ID number you want to read letters from <br />
        <input type="number" name="idChoice3" /><br />
        2. The protocol name E.g. June-letterbox<br />
        <input type="text" name="letterbox2" /><br />
        <input type="submit" value="Submit" /><br />
      </form>
    </div>
  </body>
</html>
`;

export const resultPage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DID Manager</title>
  </head>
  <body>
    <div>
          <p id="didinfo">genericText</p> 
          <a href="/">Back to home page</a> 
        </p>
    </div>
  </body>
</html>`;
