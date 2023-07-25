import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import dbConnection from '../../../../utils/db/dbConnection'
import User from '../../../../utils/models/user'



async function isAuthorized(credentials) {
    const { username, password } = credentials;
    
    await dbConnection();

    const user = await User.findOne({ username: username })
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return user
            } else {
                return null
            }
        } else {
            return null
        }
    

}




const authOptions = {

    
        providers: [

            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    username: { label: "Username", type: "text", placeholder: "Your username..." },
                    password: { label: "Password", type: "password" }
                },

                async authorize(credentials) {
                 
                    const response = await isAuthorized(credentials);
                  
                    if (response.auth) {
                        console.log("auth")
                        console.log(response)
                        return response.user
                    } else {
                        return null
                    }
                    


                }
                
                

                
            }
            ),
            
            
        ],




    }


    export default authOptions