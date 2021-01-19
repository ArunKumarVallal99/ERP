import { PixelRatio, Dimensions, Platform } from "react-native";

export default class utills {

    // Screen Dimension Calculations
    static getApsoluteSize(value) {
      return PixelRatio.getPixelSizeForLayoutSize(value);
    }
  
    static getDeviceWidth() {
      return Dimensions.get("window").width;
    }
  
    static getWidthPercentageToDp = widthPercent => {
      const screenWidth = Dimensions.get("window").width;
      const elemWidth = parseFloat(widthPercent);
      return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
    };
  
    static getHeightPercentageToDp = widthPercent => {
      const screenHeight = Dimensions.get("window").height;
      const elemWidth = parseFloat(widthPercent);
      return PixelRatio.roundToNearestPixel((screenHeight * elemWidth) / 100);
    };
  
    static getDeviceHeight() {
      return Dimensions.get("window").height;
    }
  
    static getFileName(filePath) {
      return new Date().getTime() + "." + filePath.split(".").pop();
    }
  
    // Platform Check
    static isIos() {
      return Platform.OS === "ios" ? true : false;
    }

    // Validators
    static isValidEmail = text => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !reg.test(text);
    }
    
    static isEmpty = text => {
      return (text === undefined || text.trim().length === 0 || text === null || text === 'null' || text === "");
    }
        
    static isValidPassword = text => {
        let reg = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
        return !reg.test(text);
    }

    // Text Capilization
    static capitalizeFirstLetter = str => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
      
    static capitalizeEachWord = str => {
        let splitStr = str.toLowerCase().split(" ");
        for (let i = 0; i < splitStr.length; i++) {
          // You do not need to check if i is larger than splitStr length, as your for does that for you
          // Assign it back to the array
          splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() +
            splitStr[i].substring(1).toLowerCase();
        }
      
        // Directly return the joined string
        return splitStr.join(" ");
    }
      
}