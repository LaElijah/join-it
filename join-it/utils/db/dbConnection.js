import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://laelijah:6248@cluster0.8sudzog.mongodb.net/?retryWrites=true&w=majority"

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null}
}

async function dbConnection () {
    if (cached.conn) {
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts = {
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