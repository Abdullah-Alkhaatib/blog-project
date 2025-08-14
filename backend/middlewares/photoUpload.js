const path = require("path"); // يعني نستخدم مسار الملف
const multer = require("multer"); // لتحميل الملفات

// Photo Storage
const photoStorage = multer.diskStorage({
    destination: function (req, file, cb){ // تحديد مكان حفظ الصور
        // console.log("📂 __dirname:", __dirname); // راح يطبع مسار الملف الحالي
        cb(null, path.join(__dirname, "../../images")); // __dirname يعني المسار الحالي للملف

    },
    filename: function (req, file, cb){ // تحديد اسم الصورة
        if(file){
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // نستخدم التاريخ الحالي كجزء من اسم الصورة
        }
        else{
            cb(null, false); // إذا لم يكن هناك ملف، نعيد false
        }
    }
});


// Photo upload middleware
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function (req, file, cb){ // تحديد نوع الملفات المسموح بها
        if(file.mimetype.startsWith("image")){ // إذا كان الملف من نوع صورة
            cb(null, true); // نسمح بتحميل الصورة
        }
        else{
            cb({ message: "Unsupported file format" }, false); // نرفض تحميل الملف
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 } // تحديد الحد الأقصى لحجم الملف (5 ميجابايت)
});

module.exports = photoUpload;