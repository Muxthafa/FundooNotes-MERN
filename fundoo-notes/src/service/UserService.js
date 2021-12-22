import axiosHelper from "../helper/axios";
const url = require("../config/local");

let userRegister = (data) => {
  let reqObj = {
    method: "post",
    URL: url.baseURL+'/users',
    headers: {
      "Content-type": "application/json",
    },
    data: data,
  }
  return axiosHelper.post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};

let userLogin = (data) => {
  let reqObj = {
    method: "post",
    URL: url.baseURL+'/users/login',
    headers: {
      "Content-type": "application/json",
    },
    data: data,
  }
  return axiosHelper.post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};

let forgetPassword = (data) => {
  let reqObj = {
    method: "post",
    URL: url.baseURL+'/users/forgot-password',
    headers: {
      "Content-type": "application/json",
    },
    data: data,
  }
  return axiosHelper.post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};

let resetPassword = (data, token) => {
  let reqObj = {
    method: "post",
    URL: url.baseURL+'/users/reset/'+`${token}`,
    headers: {
      "Content-type": "application/json",
    },
    data: data,
  }
  return axiosHelper.post(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err
    });
};



export default {userRegister, userLogin, forgetPassword, resetPassword}

