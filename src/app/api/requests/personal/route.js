





export async function GET(req) {
    
    console.log("GET")
    await dbConnection()
      try {
        const data = await req.json()

          const requests = await Request.find({
            username: data.username

          })
          return NextResponse.json({ status: "success", data: requests})
        } catch (error) {
          return NextResponse.json({ status: "failure" })
  
        }
      }