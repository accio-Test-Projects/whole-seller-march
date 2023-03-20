import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import "./prod.css";
import SearchDropdown from "../../common/SearchDropdown";
import { pincodes, categories } from "../../../constents";
import * as yup from "yup";
import { useFormik } from "formik";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { v4 as uuidv4 } from "uuid";
import FileUpload from "../../common/FileUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
const validationSchema = yup.object({
  productName: yup.string().required("Required"),
  productPrice: yup.number().min(10, "Minimum 10").required("Required"),
  shippingPrice: yup.number().required("Required"),
  productDiscription: yup.string().required("Required"),
  // productImage: yup.string().required("Required"),
  productCategory: yup.string().required("Required"),
  stock: yup.number().required("Required"),
  sku: yup.string().required("Required"),
  shippingPincodes: yup.array().required("Required"),
});

function ProductForm({setShowForm,selectedProduct}) {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      shippingPrice: "",
      productDiscription: "",
      productImage: "",
      productCategory: "",
      stock: "",
      sku: "",
      shippingPincodes: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values, "values");
      try {
        // Add a new document in collection "cities"
        // setDoc(doc_ref, data)
        //doc(db_ref,collection_name,doc_id)
        let product_id = selectedProduct?selectedProduct.product_id:uuidv4();
        await setDoc(doc(db, "products", product_id), {
          ...values,
          product_id,
        });
        alert(selectedProduct?"Product updated":"Product added");
        setShowForm(false);
      } catch (err) {
        console.log(err);
        alert("Error adding product");
      }
    },
  });
  const handlepins = (newpin, type) => {
    if (type === "delete") {
      let pins = formik.values.shippingPincodes;
      let newpins = pins.filter((pin) => pin !== newpin);
      formik.setFieldValue("shippingPincodes", newpins);
    } else {
      let pins = formik.values.shippingPincodes;
      if (pins.includes(newpin)) {
        //
      } else {
        pins.push(newpin);
      }
      formik.setFieldValue("shippingPincodes", pins);
    }
  };
  const generatesuk = () => {
    let sku = uuidv4();
    formik.setFieldValue("sku", sku);
  };
  useEffect(() => {
    if(selectedProduct){
      Object.keys(selectedProduct).forEach((key)=>{
        formik.setFieldValue(key,selectedProduct[key])
      })

    }
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label className="label">Product name</label>
          <TextField
            size="small"
            name="productName"
            id="productName"
            fullWidth
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={
              formik.touched.productName && Boolean(formik.errors.productName)
            }
            helperText={formik.touched.productName && formik.errors.productName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">Product price</label>
          <TextField
            type={"number"}
            size="small"
            fullWidth
            name="productPrice"
            id="productPrice"
            value={formik.values.productPrice}
            onChange={formik.handleChange}
            error={
              formik.touched.productPrice && Boolean(formik.errors.productPrice)
            }
            helperText={
              formik.touched.productPrice && formik.errors.productPrice
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">shipping price</label>
          <TextField
            type={"number"}
            size="small"
            fullWidth
            name="shippingPrice"
            id="shippingPrice"
            value={formik.values.shippingPrice}
            onChange={formik.handleChange}
            error={
              formik.touched.shippingPrice &&
              Boolean(formik.errors.shippingPrice)
            }
            helperText={
              formik.touched.shippingPrice && formik.errors.shippingPrice
            }
          />
        </Grid>
        <Grid item xs={12}>
          <label className="label">Product Discription</label>
          <TextField
            size="small"
            fullWidth
            multiline
            minRows={3}
            name="productDiscription"
            id="productDiscription"
            value={formik.values.productDiscription}
            onChange={formik.handleChange}
            error={
              formik.touched.productDiscription &&
              Boolean(formik.errors.productDiscription)
            }
            helperText={
              formik.touched.productDiscription &&
              formik.errors.productDiscription
            }
          />
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          item
          xs={12}
          sm={6}
        >
          <label className="label">Product Image</label>
          <FileUpload
            value={formik.values.productImage}
            onChange={(url) => formik.setFieldValue("productImage", url)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">Product category</label>
          <Select
            size="small"
            fullWidth
            required
            name="productCategory"
            id="productCategory"
            value={formik.values.productCategory}
            onChange={formik.handleChange}
            error={
              formik.touched.productCategory &&
              Boolean(formik.errors.productCategory)
            }
            helperText={
              formik.touched.productCategory && formik.errors.productCategory
            }
          >
            {categories.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">Stock</label>
          <TextField
            type={"number"}
            size="small"
            fullWidth
            name="stock"
            id="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">SKU</label>
          <TextField
            size="small"
            fullWidth
            name="sku"
            id="sku"
            InputProps={{
              endAdornment: (
                <IconButton onClick={generatesuk} type="button">
                  <ShuffleIcon />
                </IconButton>
              ),
            }}
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.touched.sku && Boolean(formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="label">Shipping pincodes</label>
          <SearchDropdown
            options={pincodes}
            onChange={(pin) => handlepins(pin, "add")}
            values={formik.values.shippingPincodes}
            onDelete={(pin) => handlepins(pin, "delete")}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProductForm;

// product name
// product price
// shipping price
// product description
//image
// category
//stock
// SKU
// shipping pincode
