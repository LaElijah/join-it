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
                return { auth: true, user: { 
                    username: user.username,
                    id: user.UUID } }
            } else {
                return { auth: false, user: null }
            }
        } else {
            return { auth: false, user: null }
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
                        return response.user
                    } else {
                        return null
                    }
                }
            }),
        ]

    }


    export default authOptions