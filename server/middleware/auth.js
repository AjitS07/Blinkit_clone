const auth = (request,response,next) =>{
    try {
        const token = request.cookies.accessToken || request.header.authorization.split("")[1]
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}