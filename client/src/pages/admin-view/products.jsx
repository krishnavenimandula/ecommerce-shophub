import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { toast } from "sonner";
import { data } from "react-router-dom";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success(data?.payload?.message || "Product added successfully!");
      }
    });
  }
  useEffect(() => {
    console.log("useEffect");
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, uploadImageUrl, "productList");
  // console.log(formData);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto px-5">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
export default AdminProducts;
