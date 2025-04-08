/**
 * 整个项目的api统一管理
 *
 */

import request from "./request";

// 请求首页左侧

export default {
  getTableData() {
    return request({
      url: "/api/user/plan",
      method: "get",
    });
  },
};
