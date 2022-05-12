const bcrypt = require("bcryptjs");
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("UtemGateSystem").collection("User")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		const existUsername = await users.findOne({username : username});
		if (existUsername) {
			console.log('username taken');
		}
		else {
			console.log("username is not taken")
			// TODO: Hash password
			const saltRounds = 10
        	const newPass = await bcrypt.hashSync(password, saltRounds )
			// TODO: Save user to database
			var myobj = { username: username, password: newPass};
        	await users.insertOne(myobj);
		}
	
	}

	static async login(username, password) {
		// TODO: Check if username exists
			const existUsername = await users.findOne({username : username});
   			if (existUsername) {
				   // TODO: Validate password
				const validate = bcrypt.compare(existUsername.password,password)
				// TODO: Return user object
				if (validate == false) {
					return false;
					}
				else // if it does not 
					{
					return true;
					}
   			}
			   else{
				return false;
			} 
			
		
	}
}

module.exports = User;
