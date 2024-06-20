import React, { useCallback, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { IoMdTrash } from 'react-icons/io'
import {toast} from 'react-toastify'

import { Button, InputProduct, MarkDown } from '../../components'
import { toBase64, validate } from '../../ultils/helpers'
import { apiCreateProduct } from '../../services/product'

const CreateProduct = () => {
    const { categories } = useSelector(state => state.category.getCategories)
    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalidField, setInvalidField] = useState([])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [hoverEl, setHoverEl] = useState(null)

    const { register, handleSubmit, formState: {errors}, watch, reset } = useForm()

    const changeValue = useCallback((e) => {
        setPayload(e)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload])

    const handlePreviewThumb = async(file) => {
        const base64 = await toBase64(file)
        setPreview(prev => ({...prev, thumb: base64}))
    }
    
    const handlePreviewImages = async(files) => {
        const imagesPreview = []
        for ( let file of files ) {
            const base64 = await toBase64(file)
            imagesPreview.push({name: file.name, path: base64})
        }
        setPreview(prev => ({...prev, images: imagesPreview}))
    }

    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumb')])

    useEffect(() => {
        handlePreviewImages(watch('images'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')])

    const handleRemoveImage = name => {
        // const removeNameImg = preview.images.some(img => img.name === name)
        setPreview(prev => ({...prev, images: prev.images.filter(el => el.name !== name)}))
    }

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidField)
        if (invalids === 0) {
            const finalPayload = {...data, ...payload}
            console.log(finalPayload)
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])

            if( finalPayload.thumb ) formData.append('thumb', finalPayload.thumb[0])
            if( finalPayload.images ) {
                for(let image of finalPayload.images) formData.append('images', image)
            }
            const response = await apiCreateProduct(formData)
            if(response.data.success) {
                toast.success(response.data.mes)
                reset()
                setPayload({
                    thumb: '',
                    image: []
                })
            } else toast.error(response.data.mes)

        }
    }


    return (
        <div>
            <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
                <span>Create Product</span>
            </h1>

            <div className='w-full mt-10'>
                <form className='flex flex-col gap-5 pr-5' onSubmit={handleSubmit(handleCreateProduct)}>
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
                                {categories?.find(cate => cate.title === watch('category'))?.brand.map((el, i) => (
                                    <option key={i} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <MarkDown 
                        name="description"
                        changeValue={changeValue}
                        label="Description"
                        invalidField={invalidField}
                        setInvalidFields={setInvalidField}
                    />

                    <div className='mt-10'>
                        <label className="block mb-2 text-sm font-medium text-white" htmlFor='thumb'>Upload thumb</label>
                        <input {...register('thumb', { required: 'this field required' })} type='file' id='thumb' />
                        <span className="text-sm text-main">{errors['thumb']?.message}</span>
                    </div>
                    {preview.thumb && <div className='my-5'>
                        <img src={preview.thumb} alt='thumb' className='w-[200px] object-contain ' />
                    </div>}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-white" htmlFor='products'>Upload images product</label>
                        <input {...register('images', { required: 'this field required' })} type='file' id='images' multiple />
                        <span className="text-sm text-main">{errors['images']?.message}</span>
                    </div>
                    {preview.images.length > 0 && <div className='my-5 flex gap-5'>
                        {preview.images.map((el, i) => (
                            <div 
                                key={i} 
                                className='relative'
                                onMouseEnter={() => setHoverEl(el.name)}
                                onMouseLeave={() => setHoverEl(null)}
                            >
                                <img src={el.path} alt='images' id={i} className='w-[200px] object-contain ' />
                                {hoverEl && hoverEl === el.name && <div className='absolute inset-0 bg-overlay flex justify-center items-center'>
                                        <div onClick={() => handleRemoveImage(el.name)} className='flex items-center justify-center'>
                                            <IoMdTrash />
                                        </div>
                                    </div>}
                            </div>
                        ))}
                    </div>}
                    <Button type='submit' title="Create product" cusWidth="w-[300px]" />
                </form>
            </div>
        </div>
    )
}

export default CreateProduct