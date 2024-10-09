var express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require('path');
var config = require("../config/dbconfig");
const sql = require("mssql");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'menu-images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage
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

router.get("/getMenu/:id", upload.single('image'), async function (req, res, next) {
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

router.post("/addMenu", upload.single('image'), async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .input("price", sql.Decimal, req.body.price)
      .input("description", sql.VarChar, req.body.description)
      .input("image", sql.VarChar, req.file.filename)
      .input("imagePath", sql.VarChar, req.file.path)
      .query(
        "INSERT INTO tbl_menu (name, price, description, menu_image, menu_image_path, menu_status) VALUES (@name, @price, @description, @image, @imagePath, 1)"
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

// the endpoint for updating a reservation
router.put("/updateMenu/:id", async function (req, res, next) {
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
