class appError extends Error{
    constructor(messsage,statusCode){
        super(messsage);
        this.message=messsage
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4)?"failed":"error";
        this.isOperational=true;
    }
}
module.exports=appError;