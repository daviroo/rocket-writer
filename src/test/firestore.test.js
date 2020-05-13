const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "rocket-writer";
const firebasePort = require("../../firebase.json").emulators.firestore.port;
const port = firebasePort /** Exists? */ ? firebasePort : 8080;
const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;

const databaseName = "rocket-writer";

const rules = fs.readFileSync("firestore.rules", "utf8");
/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth) {
  return firebase.initializeTestApp({ databaseName, projectId, auth }).firestore();
}

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId });
  const db = firebase.initializeAdminApp({databaseName, projectId}).firestore()
   await db.collection("accounts").doc("account").set({
    users: {
        david: {
            role: "admin"
        }
    }
})
const account = await db.collection("accounts").doc("account").get();
 await db.collection("users").doc("david").set({
    account: "account"
})
const user = await db.collection("users").doc("david").get();

// console.log("user")
// console.log(user.data())
// console.log("account")
// console.log(account.data())
});

before(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
  
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe("Rocket Writer", () => {
  it("Users should be authenticated", async () => {
    const db = authedApp(null);
    const profile = await db.collection("users").doc("david");
    await firebase.assertFails(profile.set({ account: "test" }));
  });

  it("Users should be account members to add documents", async () => {
    const db = authedApp({ uid: "david" });
    var account;
    try{
    account = await db.collection("accounts").doc("account")
    } catch(e){
      console.log(e)
    }
    await firebase.assertSucceeds(
      account.collection("documents").add({
        title: "test",
        content: [],
        keywords: []
      })
    );
  });

  
});