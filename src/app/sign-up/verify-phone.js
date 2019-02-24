import Bcrypt from 'bcrypt';
import Kavenegar from 'kavenegar';


let generateCode = (yar, callback) => {
  const saltRounds = 12;

  let min = 1000;
  let max = 9999;
  let num = (Math.floor(Math.random() * (max-min+1)) + min).toString();
  
  Bcrypt.genSalt(saltRounds)
  .then(salt => {
    Bcrypt.hash(num, salt)
    .then(hash => {
      yar.set('hashed_sms', {
        code: hash
      });
      return callback(null, num);
    })
    .catch(error => {
      callback(error, -1);
    });
  })
  .catch(error => {
    callback(error, -1);
  });
};

export default function (axios, req, res) {
  if(req.headers.app_token != global.consts.APP_CONFIGS.TOKEN_VALUE){
    return res(global.errors.TOKEN_MISMATCH);
  }
  let payload = req.payload;

  axios.post(global.consts.API_PRIVATE_ROUTES.VERIFY_PHONE, req.payload)
  .then(response => {
    if(response.data.code == global.messages.PHONE_IS_VALID.code){
      generateCode(req.yar, (error, generatedCode) => {
        if(error)
          return res(global.errors.OTHERS);
          
        let kavenegarSender = Kavenegar.KavenegarApi({
          apikey: global.consts.KAVENEGAR_CONFIG.API_KEY
        });
        // kavenegarSender.VerifyLookup({
        //   receptor: payload.phone,
        //   token: generatedCode,
        //   template: 'registerverify'
        // }, (smsSendResponse, smsSendStatus) => {
        //   if(smsSendStatus >= 400)
        //     return res([response.data, smsSendStatus]);
        //   else
        //     return res([response.data, global.messages.SEND_SMS_SUCCESSFULLY]);
        // });

        // we can use from this or top to send verification code
        kavenegarSender.Send({
          receptor: payload.phone,
          sender: global.consts.KAVENEGAR_CONFIG.NUMBER,
          message: global.consts.KAVENEGAR_CONFIG.MESSAGE + generatedCode
        }, (smsSendResponse, smsSendStatus) => {
          if(smsSendStatus >= 400)
            return res({phoneExist: response.data, smsSend: {code: smsSendStatus, description: global.errors.SEND_SMS}});
          else
            return res({phoneExist: response.data, smsSend: global.messages.SEND_SMS_SUCCESSFULLY});
        });
      });
    } else{
      return res(response.data);
    }
  })
  .catch(error => {
    return res(error);
  });
}
