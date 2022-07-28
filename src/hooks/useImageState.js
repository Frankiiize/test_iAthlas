import { useReducer } from "react";
const initialState = {
  result: undefined,
  cordX:undefined,
  cordY:undefined,
  size:undefined,
  mimeType: undefined,
  imgWidth:undefined,
  imgHeight:undefined,
  rgbaColor: undefined,
  hexColor: undefined,
  error: {message: '', state: false}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ERROR" : 
    return {
      ...state,
      error: {
        message: action.payload.message, 
        state: action.payload.state
      }
    };
    case "SET_IMG_UPLOAD":
      return {
        ...state,
        result: action.payload.result,
      };
    case "PIXEL_CORDENATES":
      return {
        ...state,
        cordX: action.payload.cordX,
        cordY: action.payload.cordY,
      };
    case 'IMG_DATA': 
      return {
        ...state,
        size: action.payload.size,
        mimeType: action.payload.mimeType,
        imgWidth: action.payload.imgWidth,
        imgHeight: action.payload.imgHeight
      }
    case 'IMG_DATA_CLICK' : 
      return {
        ...state,
        rgbaColor: action.payload.rgbaColor,
        hexColor: action.payload.hexColor,
      };
    case 'RESET' : 
    return initialState
    default:
      return state;
  }
};
const useImageState = () => {
  const [imageState, dispatch] = useReducer(reducer, initialState);
  return{
    imageState,
    dispatch
  }
}

export { useImageState };