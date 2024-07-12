import "./SparePage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useSpare} from "../../hooks/spares/useSpare";

const SparePage = () => {

    const { id } = useParams<{id: string}>();

    const { spare , fetchSpareData } = useSpare()

    useEffect(() => {
        if (id != undefined) {
            fetchSpareData(id)
        }
    }, [])

    if (id == undefined){
        return;
    }

    if (spare == undefined)
    {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/spares/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{spare.name}</h2>

                    <br />

                    <span className="description">Описание: {spare.description}</span>

                    <br />

                    <span className="description">Стоимость: {spare.price} руб.</span>

                    <br />

                    <span className="description">Вес: {spare.weight} кг.</span>

                    <br />

                    <span className="description">Рейтинг: {spare.rating}</span>

                </div>

            </div>

        </div>
    )
}

export default SparePage;