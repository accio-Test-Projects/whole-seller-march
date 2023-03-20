import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ProductForm from "./ProductForm";
import { getDocs, doc,deleteDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import Table from "../../common/Table/index.js";

const columns=[
  {
    title: "Product Name",
    datakey: "productName",
    style:{
      width:"20%"
    }
  },
  {
    title: "Product Price",
    datakey: "productPrice",
    style:{
      width:"20%"
    }
  },
  {
    title: "Shipping Price",
    datakey: "shippingPrice",
    style:{
      width:"15%"
    }
  },
  {
    title: "stock",
    datakey: "stock",
    style:{
      width:"10%"
    }
  },
  {
    title: "Actions",
    type:'button',
    style:{
      width:"35%",
      display: 'flex',
    justifyContent: 'space-evenly',
    }
  }
]

function CMSProduct() {
  const [showForm, setShowForm] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const fetchAllProducts = () => {
    try {
      const q=query(collection(db, "products"));
        onSnapshot(q, (querySnapshot) => {
        let p = [];
        querySnapshot.forEach((doc) => {
          p.push(doc.data());
        })
        setProducts(p);
       });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!showForm) {
      console.log("show all products");
      // call firebase to get all products
      fetchAllProducts();
    }
  }, [showForm]);

  const actions=async(data,type)=>{
    if(type==='delete'){
      // delete this document from firebase
      try{
      await deleteDoc(doc(db, "products", data.product_id))
alert("Product deleted successfully")
      }
      catch(err){
        console.log(err)
        alert("Error deleting product")
      }
    }
    else if(type==='edit'){
      setSelectedProduct(data)
      console.log("edit",data)
      setShowForm(true)
    }
  }

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
          onClick={() => setShowForm(!showForm)}
          style={{
            textTransform: "none",
            fontSize: "17px",
            background: showForm ? "red" : "#f2126c",
            color: "white",
            borderRadius: "15px",
            padding: " 5px 20px",
          }}
        >
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </Grid>
      {showForm ? (
        <Grid item xs={12}>
          <ProductForm selectedProduct={selectedProduct}  setShowForm={setShowForm}/>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {products && products.length === 0 ? (
            <h1>No products</h1>
          ) : products && products.length > 0 ? (
            <Table
            data={products}
            columns={columns}
            actions={actions}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default CMSProduct;
