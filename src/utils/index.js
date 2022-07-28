

export const RGBAToHexA = (r, g, b, a) => {
  r = r.toString(16); //parametros radix especifica codigo hexadecimal
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  if (a.length === 1) a = "0" + a;
  return "#" + r + g + b + a;
}

export const drawCanvas = (canvas,context, img) => {
  
  /* Scale-image-aspect-ratio */
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height
  const ratio = Math.min( hRatio, vRatio );
  const centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  const centerShift_y = ( canvas.height - img.height*ratio ) / 2; 
  /* canvas's draw funtion */
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0,0, img.width, img.height, centerShift_x,centerShift_y,img.width*ratio, img.height*ratio); 
};