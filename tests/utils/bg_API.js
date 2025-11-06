class APIUtils
{
    constructor(request)
    {   
        this.request = request;
    }

    async getToken() //create a one method for login APi
    {
          const payload =  await this.request.post('https://dev.bookgobble.com/api/user/login',
    {
        data: {email:"harshad.w+redref01@crestinfosystems.com",password:"Test@123",fcmToken:"flSscn2TDnu_vGMNoUED4Z:APA91bH81IndLulQhzHeYNTMiM-Tzn7a99cAnIqZ2o3k-kcl0SCffpbPhm3ooLtHBZMCKXp1EPyIISWDVMugFp5M5lwzFqeDP9JhuYV_OR9SDChSlvgKDxU",deviceId:"3"}

    })

    const payloadresponse = await payload.json();
    console.log(payloadresponse);

    const tok = await payloadresponse.data;
    console.log(tok);   
        return tok;
    }

}
module.exports = {APIUtils}