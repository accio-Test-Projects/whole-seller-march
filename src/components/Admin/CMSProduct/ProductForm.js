import { Button, Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import "./prod.css";
import SearchDropdown from "../../common/SearchDropdown";
import { pincodes } from "../../../constents";
import * as yup from "yup";
import { useFormik } from "formik";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {v4 as uuidv4} from 'uuid';
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
})


function ProductForm() {
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
    onSubmit: (values) => {
      console.log(values, "values");
    },
  });
  const handlepins = (newpin,type) => {
    if(type==='delete'){
      let pins = formik.values.shippingPincodes;
      let newpins = pins.filter((pin)=>pin!==newpin)
      formik.setFieldValue("shippingPincodes", newpins);
    }
    else{
    let pins = formik.values.shippingPincodes;
    if(pins.includes(newpin)){
  //
  }
  else{
    pins.push(newpin);
  }
    formik.setFieldValue("shippingPincodes", pins);
  };
  }
  const generatesuk = () => {
    let sku=uuidv4();
    formik.setFieldValue("sku", sku);

  }
  return (
    <form
    onSubmit={formik.handleSubmit}
    >
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
          error={formik.touched.productName && Boolean(formik.errors.productName)}
          helperText={formik.touched.productName && formik.errors.productName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">Product price</label>
        <TextField type={"number"} size="small" fullWidth
        name="productPrice"
        id="productPrice"
        value={formik.values.productPrice}
        onChange={formik.handleChange}
        error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
        helperText={formik.touched.productPrice && formik.errors.productPrice}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">shipping price</label>
        <TextField type={"number"} size="small" fullWidth
        name='shippingPrice'
        id='shippingPrice'
        value={formik.values.shippingPrice}
        onChange={formik.handleChange}
        error={formik.touched.shippingPrice && Boolean(formik.errors.shippingPrice)}
        helperText={formik.touched.shippingPrice && formik.errors.shippingPrice}
        />
      </Grid>
      <Grid item xs={12}>
        <label className="label">Product Discription</label>
        <TextField size="small" fullWidth multiline minRows={3}
        name='productDiscription'
        id='productDiscription'
        value={formik.values.productDiscription}
        onChange={formik.handleChange}
        error={formik.touched.productDiscription && Boolean(formik.errors.productDiscription)}
        helperText={formik.touched.productDiscription && formik.errors.productDiscription}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">Product Image</label>
        <TextField type={"file"} size="small" fullWidth
        name='productImage'
        id='productImage'
        value={formik.values.productImage}

        onChange={formik.handleChange}
        // error={formik.touched.productImage && Boolean(formik.errors.productImage)}
        // helperText={formik.touched.productImage && formik.errors.productImage}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">Product category</label>
        <TextField size="small" fullWidth 
        name='productCategory'
        id='productCategory'
        value={formik.values.productCategory}
        onChange={formik.handleChange}
        error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
        helperText={formik.touched.productCategory && formik.errors.productCategory}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">Stock</label>
        <TextField type={"number"} size="small" fullWidth
        name='stock'
        id='stock'
        value={formik.values.stock}
        onChange={formik.handleChange}
        error={formik.touched.stock && Boolean(formik.errors.stock)}
        helperText={formik.touched.stock && formik.errors.stock}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <label className="label">SKU</label>
        <TextField size="small" fullWidth
        name='sku'
        id='sku'
        InputProps={{
          endAdornment: (
            <IconButton
            onClick={generatesuk}
            type="button"
            >
              <ShuffleIcon/>
            </IconButton>
          )
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
           onChange={(pin)=>handlepins(pin,'add')}
           values={formik.values.shippingPincodes}
           onDelete={(pin)=>handlepins(pin,'delete')}
          
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
