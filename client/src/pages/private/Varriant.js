import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, InputProduct } from "../../components";
import { toBase64 } from "../../ultils/helpers";
import { toast } from "react-toastify";
import { apiAddVarriant } from "../../services/product";

const Varriant = ({ product, setIsVarriant }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [preview, setPreview] = useState({
    thumb: "",
    images: [],
  });
  console.log(product);

  useEffect(() => {
    reset({
      title: product.title,
      price: product.price,
      color: product.color,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleAddVarriant = async (data) => {
    const finalPayload = { ...data };
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
    if (finalPayload.images) {
      for (let image of finalPayload.images) formData.append("images", image);
    }

    const response = await apiAddVarriant(formData, product._id);
    if (response.data.success) {
      toast.success(response.data.mes);
      setIsVarriant(null);
    } else toast.error(response.data.mes);
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("thumb")]);

  const handlePreviewThumb = async (file) => {
    const base64 = await toBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64 }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("images")]);

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      const base64 = await toBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  return (
    <div className="absolute inset-0 bg-sky-900 pl-5">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold border-b ">
        <span>Customize varriant</span>
      </h1>

      <div>
        <form onSubmit={handleSubmit(handleAddVarriant)}>
          <InputProduct register={register} id="title" label="Name" />

          <div className="grid grid-cols-2 gap-5">
            <InputProduct register={register} id="price" label="Price" />
            <InputProduct register={register} id="color" label="Color" />
          </div>

          <div className="mt-10">
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="thumb"
            >
              Upload varriant
            </label>
            <input {...register("thumb")} type="file" id="thumb" />
          </div>
          {preview.thumb && (
            <div className="my-5">
              <img
                src={preview.thumb}
                alt="thumb"
                className="w-[200px] object-contain "
              />
            </div>
          )}

          <div className="my-5">
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="products"
            >
              Upload images varriant
            </label>
            <input {...register("images")} type="file" id="images" multiple />
          </div>
          {preview.images.length > 0 && (
            <div className="my-5 flex gap-5">
              {preview.images.map((el, i) => {
                return (
                  <img
                    key={i}
                    src={el}
                    alt="images"
                    id={i}
                    className="w-[200px] object-contain "
                  />
                );
              })}
            </div>
          )}
          <Button type="submit" title="Add Varriant" cusWidth="w-[300px]" />
        </form>
      </div>
    </div>
  );
};

export default Varriant;
