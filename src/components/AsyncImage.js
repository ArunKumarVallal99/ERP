import React, { Component } from "react";
import { Animated, View, Image, Text } from "react-native";

const {
  CachedImage,
  ImageCacheProvider,
  ImageCacheManager,
} = require('react-native-cached-image');
// import initials from "initials";

// from https://flatuicolors.com/
const defaultColors = [
  "#2ecc71", // emerald
  "#3498db", // peter river
  "#8e44ad", // wisteria
  "#e67e22", // carrot
  "#e74c3c", // alizarin
  "#1abc9c", // turquoise
  "#2c3e50" // midnight blue
];

const defaultImageCacheManager = ImageCacheManager();
const AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage);


function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state={
         loaded: false,
      imageOpacity: props.placeholderSource
        ? new Animated.Value(1.0)
        : new Animated.Value(0.0),
      placeholderOpacity: new Animated.Value(1.0),
      placeholderScale: new Animated.Value(1.0)
    }
  }

  _onLoad = () => {
    const { placeholderScale, placeholderOpacity, imageOpacity } = this.state;
    console.log("Loaded true....")
    Animated.sequence([
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
          })
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.setState(() => ({ loaded: true }));
    });
  };

  //Cache Methods //

  getCacheInfo() {
    defaultImageCacheManager.getCacheInfo()
        .then(({size, files}) => {
           console.log(size, files);
            console.log('Cache Info', `files: ${files.length}\nsize: ${formatBytes(size)}`);
        }); 
  }

  clearCache() {
    defaultImageCacheManager.clearCache()
        .then(() => {
            console.log('Cache cleared');
        });
  }


  render() {
    let {
      src,
      isLocalsrc,
      name,
      color,
      textColor = "#fff",
      colors = defaultColors,
      fontDecrease,
      size,
      avatarStyle,
      defaultName,
      radius = 0.5,
      placeholderColor, 
      placeholderSource,
      isAvatarView, //flag for avatar view
      otherStyle,  //css other than avatar
      isBorderedRound, 
      borderwidth,
      bordercolor,
      isRoundedCorner,
      isClearCache,
      isGetCacheInfo
    } = this.props;

    const {
      imageOpacity,
      loaded,
      placeholderOpacity,
      placeholderScale
    } = this.state;

    if (!fontDecrease) fontDecrease = 2.5;

   // if (!name) throw new Error("Avatar requires a name");

    // if (typeof size !== "number") size = parseInt(size);

    // let abbr = initials(name);
    // if (!abbr) abbr = defaultName;

    if (isNaN(radius)) radius = 0.5;
    if (isNaN(borderwidth)) borderwidth = 2.0;
    if (isNaN(bordercolor)) bordercolor = 'black';

    const borderRadius = size * radius;
    // rounded image
    var imageStyle = {
      borderRadius
    };

    const innerStyle = {
      borderRadius,
      justifyContent: "center",
      alignItems: "center"
    };
    // bordered round image
    if (isBorderedRound) {
      imageStyle.borderColor= bordercolor;
      imageStyle.borderWidth= borderwidth;
    }
    // Image with rounded corners
    if (isRoundedCorner){
      imageStyle.borderRadius = 10;
    }

    if (size) {
      imageStyle.width = innerStyle.width = size;
      imageStyle.height = innerStyle.height = size;
    }

    if(isClearCache){
      this.clearCache();
    }

    if(isGetCacheInfo){
      console.log("getting cache info....")
      this.getCacheInfo();
    }

    let inner, classes;
    if (src) {
      const props = {
        style: (placeholderSource &&
          !loaded) ? [
            imageStyle,
            {
              opacity: placeholderOpacity,
              position: "absolute"
            }
          ] : [
            imageStyle,
            {
              opacity: imageOpacity,
            }
          ] ,
        source: (placeholderSource &&
          !loaded)? {uri: placeholderSource} : {uri: src},
        onLoad: this._onLoad()
      };

      inner = React.createElement(this.props.component || AnimatedCachedImage, props);
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = (
        <Text style={{ fontSize: size / fontDecrease, color: textColor }}>
          {"A"}
        </Text>
      );
    }

    return (
      <View>
       {isAvatarView && (
        <View style={[innerStyle]}>
        <ImageCacheProvider
                    urlsToPreload={[src]}
                    onPreloadComplete={() => ReactNative.Alert.alert('onPreloadComplete')}
                    ttl={60}
                    numberOfConcurrentPreloads={0}>
                   {inner}
         </ImageCacheProvider>
        </View>
       )}

      {!isAvatarView && (
        <View style={otherStyle}>
        <AnimatedCachedImage
          source={{uri: src}}
          style={[
            otherStyle,
            {
              opacity: imageOpacity,
              position: "absolute",
              resizeMode: "contain"
            }
          ]}
          onLoad={this._onLoad}
        />

        {placeholderSource &&
          !loaded && (
            <AnimatedCachedImage
              source={{uri: placeholderSource}}
              style={[
                otherStyle,
                {
                  opacity: placeholderOpacity,
                  position: "absolute"
                }
              ]}
            />
          )}

        {!placeholderSource &&
          !loaded && (
            <AnimatedCachedImage
              style={[
                otherStyle,
                {
                  backgroundColor: placeholderColor || "#90a4ae",
                  opacity: placeholderOpacity,
                  position: "absolute",
                  transform: [{ scale: placeholderScale }]
                }
              ]}
            />
          )}
      </View>
      )}
      </View>
    );
  }
}



module.exports = UserAvatar;
