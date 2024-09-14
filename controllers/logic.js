var DBfarmCow = require("../models/farmCowDB.json"); //import model
var DBhistoryMilk = require("../models/historyMilk.json");
const fs = require("fs"); // for writing file => save data

const farmCowDB = DBfarmCow;
const historyMilkDB = DBhistoryMilk;

class logic {
  searchCow(req) {
    var FunctionName = "[searchCow]";
    let cowId = req.idCow;
    let msg; //object for respond
    try {
      let Cow = farmCowDB.find((index) => index.id == cowId);
      msg = Cow;
      return msg;
    } catch (error) {
      let messageError = {
        statusCode: error.statusCode || 400,
        massage: error.massage || `${FunctionName} failed [Error] ${error}`,
      };
      console.log(messageError);
      return messageError;
    }
    1;
  }
  MilkingWhiteCow(req) {
    var FunctionName = "[MilkingWhiteCow]";
    console.log("InPut", req);
    let cowId = req.idCow;
    let lemonEated = parseInt(req.lemonEated);

    let msg; //object for respond
    let data; //data for insert 

    try {
      //id วัวช่องแรกไม่ใช่ 0 มี 8 หลัก และทุกตัวเป็น number
      if (cowId.charAt(0) == 0) {
        return "id ตัวแรกไม่สามารถเป็น 0 ได้";
      }
      if (cowId.length != 8) {
        return "id ต้องมี 8 หลัก";
      }
      if (isNaN(Number(cowId))) {
        return "id ทุกตัวจะต้องเป็นตัวเลข";
      }

      //เช็คว่าให้กินมะนาวหรือไม่ให้กินมะนาว
      if (lemonEated == 1) {
        lemonEated = true;
      } else if (lemonEated == 0) {
        lemonEated = false;
      } else {
        return "ไม่ใช่ค่าที่ต้องการ";
      }

      //เช็คว่าวัว id นี้ตรงกับที่เราต้องการรีดนมรึเปล่ากับเช็คว่าวัวตัวนี้เป็น BSOD รึเปล่า
      let Cow = farmCowDB.find((index) => index.id == cowId);
      if (Cow.Color != "white") {
        return "วัวที่ id นี้ไม่ใช่สีขาว";
      }
      if (Cow.BSOD == true) {
        return "วัวตัวนี้ผลิตน้ำนมไม่ได้";
      }

      let chance = Math.random() * 100;
      let chanceBSOD = 0.5 * Cow.monthAge;

      //เช็คโอกาสเป็น BSOD หรือไม่
      if (chance > chanceBSOD || lemonEated == 1) {
        //ถ้าไม่ใช่ ก็เขียนข้อมูลการรีดนมถ้าไม่มี id วัวนี้อยู่ใน DB ก็เขียนข้อมูลใหม่ลงไป ถ้ามีเปลี่ยนข้อมูลเก่า แต่ว่าถ้ามีการกินมะนาวเกิดขึ้นจะไม่เกิดเหตุการณ์ที่ต้องเสี่ยงนี้ขึ้น
        let history = historyMilkDB.find((index) => index.id == cowId);
        if (history) {
          history.currentMilk += 1;
        } else {
          data = {
            id: cowId,
            currentMilk: 1,
          };
          historyMilkDB.push(data);
        }
        historyMilkDB[0].CurrentAllMilk += 1;
      } else {
        Cow.BSOD = true;
      }

      //Convert Value to JSON
      let jsonString = JSON.stringify(historyMilkDB, null, 2);
      //Write data to JSON file => Save data
      fs.writeFileSync("./models/historyMilk.json", jsonString, (err) => {
        if (err) throw err;
        console.log("JSON File Created!");
      });
      //Convert Value to JSON
      let jsonString2 = JSON.stringify(farmCowDB, null, 2);
      //Write data to JSON file => Save data
      fs.writeFileSync("./models/farmCowDB.json", jsonString2, (err) => {
        if (err) throw err;
        console.log("JSON File Created!");
      });
      msg = historyMilkDB;
      console.log("MilkingWhiteCow Successful");
      return msg;
    } catch (error) {
      let messageError = {
        statusCode: error.statusCode || 400,
        massage: error.massage || `${FunctionName} failed [Error] ${error}`,
      };

      console.log(messageError);
      return messageError;
    }
  }

