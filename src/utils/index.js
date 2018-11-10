import Cookies from 'js-cookie'

class Utils {
  // 对象比较排序
  static compareObj(prop, type = 'desc') {
    return function (fir, sec) {
      let firOrder = fir[prop] ? parseInt(fir[prop]) : Number.MAX_VALUE;
      let secOrder = sec[prop] ? parseInt(sec[prop]) : Number.MAX_VALUE;
      if (firOrder < secOrder) {
        return type === 'desc' ? 1 : -1;
      } else if (firOrder > secOrder) {
        return type === 'desc' ? -1 : 1;
      } else {
        return 0;
      }
    };
  }

  static copyData(target) {
    //先判断类型，再拷贝

    function checkType(val) {
      return Object.prototype.toString.call(val).slice(8, -1);
    }

    let res, type = checkType(target);
    if (type === 'Object') {
      res = {};
    } else if (type === 'Array') {
      res = [];
    } else {
      return target;
    }

    for (let i in target) { //数组和对象 for in 循环
      let value = target[i];
      if (checkType(value) === 'Object' || checkType(value) === 'Array') { //嵌套
        res[i] = this.copyData(value);
      } else { //基本数据或者函数
        res[i] = value;
      }
    }
    return res;
  }

  static oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  // 格式化时间
  static formatDate(date, fmt) {
    date = new Date(date);
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }

  // 获取本地时间
  static getLocalDate(timestamp) {
    let parseTime = Date.parse(timestamp.replace(/-/g, "/"));
    let instance = new Date(parseTime); //创建一个Date对象
    let localTime = instance.getTime();
    let localOffset = instance.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
    let utc = localTime + localOffset; //utc即GMT时间
    let offset = 16;
    let beijing = utc + (3600000 * offset);
    return new Date(beijing);
  }

  // 下载文件
  static downloadFile(data, fileName) {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    let blob = new Blob([data], {
        type: 'application/octet-stream'
      }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // 设置Cookies
  static setCookies(key, val, day = 0.2) {
    Cookies.set(key, val, {
      expires: day
    });
  }

  // 获取Cookies
  static getCookies(key) {
    return Cookies.get(key);
  }

  static removeCookies(key) {
    Cookies.remove(key);
  }

  //data：带转换成树形结构的对象数组
  //attributes：对象属性
  static toTreeData(data, attributes) {
    let resData = data;
    let tree = [];

    //找寻根节点
    for (let i = 0; i < resData.length; i++) {

      if (resData[i][attributes.parentId] === '' || resData[i][attributes.parentId] === null) {
        tree.push(treeObj(resData[i]));
        resData.splice(i, 1);
        i--;
      }
    }

    run(tree);

    function treeObj(originObj) {
      //对象深拷贝
      let obj = {};
      for (let key in originObj) {
        var val = originObj[key];
        obj[key] = typeof val === 'object' ? treeObj(val) : val;
      }
      //对象新增children键值，用于存放子树
      obj['children'] = [];
      return obj;
    }

    //找寻子树
    function run(chiArr) {
      if (resData.length !== 0) {
        for (let i = 0; i < chiArr.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (chiArr[i][attributes.id] === resData[j][attributes.parentId]) {
              let obj = treeObj(resData[j]);
              chiArr[i].children.push(obj);
              resData.splice(j, 1);
              j--;
            }
          }
          if (chiArr[i].children.length > 1) { //菜单排序
            chiArr[i].children.sort(
              Utils.compareObj("menuOrder", "asc")
            );
          }
          run(chiArr[i].children);
        }
      }
    }

    return tree;
  }

}

export default Utils;
