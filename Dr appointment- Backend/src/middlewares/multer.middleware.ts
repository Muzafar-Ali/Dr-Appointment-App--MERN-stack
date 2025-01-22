import multer from "multer";

const storage = multer.diskStorage({

  filename: function (req, file, callback) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
  
});

export const upload = multer({ storage });