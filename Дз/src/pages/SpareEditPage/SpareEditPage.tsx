import "./SpareEditPage.sass"
import {Link, useParams, useNavigate} from "react-router-dom";
import {useSpare} from "../../hooks/spares/useSpare";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import {variables} from "../../utils/variables";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";

const SpareEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        spare ,
        fetchSpareData,
        setSpareName,
        setSpareDescription,
        setSparePrice,
        setSpareWeight,
        setSpareRating,
        setSpareImage
    } = useSpare()

    useEffect(() => {
        if (id != undefined) {
            fetchSpareData(id)
        }
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setSpareImage(URL.createObjectURL(img))
        }
    }

    const saveSpare = async() => {
        let form_data = new FormData()

        form_data.append('name', spare.name)
        form_data.append('description', spare.description)
        form_data.append('price', spare.price)
        form_data.append('weight', spare.weight)
        form_data.append('rating', spare.rating)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`spares/${spare.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/spares/")
        }
    }

    const deleteSpare = async () => {

        const response = await api.delete(`spares/${spare.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/spares/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (spare == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">
            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={spare.image} className="faculty-image" alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput name="Название" value={spare.name} onChange={setSpareName} />

                    <CustomTextarea name="Описание" value={spare.description} onChange={setSpareDescription} />

                    <CustomInput name="Цена" value={spare.price} onChange={setSparePrice} />

                    <CustomInput name="Вес" value={spare.weight} onChange={setSpareWeight} />

                    <CustomInput name="Рейтинг" value={spare.rating} onChange={setSpareRating} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} text="Сохранить" onClick={saveSpare}/>

                        <CustomButton bg={variables.red} text="Удалить" onClick={deleteSpare}/>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SpareEditPage