import mongoose from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI || ''
let newGlobal: any = global
let cached = newGlobal.mongoose

if (!cached) {
    cached = newGlobal.mongoose = { conn: null, promise: null}
}

async function dbConnection () {
    if (cached.conn) {
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
       
        return mongoose
      })
    }
    cached.conn = await cached.promise
    return cached.conn
  }
  
  export default dbConnection