import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import dbConnection from '@/app/_utils/db/dbConnection'
import User from '@/app/_utils/models/user'

interface Credentials {
    username?: string,
    password: string
}


async function isAuthorized(credentials: Credentials) {
    const { username, password } = credentials;
    
    await dbConnection();

    if (username) {
    const user = await User.findOne({ username: username.toLowerCase() })
   

    if (user) {
console.log("hi")
        const match = await bcrypt.compare(password, user.password);
       
        console.log(match)
        if (match) {
            return { auth: true, user: { 
                username: user.username, 
                profile: user.profile,
                id: user._id ,
                email: user.email,
            } }
        } else {
            return null
        }
    } else {
        return null
    }
}
}






const authOptions = {

    // LEAVE CALLBACKS ALONE, JWT DECONSTRUCTS AND PASSES DOWN USER INFO
    // TO SESSION, SESSION.USER STORES THE USER DATA FOUND IN THE TOKEN
    
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}: any) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({session, token}: any) {

            session.user = token.user
            return session
        },



    },

    pages: {
        signIn: '/signin',
        error: '/error'
    },



    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your username..." },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: any) {
                console.log("credentials", credentials)

                const response: any = await isAuthorized(credentials);
               console.log(response)
                if (response.auth) {
                    return response.user
                } else {
                    return null
                }



            },
           
        }
        ),


    ],



debug: true,
}


export default authOptions