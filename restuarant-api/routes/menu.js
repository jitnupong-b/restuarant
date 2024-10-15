var express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require('path');
var config = require("../config/dbconfig");
const sql = require("mssql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Destination called');
    cb(null, '/resources')
  },
  filename: function (req, file, cb) {
    console.log('Filename called');
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(req);
    console.log('File filter called');
    console.log('File:', file);
    cb(null, true);
  }
});

router.post("/addMenu", upload.single('menuImg'), async function (req, res, next) {
  console.log(req.body);
  console.log(req.files);

  try {

    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("name", sql.VarChar, req.body.menuName)
      .input("price", sql.Decimal, req.body.menuPrice)
      .input("description", sql.VarChar, req.body.menuDesc)
      //.input("image", sql.VarChar, req.file.menuImg)
      .query(
        "INSERT INTO tbl_menu (name, price, description) VALUES (@name, @price, @description)"
      );
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(500).json({
        error: `Multer error: ${err.message}`
      });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(500).json({
        error: `Unknown error: ${err.message}`
      });
    }

    console.log(err);
    return res.status(500).json({
      data: err
    });
  }
});

/* GET menu listing. */
/**
 * 
 */
router.get("/getAllMenu", async function (req, res, next) {
  try {
    await sql.connect(config);
    const result = await sql.query `SELECT * from tbl_menu`;
    await sql.close();
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    console.error("Database connection error:", err);
    console.error("Error details:", JSON.stringify(err, null, 2));
  }
});

router.get("/getMenu/:id", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM tbl_menu WHERE id = @id");
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: err
    });
  }
});

// the endpoint for updating a reservation
router.put("/updateMenu/:id", upload.single('image'), async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("name", sql.VarChar, req.body.name)
      .input("price", sql.Decimal, req.body.price)
      .input("description", sql.VarChar, req.body.description)
      .input("image", sql.VarChar, req.file.filename)
      .input("imagePath", sql.VarChar, req.file.path)
      .input("status", sql.Bit, req.body.status)
      .query(
        "UPDATE tbl_menu SET name = @name, price = @price, description = @description, menu_image = @image, menu_impage_path = @impagePage, menu_status = @status WHERE id = @id"
      );
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: err
    });
  }
});

// update menu status
router.put("/updateMenuStatus/:id", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("status", sql.Bit, req.body.status)
      .query(
        "UPDATE tbl_menu SET menu_status = @status WHERE id = @id"
      );
    pool.close();
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: err
    });
  }
});

router.delete("/deleteMenu/:id", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM tbl_menu WHERE id = @id");
    return res.status(200).json({
      data: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: err
    });
  }
});

module.exports = router;
