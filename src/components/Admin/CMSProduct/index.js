import { Button, Grid } from "@mui/material";
import React from "react";
import ProductForm from "./ProductForm";
function CMSProduct() {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Products</h1>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        item
        xs={12}
      >
        <Button
        onClick={()=>setShowForm(!showForm)}
          style={{
            textTransform: "none",
            fontSize: "17px",
            background:showForm?'red': "#f2126c",
            color: "white",
            borderRadius: "15px",
            padding:' 5px 20px'
          }}
        >
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </Grid>
      {showForm ? (
        <Grid item xs={12}>
        <ProductForm />
        </Grid>
      ) : (
        <Grid item xs={12}>
          table
        </Grid>
      )}
    </Grid>
  );
}

export default CMSProduct;
