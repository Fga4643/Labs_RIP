import "./SpareAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {variables} from "../../utils/variables";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import mock from "/src/assets/mock.jpg"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";

const SpareAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [spareName, setSpareName] = useState("Название")
    const [spareDescription, setSpareDescription] = useState("Описание")
    const [sparePrice, setSparePrice] = useState(3000)
    const [spareWeight, setSpareWeight] = useState(100)
    const [spareRating, setSpareRating] = useState(4.0)

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addSpare = async () => {

        const response = await api.post(`spares/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const spare_id = response.data["id"]
            await updateSpare(spare_id)
            navigate("/spares/")
        }

    }

    const updateSpare = async (spare_id) => {

        let form_data = new FormData()

        form_data.append('name', spareName)
        form_data.append('description', spareDescription)
        form_data.append('price', sparePrice.toString())
        form_data.append('weight', spareWeight.toString())
        form_data.append('rating', spareRating.toString())

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        await api.put(`spares/${spare_id}/update/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }


    return (
        <div className="add-page-wrapper">
            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={imgURL} className="faculty-image" alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput name="Название" value={spareName} onChange={setSpareName} />

                    <CustomTextarea name="Описание" value={spareDescription} onChange={setSpareDescription} />

                    <CustomInput name="Цена" value={sparePrice} onChange={setSparePrice} />

                    <CustomInput name="Вес" value={spareWeight} onChange={setSpareWeight} />

                    <CustomInput name="Рейтинг" value={spareRating} onChange={setSpareRating} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} text="Создать" onClick={addSpare}/>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SpareAddPage