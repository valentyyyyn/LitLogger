import "./viewFormButton.css"

export function ViewFormButton({isFormVisible, setIsFormVisible, addOrClose}) {

    return (        
        <div>
            <button
            className="view_form_button"
            type="button"        
            onClick={() => setIsFormVisible(!isFormVisible)}
            >
                ADD BOOK
            </button>

        </div>
    )
}