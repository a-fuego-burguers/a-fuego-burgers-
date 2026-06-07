import { useState, useEffect } from "react";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function AdminPanel() {
const navigate = useNavigate();

const logout = async () => {

  await signOut(auth);

  navigate("/login");
};

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("hamburguesas");

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // 🔥 Obtener productos
  const getProducts = async () => {

    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const productsList = querySnapshot.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
    }));

    setProducts(productsList);
  };

  // 🔥 Cargar productos
  useEffect(() => {

    getProducts();

  }, []);

  // 🔥 Agregar producto
 const addProduct = async () => {

  try {

    // 🔥 SUBIR IMAGEN A CLOUDINARY
    const data = new FormData();

    data.append("file", img);

    data.append(
      "upload_preset",
      "afuego-burgers"
    );

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dexb1pzkc/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const fileData = await res.json();

    // 🔥 GUARDAR EN FIREBASE
    await addDoc(collection(db, "products"), {

      name,
      desc,
      price,
      category,

      img: fileData.secure_url
    });

    alert("Producto agregado 🔥");
    setName("");
    setDesc("");
    setPrice("");
    setImg(null);
    setCategory("hamburguesas");
    getProducts();

  } catch (error) {

    console.log(error);
  }
};

  // 🔥 Eliminar producto
  const deleteProduct = async (id) => {

    try {

      await deleteDoc(doc(db, "products", id));

      getProducts();

    } catch (error) {

      console.log(error);
    }
  };

  // 🔥 Editar producto
  const editProduct = (product) => {

    setName(product.name);
    setDesc(product.desc);
    setPrice(product.price);
    setImg(null);
    setCategory(product.category);

    setEditingId(product.id);
  };

  // 🔥 Actualizar producto
const updateProduct = async () => {

  try {

    let imageUrl = products.find(
      (p) => p.id === editingId
    )?.img;

    // 🔥 Si selecciona nueva imagen
    if (img) {

      const data = new FormData();

      data.append("file", img);

      data.append(
        "upload_preset",
        "afuego-burgers"
      );

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dexb1pzkc/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const fileData = await res.json();

      imageUrl = fileData.secure_url;
    }

    const productRef = doc(
      db,
      "products",
      editingId
    );

    await updateDoc(productRef, {

      name,
      desc,
      price,
      category,

      img: imageUrl
    });

    alert("Producto actualizado 🔥");

    setEditingId(null);

    setName("");
    setDesc("");
    setPrice("");
    setImg(null);
    setCategory("hamburguesas");

    getProducts();

  } catch (error) {

    console.log(error);
  }
};

  return (

    <section className="min-h-screen bg-black text-white p-8">

<div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold text-red-600">
    Panel Administrador 🔥
  </h1>

  <button
    onClick={logout}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl font-bold"
  >
    Cerrar sesión 🚪
  </button>

</div>

      <div className="max-w-xl mx-auto flex flex-col gap-4">

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-neutral-900"
        />

        <textarea
          placeholder="Descripción"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-4 rounded-xl bg-neutral-900"
        />

        <input
          type="text"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-4 rounded-xl bg-neutral-900"
        />
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          className="w-full p-4 rounded-xl bg-neutral-900"
        />


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 rounded-xl bg-neutral-900"
        >
          <option value="hamburguesas">
            Hamburguesas
          </option>

          <option value="hotdogs">
            Hot Dogs
          </option>

          <option value="bebidas">
            Bebidas
          </option>
        </select>

        <button
          onClick={editingId ? updateProduct : addProduct}
          className="bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold"
        >
          {editingId
            ? "Actualizar producto ✏️"
            : "Agregar producto 🚀"}
        </button>

        {/* 🔥 LISTA PRODUCTOS */}
        <div className="mt-10 flex flex-col gap-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center"
            >

              <div className="text-left">

                <h3 className="font-bold text-white">
                  {product.name}
                </h3>

                <p className="text-red-500">
                  ${product.price}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => editProduct(product)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                >
                  🗑 Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}