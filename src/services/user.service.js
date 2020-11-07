import userModel from "./../models/user.model"
import updateUserMess from "./../langs/us/notification.us"
const UserService = {}
import bcrypt from 'bcrypt';

//Tạo muối
const saltRounds = 7;

UserService.updateUser = (id,file)=>{
  return userModel.updateUserInfo(id,file);
}
UserService.updatePassword = (id,item)=>{
  return new Promise(async(resolve,reject)=>{
      let currentUser = await userModel.findUserById(id);
      //Kiểm tra userID có tồn tại hay không
      if(!currentUser)
          return reject(updateUserMess.pass.userInvalue);
      //So sánh mật khẩu cũ trong db
      let checkCurrentPassword = await currentUser.comparePass(item. currentPassword);
      //Kiểm tra có đúng hay không
      if(!checkCurrentPassword)
          return reject(updateUserMess.pass.wrongPassword);
      //Thiết lập muối cho mã băm
      let salt = bcrypt.genSaltSync(saltRounds)
      //Hash mật khẩu rồi lưu vào database
      await userModel.updatePassword(id,bcrypt.hashSync(item.newPassword,salt));
      resolve(true);
  })
}


export default UserService;
