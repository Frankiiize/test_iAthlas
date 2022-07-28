import { useCallback, useEffect, useRef, useState } from "react";
import { useImageState } from "./hooks/useImageState";
import { RGBAToHexA, drawCanvas} from "./utils";
import { IconSuccess } from "./assets/IconSuccess";
import "./App.css";

function App() {
  const { imageState, dispatch } = useImageState();
  const [ animation, setAnimation ] = useState('');
  const canvasRef = useRef(null);

  const handleOnChange = (ev) => {
    const photo = ev.target.files[0];
    const acepted_files = ['image/jpeg', 'image/jpg', 'image/png']
    const reader = new FileReader()
    reader.addEventListener('load', (ev) => {
      if(acepted_files.includes(photo.type)){
        dispatch({
          type: "SET_IMG_UPLOAD",
          payload: { result: ev.target.result },
        });
        dispatch({type: 'IMG_DATA', payload: {size: photo.size / 1024, mimeType: photo.type,}})
        dispatch({type: 'ERROR', payload: {message:undefined, state: false}})
      } else {
        dispatch({type: 'ERROR', payload: {message:'Not soported File', state: true}})
      }
    })
    setAnimation('')
    reader.readAsDataURL(photo);
  };
  
  const getPixelData = (clickX, clickY) => {
    const data = canvasRef.current
      .getContext("2d")
      .getImageData(clickX, clickY, 1, 1).data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    dispatch({type: 'IMG_DATA_CLICK', payload: {
      rgbaColor: rgba,
      hexColor: RGBAToHexA(data[0], data[1], data[2], data[3] / 255),
    } })
  };

  function clickDown(ev) {
    let x = ev.nativeEvent.offsetX;
    let y = ev.nativeEvent.offsetY;
    dispatch({ type: "PIXEL_CORDENATES", payload: { cordX: x, cordY: y } });
    getPixelData(x, y);
  }
  const img = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = imageState.result;
    image.addEventListener('load', () => {
      setAnimation('fade-in')
      dispatch({type: 'IMG_DATA', payload: {
        ...imageState,
        imgWidth: image.width ,
        imgHeight: image.height ,
      }})
      drawCanvas(canvas,context,image)
    })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageState.result])

  useEffect(() => {
    img()
  },[img] );

  return (
    <main>
      <section className="container">

        <div className="container__uploadWrapper">
          <h1>Image Uploader</h1>
          <div className="container__upFileWrapper">
            <label htmlFor="uploadFile">
              { (imageState.result && !imageState.error.state) ? 'File uploaded': 'Upload a image'}
              {
                (imageState.error.state && imageState.error.message ) && <span className="error-text">{ imageState.error.message}</span>
              }
              {
                (imageState.result && !imageState.error.state ) && <IconSuccess width={32} classes={'success-text fade-in'}/>
              }
            </label>
            <input
              type="file"
              name="uploadFile"
              id="uploadFile"
              onChange={handleOnChange}
            />
          </div>
          <div className="container_uploadImgWrapper">
            <canvas
              className={animation}
              width="600"
              height="600"
              id="myCanvas"
              ref={canvasRef}
              onMouseDown={clickDown}
            ></canvas>
          </div>
        </div>

        <div className={`container_results ${animation}`}>
          <div className={animation}>
            <p>Resolucion:<span>{imageState.result ? <span className="success-text">{imageState.imgWidth} x {imageState.imgHeight} pixels</span>: <span className="error-text">No file Uploaded</span>} </span></p>
            <p>Formato:<span>{imageState.result ? <span className="success-text">{imageState.mimeType}</span> :<span className="error-text">No file uploaded</span> }</span></p>
            <p>Tamño:<span>{imageState.result ? <span className="success-text">{imageState.size}</span>: <span className="error-text">No file Uploaded</span>} </span></p>
            {
              imageState.result &&
                <div>
                  <p>Color Rgba:<span>{ imageState.rgbaColor ? <span className="success-text">{imageState.rgbaColor}</span> : <span className="warning-text">CLick on the Image</span> }</span></p>
                  <p>Color Hex:<span>{ imageState.hexColor ? <span className="success-text">{imageState.hexColor}</span>: <span className="warning-text">CLick on the Image</span> }</span></p>
                  <p>Cordenadas:<span>{ (imageState.cordX && imageState.cordY) ? <span className="success-text">X:{imageState.cordX} Y:{imageState.cordY}</span>: <span className="warning-text">CLick on the Image</span> }</span></p>
                </div>
            }
          </div>
        </div>

      </section>
    </main>
  );
}


export default App;
