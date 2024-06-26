import React, { useCallback, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {toast} from 'react-toastify'

import { Button, InputProduct, MarkDown } from '../../components'
import { toBase64, validate } from '../../ultils/helpers'
import { apiUpdateProduct } from '../../services/product'

const UpdateProduct = ({ product, setIsEdit }) => {
    const { categories } = useSelector(state => state.category.getCategories)
    const { register, handleSubmit, formState: { errors }, reset, watch} = useForm()
    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalidField, setInvalidField] = useState([])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    
    useEffect(() => {
        reset({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            color: product.color,
            category: product.category,
            brand: product.brand.toLowerCase(),
        })
        setPayload({ description: typeof product.description === 'object' ? product.description.join(', ') : product.description})
        setPreview({
            thumb: product.thumb,
            images: product.images
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])
    console.log(product)
    const changeValue = useCallback((e) => {
        setPayload(e)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload])
    
    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidField)
        if (invalids === 0) {
            const finalPayload = {...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if(finalPayload.images) {
                for(let image of finalPayload.images ) formData.append('images', image)
            }

            const response = await apiUpdateProduct(formData, product._id)
            if(response.data.success) {
                toast.success(response.data.mes)
                setIsEdit(null)
            } else toast.error(response.data.mes)
        }
    }

    useEffect(() => {
       if ( watch('thumb')instanceof FileList && watch('thumb').length > 0) {
           handlePreviewThumb(watch('thumb')[0])
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumb')])
    
    const handlePreviewThumb = async (file) => {
        console.log('run')
        const base64 = await toBase64(file)
        setPreview(prev => ({...prev, thumb: base64}))
    }

    useEffect(() => {
        if(watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')])

    const handlePreviewImages = async (files) => {
        console.log('running')
        const imagesPreview = []
        for ( let file of files ) {
            const base64 = await toBase64(file)
            imagesPreview.push(base64)
        }
        setPreview(prev => ({...prev, images: imagesPreview}))
    }
    
    return (
        <div className="absolute inset-0 bg-sky-900 pl-5">
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold border-b ">
                <span>Update Product</span>
            </h1>

            <div>
                <form className='flex flex-col gap-5 pr-5' onSubmit={handleSubmit(handleUpdateProduct)}>
                    <InputProduct 
                        label="Product name"
                        register={register}
                        id="title"
                        placeholder="Enter product name"
                        errors={errors}
                        validate={{
                            required: 'this field required'
                        }}
                    />   

                    <div className='grid grid-cols-3 gap-5'>
                        <InputProduct 
                            label="Price"
                            register={register}
                            id="price"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required'
                            }}
                        />
                        <InputProduct 
                            label="Quantity"
                            register={register}
                            id="quantity"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required'
                            }}
                        />
                        <InputProduct 
                            label="Color"
                            register={register}
                            id="color"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required'
                            }}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div className='w-full'>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Category
                            </label>
                            <select id='category' {...register('category')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">CHOOSE</option>
                                {categories?.map(el => (
                                    <option key={el._id} value={el.title}>{el.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className='w-full'>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Brand
                            </label>
                            <select id='brand' {...register('brand')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">CHOOSE</option>
                                {categories?.find(cate => cate.title === watch('category'))?.brand.map((el, i) => {
                                    return <option key={i} value={el.toLowerCase()}>{el}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <MarkDown 
                        name="description"
                        changeValue={changeValue}
                        label="Description"
                        invalidField={invalidField}
                        setInvalidFields={setInvalidField}
                        value={payload.description}
                    />

                    <div className='mt-10'>
                        <label className="block mb-2 text-sm font-medium text-white" htmlFor='thumb'>Upload thumb</label>
                        <input {...register('thumb')} type='file' id='thumb' />
                        <span className="text-sm text-main">{errors['thumb']?.message}</span>
                    </div>
                    {preview.thumb && <div className='my-5'>
                        <img src={preview.thumb} alt='thumb' className='w-[200px] object-contain ' />
                    </div>}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-white" htmlFor='products'>Upload images product</label>
                        <input {...register('images')} type='file' id='images' multiple />
                        <span className="text-sm text-main">{errors['images']?.message}</span>
                    </div>
                    {preview.images.length > 0 && <div className='my-5 flex gap-5'>
                        {preview.images.map((el, i) => {
                            return <img key={i} src={el} alt='images' id={i} className='w-[200px] object-contain ' />
                        })}
                    </div>}
                    <Button type='submit' title="Update product" cusWidth="w-[300px]" />

                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
