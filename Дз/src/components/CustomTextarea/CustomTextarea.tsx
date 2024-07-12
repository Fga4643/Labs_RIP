import "./CustomTextarea.sass"

const CustomTextarea = ({key, value, name, onChange}) => {
    return (
        <div className="textarea-container">
            <label htmlFor={key}>{name}</label>
            <textarea id={key} value={value} onChange={(e) => onChange(e.target.value)} rows="5" cols="40"/>
        </div>
    )
}

export default CustomTextarea