  MilkingBrownCow(req) {
    var FunctionName = "[MilkingBrownCow]";
    console.log("InPut", req);
    let cowId = req.idCow;

    let msg; //object for respond
    let data; //data for insert 

    try {
      //id วัวช่องแรกไม่ใช่ 0 มี 8 หลัก และทุกตัวเป็น number
      if (cowId.charAt(0) == 0) {
        return "id ตัวแรกไม่สามารถเป็น 0 ได้";
      }
      if (cowId.length != 8) {
        return "id ต้องมี 8 หลัก";
      }
      if (isNaN(Number(cowId))) {
        return "id ทุกตัวจะต้องเป็นตัวเลข";
      }

      //เช็คว่าวัว id นี้ตรงกับที่เราต้องการรีดนมรึเปล่ากับเช็คว่าวัวตัวนี้เป็น BSOD รึเปล่า
      let Cow = farmCowDB.find((index) => index.id == cowId);
      if (Cow.Color != "brown") {
        return "วัวที่ id นี้ไม่ใช่สีน้ำตาล";
      }
      if (Cow.BSOD == true) {
        return "วัวตัวนี้ผลิตน้ำนมไม่ได้";
      }

      let chance = Math.random() * 100;
      let chanceBSOD = 1.0 * Cow.monthAge;

      //เช็คโอกาสเป็น BSOD หรือไม่
      if (chance > chanceBSOD) {
        //ถ้าไม่ใช่ ก็เขียนข้อมูลการรีดนมถ้าไม่มี id วัวนี้อยู่ใน DB ก็เขียนข้อมูลใหม่ลงไป ถ้ามีเปลี่ยนข้อมูลเก่า
        let history = historyMilkDB.find((index) => index.id == cowId);
        if (history) {
          history.currentMilk += 1;
        } else {
          data = {
            id: cowId,
            currentMilk: 1,
          };
          historyMilkDB.push(data);
        }
        historyMilkDB[0].CurrentAllMilk += 1;
      } else {
        Cow.BSOD = true;
      }

      //Convert Value to JSON
      let jsonString = JSON.stringify(historyMilkDB, null, 2);
      //Write data to JSON file => Save data
      fs.writeFileSync("./models/historyMilk.json", jsonString, (err) => {
        if (err) throw err;
        console.log("JSON File Created!");
      });
      //Convert Value to JSON
      let jsonString2 = JSON.stringify(farmCowDB, null, 2);
      //Write data to JSON file => Save data
      fs.writeFileSync("./models/farmCowDB.json", jsonString2, (err) => {
        if (err) throw err;
        console.log("JSON File Created!");
      });
      msg = historyMilkDB;
      console.log("MilkingBrownCow Successful");
      return msg;
    } catch (error) {
      let messageError = {
        statusCode: error.statusCode || 400,
        massage: error.massage || `${FunctionName} failed [Error] ${error}`,
      };

      console.log(messageError);
      return messageError;
    }
  }

  resetBSOD(req) {
    var FunctionName = "[resetBSOD]";
    let msg; //object for respond
    try {
      farmCowDB.forEach((item) => {
        if (item.BSOD == true) {
          item.BSOD = false;
        }
      });
      let jsonString = JSON.stringify(farmCowDB, null, 2);
      //Write data to JSON file => Save data
      fs.writeFileSync("./models/farmCowDB.json", jsonString, (err) => {
        if (err) throw err;
        console.log("JSON File Created!");
      });
      msg = "Reset Successfully";
      return msg;
    } catch (error) {
      let messageError = {
        statusCode: error.statusCode || 400,
        massage: error.massage || `${FunctionName} failed [Error] ${error}`,
      };
      console.log(messageError);
      return messageError;
    }
  }
}

module.exports = logic;
