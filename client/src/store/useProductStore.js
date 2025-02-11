import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// base url will be dynamic based on the environment
const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // product state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state
  form: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ form: { name: "", price: "", image: "" } }),

  // add product
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/v1/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in add product function: ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  // fetch products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/products`);
      set({ products: response?.data?.data, error: null });
    } catch (error) {
      if (error.status === 429)
        set({
          error: "Rate limit exceeded. Please try again later.",
          products: [],
        });
      else set({ error: "Something went Wrong." });
    } finally {
      set({ loading: false });
    }
  },

  // delete product
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/v1/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in delet product function: ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  // fetch product
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
      set({
        currentProduct: response?.data?.data,
        formData: response?.data?.data, //prr-fill the form with current product data
        error: null,
      });
    } catch (error) {
      console.log("Error in fetch product function: ", error);
      set({ error: "Something went Wrong.", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  // update product
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/v1/products/${id}`,
        formData
      );
      set({ currentProduct: response?.data?.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in update product function: ", error);
    } finally {
      set({ loading: false });
    }
  },
}));
