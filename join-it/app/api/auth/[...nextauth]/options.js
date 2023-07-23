import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import dbConnection from '../../../../utils/db/dbConnection'
import User from '../../../../utils/models/user'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../../utils/db/authConnection'



async function isAuthorized(credentials) {
    const { username, password } = credentials;
    
    // const hashPassword = bcrypt.hash(password, 10, async (err, hash) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     return hash;
    // });
    
    await dbConnection();

    const response = User.findOne({ Username: username }, async (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) {
            const match = await bcrypt.compare(password, user.Password);
            if (match) {
                return { auth: true, user: { 
                    username: user.Username,
                    id: user.UUID } }
            } else {
                return { auth: false, user: null }
            }
        } else {
            return { auth: false, user: null }
        }
    })

    return response;
}





export const authOptions = {
    adapter: MongoDBAdapter(clientPromise, {
        collection: 'sessions'
    }),
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
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
        
        // session: {
        //     strategy: "database",
        //     maxAge: 7 * 24 * 60 * 60,
        //     updateAge: 24 * 60 * 60,
        // },
    
        // database: {
        //     type: "mongodb",
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     url: process.env.MONGODB_URI,
        // },

    }